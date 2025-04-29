import _ from 'lodash';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { SchemaPfdTaskConfig } from '@/api/generated/schema';
import { createMutationFn } from '@/api/services/server';
import { ControlledFormField } from '@/components/common/uikit';
import {
  CheckboxGroup,
  NumberInput,
  Select,
} from '@/components/common/uikit/Inputs';
import { FormComponent } from '@/types/form';
import { GetAllFieds } from '@/types/getAllFields';
import {
  PFDAlgorithmOptions,
  PFDErrorMeasuresOptions,
  PFDFields,
} from './options/PFDOptions';
import { PFDPresets } from './presets/PFDPresets';

export type PFDFormInputs = SchemaPfdTaskConfig['config'];
const defaultValue = PFDPresets.common.at(-1)
  ?.preset as GetAllFieds<PFDFormInputs>;

export const PFDForm: FormComponent<PFDFormInputs> = (
  {
    /*setPresets*/
  },
) => {
  const methods = useFormContext<PFDFormInputs>();

  useEffect(() => {
    PFDFields.forEach((key) => methods.setValue(key, defaultValue[key]));
  }, [methods]);

  // useEffect(() => {
  //   setPresets(FDPresets);
  //   methods.setValue('algo_name', defaultValue['algo_name']);
  // }, [methods, setPresets]);

  return (
    <>
      <ControlledFormField<PFDFormInputs, 'algo_name'>
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
            options={PFDAlgorithmOptions}
          />
        )}
      </ControlledFormField>
      <ControlledFormField<PFDFormInputs, 'max_lhs'>
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
      <ControlledFormField<PFDFormInputs, 'error'>
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
      <ControlledFormField<PFDFormInputs, 'pfd_error_measure'>
        formFieldProps={{ label: 'Error measure' }}
        controllerProps={{
          name: 'pfd_error_measure',
          control: methods.control,
        }}
      >
        {({ field: { value, onChange } }) => (
          <Select
            value={value}
            onChange={onChange}
            options={PFDErrorMeasuresOptions}
          />
        )}
      </ControlledFormField>
      <ControlledFormField<PFDFormInputs, 'is_null_equal_null'>
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
    </>
  );
};

PFDForm.onSubmit = (fieldValues) => {
  return _.pick(fieldValues, PFDFields);
};
// использовать zod
PFDForm.mutationFn = ({ datasets, data }) => {
  return datasets.length
    ? createMutationFn('/api/tasks')({
        body: {
          files_ids: datasets,
          config: {
            primitive_name: 'pfd',
            config: data,
          },
        },
      })
    : Promise.reject('No datasets selected');
};
