// import { FDPresets } from '@constants/presets/FDPresets';
import _ from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { createMutationFn } from '@/api/services/server';
import { SchemaAfdTaskConfig } from '@/api/generated/schema';
import { ControlledFormField } from '@/components/common/uikit';
import {
  CheckboxGroup,
  NumberInput,
  Select,
} from '@/components/common/uikit/Inputs';
import { FormComponent } from '@/types/form';
import { GetAllFieds } from '@/types/getAllFields';

import {
  AFDAlgorithmOptions,
  AFDAlgorithms,
  AFDCommonFields,
  AFDOptionalFields,
  ErrorMeasuresOptions,
  optionalFieldsByAlgorithm,
} from './options/AFDOptions';
import { AFDPresets } from './presets/AFDPresets';

export type AFDFormInputs = SchemaAfdTaskConfig['config'];
const defaultValue = AFDPresets.common.at(-1)
  ?.preset as GetAllFieds<AFDFormInputs>;

export const AFDForm: FormComponent<AFDFormInputs> = (
  {
    /* setPresets*/
  },
) => {
  const methods = useFormContext<AFDFormInputs>();
  //const algo_name = methods.getValues('algo_name');
  //console.log(algo_name);

  const [algo_name] = useWatch<AFDFormInputs>({
    name: ['algo_name'],
  });

  const [options, setOptions] = useState<AFDOptionalFields[]>([]);

  useEffect(() => console.log(options), [options]);

  // useEffect(() => {
  //   setPresets(AFDPresets);
  //   methods.setValue('algo_name', defaultValue['algo_name']);
  // }, [methods, setPresets]);

  const optionalFields = useMemo(
    () => optionalFieldsByAlgorithm[algo_name as AFDAlgorithms] ?? [],
    [algo_name],
  );

  useEffect(() => {
    if (!algo_name) {
      return;
    }
    console.log(algo_name, methods.getValues());

    setOptions(optionalFields);
    const fields = [...AFDCommonFields, ...optionalFields];
    fields.forEach((key) => methods.setValue(key, defaultValue[key]!));
  }, [algo_name, methods, optionalFields]);

  return (
    <>
      <ControlledFormField<AFDFormInputs, 'algo_name'>
        formFieldProps={{ label: 'Algorithm' }}
        controllerProps={{
          name: 'algo_name',
          control: methods.control,
        }}
      >
        {({ field: { value, onChange } }) => (
          <Select
            value={value}
            defaultValue={AFDAlgorithmOptions[0]}
            onChange={onChange}
            options={AFDAlgorithmOptions}
          />
        )}
      </ControlledFormField>
      <ControlledFormField<AFDFormInputs, 'max_lhs'>
        formFieldProps={{ label: 'Arity constraint' }}
        controllerProps={{
          name: 'max_lhs',
          control: methods.control,
        }}
      >
        {({ field: { value, onChange } }) => (
          <NumberInput
            value={[value ?? 1]}
            onChange={([newValue]) => onChange(newValue)}
            boundaries={{
              defaultNum: 1,
              min: 0,
              step: 1,
              digitsAfterDot: 0,
            }}
          />
        )}
      </ControlledFormField>
      <ControlledFormField<AFDFormInputs, 'error'>
        formFieldProps={{ label: 'Error threshold' }}
        controllerProps={{
          name: 'error',
          control: methods.control,
        }}
      >
        {({ field: { value, onChange } }) => (
          <NumberInput
            value={[value ?? 0]}
            onChange={([newValue]) => onChange(newValue)}
            slider
            boundaries={{
              defaultNum: 0,
              min: 0,
              max: 1,
              step: 1e-4,
              digitsAfterDot: 4,
            }}
          />
        )}
      </ControlledFormField>
      <ControlledFormField<AFDFormInputs, 'is_null_equal_null'>
        formFieldProps={{ label: 'Is null equal null' }}
        controllerProps={{
          name: 'is_null_equal_null',
          control: methods.control,
        }}
      >
        {({ field: { value, onChange } }) => (
          <CheckboxGroup
            values={value ? ['isEqual'] : []}
            onChange={(newValue) => onChange(newValue.length > 0)}
            options={[{ label: 'Equal', value: 'isEqual' }]}
          />
        )}
      </ControlledFormField>
      {options.includes('afd_error_measure') && (
        <ControlledFormField<AFDFormInputs, 'afd_error_measure'>
          formFieldProps={{ label: 'Error measure' }}
          controllerProps={{
            name: 'afd_error_measure',
            control: methods.control,
          }}
        >
          {({ field: { value, onChange } }) => (
            <Select
              value={value}
              defaultValue={ErrorMeasuresOptions[0]}
              onChange={onChange}
              options={ErrorMeasuresOptions}
            />
          )}
        </ControlledFormField>
      )}
      {options.includes('seed') && (
        <ControlledFormField<AFDFormInputs, 'seed'>
          formFieldProps={{ label: 'Seed' }}
          controllerProps={{
            name: 'seed',
            control: methods.control,
          }}
        >
          {({ field: { value, onChange } }) => (
            <NumberInput
              value={[value ?? 0]}
              onChange={([newValue]) => onChange(newValue)}
              boundaries={{ defaultNum: 0, min: 0, step: 1, digitsAfterDot: 0 }}
            />
          )}
        </ControlledFormField>
      )}
      {options.includes('threads') && (
        <ControlledFormField<AFDFormInputs, 'threads'>
          formFieldProps={{ label: 'Thread count' }}
          controllerProps={{
            name: 'threads',
            control: methods.control,
          }}
        >
          {({ field: { value, onChange } }) => (
            <NumberInput
              value={[value ?? 1]}
              onChange={([newValue]) => onChange(newValue)}
              boundaries={{
                defaultNum: 1,
                min: 1,
                max: 8,
                step: 1,
                digitsAfterDot: 0,
              }}
            />
          )}
        </ControlledFormField>
      )}
    </>
  );
};

AFDForm.onSubmit = (fieldValues) => {
  const algo_name = fieldValues.algo_name;
  console.log(999, fieldValues);
  const fields = [
    ...AFDCommonFields,
    ...(optionalFieldsByAlgorithm[algo_name as AFDAlgorithms] ?? []),
  ];
  console.log(fields);
  return _.pick(fieldValues, fields);
};
// использовать zod
AFDForm.mutationFn = ({ datasets, data }) => {
  console.log(222, datasets, data);
  return datasets.length
    ? createMutationFn('/api/tasks')({
        body: {
          files_ids: datasets,
          config: {
            primitive_name: 'afd',
            config: data,
          },
        },
      })
    : Promise.reject('No datasets selected');
};
