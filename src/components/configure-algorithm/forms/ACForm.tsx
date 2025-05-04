import _ from 'lodash';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { SchemaAcTaskConfigInput } from '@/api/generated/schema';
import { createMutationFn } from '@/api/services/server';
import { ControlledFormField } from '@/components/common/uikit';
import { NumberInput, Select } from '@/components/common/uikit/Inputs';
import { FormComponent } from '@/types/form';
import { GetAllFieds } from '@/types/getAllFields';
import { SeedRandomInput } from '../SeedRandomomInput';
import {
  ACAlgorithmOptions,
  ACFields,
  operationOptions,
} from './options/ACOptions';
import { ACPresets } from './presets/ACPresets';

export type ACFormInputs = SchemaAcTaskConfigInput['config'];
const defaultValue = ACPresets.common.at(-1)
  ?.preset as GetAllFieds<ACFormInputs>;

export const ACForm: FormComponent<ACFormInputs> = (
  {
    /*setPresets*/
  },
) => {
  const methods = useFormContext<ACFormInputs>();

  useEffect(() => {
    ACFields.forEach((key) => methods.setValue(key, defaultValue[key]));
  }, [methods]);

  return (
    <>
      <ControlledFormField<ACFormInputs, 'algo_name'>
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
            options={ACAlgorithmOptions}
          />
        )}
      </ControlledFormField>
      <ControlledFormField<ACFormInputs, 'bin_operation'>
        formFieldProps={{ label: 'Operation' }}
        controllerProps={{
          name: 'bin_operation',
          control: methods.control,
        }}
      >
        {({ field: { value, onChange } }) => (
          <Select
            value={value}
            onChange={onChange}
            options={operationOptions}
          />
        )}
      </ControlledFormField>
      <ControlledFormField<ACFormInputs, 'bumps_limit'>
        formFieldProps={{ label: 'Bumps limit' }}
        controllerProps={{
          name: 'bumps_limit',
          control: methods.control,
        }}
      >
        {({ field: { value, onChange } }) => (
          <NumberInput
            value={[value ?? 0]}
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
      <ControlledFormField<ACFormInputs, 'p_fuzz'>
        formFieldProps={{ label: 'P fuzz' }}
        controllerProps={{
          name: 'p_fuzz',
          control: methods.control,
        }}
      >
        {({ field: { value, onChange } }) => (
          <NumberInput
            value={[value ?? 1]}
            onChange={([newValue]) => onChange(newValue)}
            slider
            boundaries={{
              defaultNum: 0.2,
              min: 0,
              includingMin: false,
              max: 1,
              step: 0.01,
              digitsAfterDot: 2,
            }}
          />
        )}
      </ControlledFormField>
      <ControlledFormField<ACFormInputs, 'iterations_limit'>
        formFieldProps={{ label: 'Iterations limit' }}
        controllerProps={{
          name: 'iterations_limit',
          control: methods.control,
        }}
      >
        {({ field: { value, onChange } }) => (
          <NumberInput
            value={[value ?? 1]}
            onChange={([newValue]) => onChange(newValue)}
            boundaries={{
              defaultNum: 4,
              min: 1,
              step: 1,
              digitsAfterDot: 0,
            }}
          />
        )}
      </ControlledFormField>
      <ControlledFormField<ACFormInputs, 'fuzziness'>
        formFieldProps={{ label: 'Fuzziness' }}
        controllerProps={{
          name: 'fuzziness',
          control: methods.control,
        }}
      >
        {({ field: { value, onChange } }) => (
          <NumberInput
            value={[value ?? 1]}
            onChange={([newValue]) => onChange(newValue)}
            slider
            boundaries={{
              defaultNum: 0.85,
              min: 0,
              includingMin: false,
              max: 1,
              step: 0.01,
              digitsAfterDot: 2,
            }}
          />
        )}
      </ControlledFormField>
      <ControlledFormField<ACFormInputs, 'ac_seed'>
        formFieldProps={{ label: 'Seed' }}
        controllerProps={{
          name: 'ac_seed',
          control: methods.control,
        }}
      >
        {({ field: { value, onChange } }) => (
          <SeedRandomInput
            value={[value ?? 1]}
            onChange={([newValue]) => onChange(newValue)}
            boundaries={{
              defaultNum: 11,
              min: 0,
              step: 1,
              digitsAfterDot: 0,
            }}
          />
        )}
      </ControlledFormField>
      <ControlledFormField<ACFormInputs, 'weight'>
        formFieldProps={{ label: 'Weight' }}
        controllerProps={{
          name: 'weight',
          control: methods.control,
        }}
      >
        {({ field: { value, onChange } }) => (
          <NumberInput
            value={[value ?? 1]}
            onChange={([newValue]) => onChange(newValue)}
            slider
            boundaries={{
              defaultNum: 0.1,
              min: 0,
              includingMin: false,
              max: 1,
              step: 0.01,
              digitsAfterDot: 2,
            }}
          />
        )}
      </ControlledFormField>
    </>
  );
};

ACForm.onSubmit = (fieldValues) => {
  return _.pick(fieldValues, ACFields);
};
// использовать zod
ACForm.mutationFn = ({ datasets, data }) =>
  datasets.length
    ? createMutationFn('/api/tasks')({
        body: {
          files_ids: datasets,
          config: {
            primitive_name: 'ac',
            config: data,
          },
        },
      })
    : Promise.reject('No datasets selected');
