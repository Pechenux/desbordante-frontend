import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import _ from 'lodash';
import { useFormContext } from 'react-hook-form';
import { SchemaAfdVerificationTaskConfig } from '@/api/generated/schema';
import { createMutationFn, createQueryFn } from '@/api/services/server';
import { ControlledFormField } from '@/components/common/uikit';
import { CheckboxGroup, Select } from '@/components/common/uikit/Inputs';
import { fileIDsAtom } from '@/store/fileIDsAtom';
import { FormComponent } from '@/types/form';
import {
  AFDVerificationAlgorithmOptions,
  AFDVerificationFields,
} from './options/AFDVerificationOptions';
import { AFDVerificationPresets } from './presets/AFDVerificationPresets';

export type AFDVerificationFormInputs =
  SchemaAfdVerificationTaskConfig['config'];

export const AFDVerificationForm: FormComponent<
  AFDVerificationFormInputs
> = () => {
  const methods = useFormContext<AFDVerificationFormInputs>();

  const [fileIDs] = useAtom<Record<string, string>>(fileIDsAtom);
  const isDisabledColumnSelect = fileIDs['1'] === '';

  const { data } = useQuery({
    queryKey: [`/api/files/ids`, fileIDs],
    queryFn: createQueryFn('/api/files/ids', {
      params: {
        query: { ids: fileIDs['1'] ? [fileIDs['1']] : undefined },
      },
    }),
    enabled: true,
  });

  const fileInfo = data && data[0];

  const columnOptions =
    (fileInfo &&
      fileInfo.num_columns &&
      (fileInfo.with_header
        ? fileInfo.header?.map((column, i) => ({
            label: column,
            value: i,
          }))
        : [...Array(fileInfo.num_columns).keys()].map((i) => ({
            label: `Column ${i + 1}`,
            value: i,
          })))) ||
    undefined;

  return (
    <>
      <ControlledFormField<AFDVerificationFormInputs, 'algo_name'>
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
            options={AFDVerificationAlgorithmOptions}
          />
        )}
      </ControlledFormField>
      <ControlledFormField<AFDVerificationFormInputs, 'lhs_indices'>
        formFieldProps={{ label: 'LHS', disabled: isDisabledColumnSelect }}
        controllerProps={{
          name: 'lhs_indices',
          control: methods.control,
        }}
      >
        {({ field: { value, onChange } }) => (
          <Select
            isDisabled={isDisabledColumnSelect}
            isMulti
            value={value}
            onChange={onChange}
            options={columnOptions}
          />
        )}
      </ControlledFormField>
      <ControlledFormField<AFDVerificationFormInputs, 'rhs_indices'>
        formFieldProps={{ label: 'RHS', disabled: isDisabledColumnSelect }}
        controllerProps={{
          name: 'rhs_indices',
          control: methods.control,
        }}
      >
        {({ field: { value, onChange } }) => (
          <Select
            isDisabled={isDisabledColumnSelect}
            isMulti
            value={value}
            onChange={onChange}
            options={columnOptions}
          />
        )}
      </ControlledFormField>
      <ControlledFormField<AFDVerificationFormInputs, 'is_null_equal_null'>
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

AFDVerificationForm.presets = AFDVerificationPresets;
AFDVerificationForm.onSubmit = (fieldValues) => {
  return _.pick(fieldValues, AFDVerificationFields);
};
AFDVerificationForm.mutationFn = ({ datasets, data }) => {
  return datasets.length
    ? createMutationFn('/api/tasks')({
        body: {
          files_ids: datasets,
          config: {
            primitive_name: 'afd_verification',
            config: data,
          },
        },
      })
    : Promise.reject('No datasets selected');
};
