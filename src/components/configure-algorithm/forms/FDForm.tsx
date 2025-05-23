import _ from 'lodash';
import { useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { SchemaFdTaskConfig } from '@/api/generated/schema';
import { createMutationFn } from '@/api/services/server';
import { ControlledFormField } from '@/components/common/uikit';
import {
  CheckboxGroup,
  NumberInput,
  Select,
} from '@/components/common/uikit/Inputs';
import { FormComponent } from '@/types/form';
import {
  FDAlgorithmOptions,
  FDAlgorithms,
  FDCommonFields,
  optionalFieldsByAlgorithm,
} from './options/FDOptions';
import { FDPresets } from './presets/FDPresets';

export type FDFormInputs = SchemaFdTaskConfig['config'];

export const FDForm: FormComponent<FDFormInputs> = () => {
  const methods = useFormContext<FDFormInputs>();

  const [algo_name] = useWatch<FDFormInputs>({
    name: ['algo_name'],
  });

  const optionalFields = useMemo(
    () => optionalFieldsByAlgorithm[algo_name as FDAlgorithms] ?? [],
    [algo_name],
  );

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
            value={[value ?? 0]}
            onChange={([newValue]) => onChange(newValue)}
            boundaries={{
              defaultNum: 0,
              min: 0,
              step: 1,
              digitsAfterDot: 0,
            }}
          />
        )}
      </ControlledFormField>

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
              value={[value ?? 0]}
              onChange={([newValue]) => onChange(newValue)}
              boundaries={{ defaultNum: 0, min: 0, step: 1, digitsAfterDot: 0 }}
            />
          )}
        </ControlledFormField>
      )}
      {optionalFields.includes('custom_random_seed') && (
        <ControlledFormField<FDFormInputs, 'custom_random_seed'>
          formFieldProps={{ label: 'Seed' }}
          controllerProps={{
            name: 'custom_random_seed',
            control: methods.control,
          }}
        >
          {({ field: { value, onChange } }) => (
            <NumberInput
              value={[value ?? 1]}
              onChange={([newValue]) => onChange(newValue)}
              boundaries={{ defaultNum: 0, min: 0, step: 1, digitsAfterDot: 0 }}
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
              value={[value ?? 0]}
              onChange={([newValue]) => onChange(newValue)}
              slider
              boundaries={{
                defaultNum: 0,
                min: 0,
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

FDForm.presets = FDPresets;
FDForm.onSubmit = (fieldValues) => {
  const algo_name = fieldValues.algo_name;
  const fields = [
    ...FDCommonFields,
    ...(optionalFieldsByAlgorithm[algo_name as FDAlgorithms] ?? []),
  ];
  return _.pick(fieldValues, fields);
};
FDForm.mutationFn = ({ datasets, data }) =>
  datasets && datasets.length
    ? createMutationFn('/api/tasks')({
        body: {
          files_ids: datasets,
          config: {
            primitive_name: 'fd',
            config: data,
          },
        },
      })
    : Promise.reject('No datasets selected');
