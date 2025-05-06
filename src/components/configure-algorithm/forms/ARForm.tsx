import { useFormContext } from 'react-hook-form';
import {
  AprioriConfigAlgo_name,
  SchemaArTaskConfig,
} from '@/api/generated/schema';
import { createMutationFn } from '@/api/services/server';
import { ControlledFormField } from '@/components/common/uikit';
import { NumberInput, Select } from '@/components/common/uikit/Inputs';
import { FormComponent } from '@/types/form';
import { ARInputFormatOptions } from './options/AROptions';
import { ARPresets } from './presets/ARPresets';

export type ARFormInputs = SchemaArTaskConfig['config'];

export const ARForm: FormComponent<ARFormInputs> = () => {
  const methods = useFormContext<ARFormInputs>();

  return (
    <>
      <ControlledFormField<ARFormInputs, 'minconf'>
        controllerProps={{
          name: 'minconf',
          control: methods.control,
        }}
        formFieldProps={{ label: 'Minimum confidence' }}
      >
        {({ field: { value, onChange } }) => (
          <NumberInput
            value={[value ?? 0]}
            onChange={([newValue]) => onChange(newValue)}
            boundaries={{
              defaultNum: 0.0,
              min: 0,
              max: 1,
              step: 1e-4,
              digitsAfterDot: 4,
              includingMin: true,
              includingMax: true,
            }}
          />
        )}
      </ControlledFormField>
      <ControlledFormField<ARFormInputs, 'minsup'>
        controllerProps={{
          name: 'minsup',
          control: methods.control,
        }}
        formFieldProps={{ label: 'Minimum support' }}
      >
        {({ field: { value, onChange } }) => (
          <NumberInput
            value={[value ?? 0]}
            onChange={([newValue]) => onChange(newValue)}
            boundaries={{
              defaultNum: 0.0,
              min: 0,
              max: 1,
              step: 1e-4,
              digitsAfterDot: 4,
              includingMin: true,
              includingMax: true,
            }}
          />
        )}
      </ControlledFormField>
      <ControlledFormField<ARFormInputs, 'input_format'>
        controllerProps={{
          name: 'input_format',
          control: methods.control,
        }}
        formFieldProps={{ label: 'Input format' }}
      >
        {({ field: { value, onChange } }) => (
          <Select
            value={value}
            onChange={onChange}
            options={ARInputFormatOptions}
          />
        )}
      </ControlledFormField>
    </>
  );
};
ARForm.presets = ARPresets;
ARForm.onSubmit = (fieldValues) => ({
  ...fieldValues,
  algo_name: AprioriConfigAlgo_name.assosiatiorulesapriori,
});
ARForm.mutationFn = ({ datasets, data }) => {
  return datasets.length
    ? createMutationFn('/api/tasks')({
        body: {
          files_ids: datasets,
          config: {
            primitive_name: 'ar',
            config: data,
          },
        },
      })
    : Promise.reject('No datasets selected');
};
