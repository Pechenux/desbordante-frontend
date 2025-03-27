// import { FDPresets } from '@constants/presets/FDPresets';
import _ from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { createMutationFn } from '@/api/fetchFunctions';
import {
  FdTaskConfigPrimitive_name,
  SchemaFdTaskConfig,
} from '@/api/generated/schema';
import { ControlledFormField } from '@/components/common/uikit';
import {
  CheckboxGroup,
  NumberInput,
  Select,
} from '@/components/common/uikit/Inputs';
import { FormComponent } from '@/types/form';
import { GetAllFieds } from '@/types/getAllFields';
import { UnionKeys } from '@/types/unionKeys';
import {
  FDAlgorithmOptions,
  FDAlgorithms,
  FDErrorMeasuresOptions,
  FDOptionalFields,
  optionalFieldsByAlgorithm,
} from './options/FDOptions';
import { FDPresets } from './presets/FDPresets';

export type FDFormInputs = SchemaFdTaskConfig['config'];
type FDFormKeys = UnionKeys<FDFormInputs>;
const defaultValue = FDPresets.common.at(-1)
  ?.preset as GetAllFieds<FDFormInputs>;

export const FDForm: FormComponent<FDFormInputs> = ({ setPresets }) => {
  const methods = useFormContext<FDFormInputs>();

  const [algo_name] = useWatch<FDFormInputs>({
    name: ['algo_name'],
  });

  const [options, setOptions] = useState<FDOptionalFields[]>([]);

  useEffect(() => console.log(options), [options]);

  useEffect(() => {
    setPresets(FDPresets);
    methods.setValue('algo_name', defaultValue['algo_name']);
  }, [methods, setPresets]);

  const optionalFields = useMemo(
    () => optionalFieldsByAlgorithm[algo_name as FDAlgorithms] ?? [],
    [algo_name],
  );

  useEffect(() => {
    if (!algo_name) {
      return;
    }

    setOptions(optionalFields);
    const fields: FDFormKeys[] = ['max_lhs', ...optionalFields];
    fields.forEach((key) => methods.setValue(key, defaultValue[key]));
  }, [algo_name, methods, optionalFields]);

  return (
    <>
      <ControlledFormField<FDFormInputs, 'algo_name'>
        formFieldProps={{ label: 'Algorithm' }}
        controllerProps={{
          name: 'algo_name',
          control: methods.control,
        }}
      >
        {({ field: { value, onChange } }) => (
          <Select
            value={value}
            onChange={onChange}
            options={FDAlgorithmOptions}
          />
        )}
      </ControlledFormField>
      <ControlledFormField<FDFormInputs, 'max_lhs'>
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
            slider
            boundaries={{
              defaultNum: 1,
              min: 1,
              max: 10,
              step: 1,
              digitsAfterDot: 0,
            }}
          />
        )}
      </ControlledFormField>
      {optionalFields.includes('error') && (
        <ControlledFormField<FDFormInputs, 'error'>
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
      )}
      {optionalFields.includes('error_measure') && (
        <ControlledFormField<FDFormInputs, 'error_measure'>
          formFieldProps={{ label: 'Error measure' }}
          controllerProps={{
            name: 'error_measure',
            control: methods.control,
          }}
        >
          {({ field: { value, onChange } }) => (
            <Select
              value={value}
              onChange={onChange}
              options={FDErrorMeasuresOptions}
            />
          )}
        </ControlledFormField>
      )}
      {optionalFields.includes('seed') && (
        <ControlledFormField<FDFormInputs, 'seed'>
          formFieldProps={{ label: 'Seed' }}
          controllerProps={{
            name: 'seed',
            control: methods.control,
          }}
        >
          {({ field: { value, onChange } }) => (
            <NumberInput
              value={[value ?? 1]}
              onChange={([newValue]) => onChange(newValue)}
              boundaries={{ defaultNum: 0, step: 1, digitsAfterDot: 0 }}
            />
          )}
        </ControlledFormField>
      )}
      {optionalFields.includes('threads') && (
        <ControlledFormField<FDFormInputs, 'threads'>
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
              slider
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
      {optionalFields.includes('is_null_equal_null') && (
        <ControlledFormField<FDFormInputs, 'is_null_equal_null'>
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
      )}
    </>
  );
};

FDForm.onSubmit = (fieldValues) => {
  const algo_name = fieldValues.algo_name;
  const fields = [
    'algo_name',
    'max_lhs',
    ...(optionalFieldsByAlgorithm[algo_name as FDAlgorithms] ?? []),
  ];
  return _.pick(fieldValues, fields);
};
// использовать zod
FDForm.mutationFn = ({ datasets, data }) =>
  '0' in datasets
    ? createMutationFn('/api/task/set')({
        params: { query: { dataset_id: datasets[0] } },
        body: {
          primitive_name: FdTaskConfigPrimitive_name.fd,
          config: data,
        },
      })
    : Promise.reject('No datasets selected');
