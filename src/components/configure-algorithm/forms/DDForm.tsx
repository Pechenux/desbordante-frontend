import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import _ from 'lodash';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { SchemaDdTaskConfig } from '@/api/generated/schema';
import { createMutationFn, createQueryFn } from '@/api/services/server';
import { ControlledFormField } from '@/components/common/uikit';
import { NumberInput, Select } from '@/components/common/uikit/Inputs';
import { fileIDsAtom } from '@/store/fileIDsAtom';
import { FormComponent } from '@/types/form';
import { DDAlgorithmOptions, DDFields } from './options/DDOptions';
import { DDPresets } from './presets/DDPresets';

export type DDFormInputs = SchemaDdTaskConfig['config'];

export const DDForm: FormComponent<DDFormInputs> = () => {
  const methods = useFormContext<DDFormInputs>();

  const [fileIDs] = useAtom<Record<string, string>>(fileIDsAtom);
  const isDisabledInputs = !fileIDs['1'] || !fileIDs['2'];
  useEffect(() => {
    methods.setValue('num_columns', 0);
    methods.setValue('num_rows', 0);
  }, [fileIDs]);

  const { data } = useQuery({
    queryKey: [`/api/files/ids`, fileIDs],
    queryFn: createQueryFn('/api/files/ids', {
      params: {
        query: { ids: fileIDs['1'] ? [fileIDs['1']] : undefined },
      },
    }),
    enabled: !!fileIDs['1'],
  });

  const numRows = data && data[0]?.num_rows;
  const numColumns = data && data[0]?.num_columns;

  return (
    <>
      <ControlledFormField<DDFormInputs, 'algo_name'>
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
            options={DDAlgorithmOptions}
          />
        )}
      </ControlledFormField>
      <ControlledFormField<DDFormInputs, 'num_rows'>
        formFieldProps={{ label: 'Number of rows', disabled: isDisabledInputs }}
        controllerProps={{
          name: 'num_rows',
          control: methods.control,
        }}
      >
        {({ field: { value, onChange } }) => (
          <NumberInput
            disabled={isDisabledInputs}
            value={[value ?? 0]}
            onChange={([newValue]) => onChange(newValue)}
            boundaries={{
              defaultNum: 0,
              min: 0,
              max: numRows,
              step: 1,
              digitsAfterDot: 0,
            }}
          />
        )}
      </ControlledFormField>
      <ControlledFormField<DDFormInputs, 'num_columns'>
        formFieldProps={{
          label: 'Number of columns',
          disabled: isDisabledInputs,
        }}
        controllerProps={{
          name: 'num_columns',
          control: methods.control,
        }}
      >
        {({ field: { value, onChange } }) => (
          <NumberInput
            disabled={isDisabledInputs}
            value={[value ?? 0]}
            onChange={([newValue]) => onChange(newValue)}
            boundaries={{
              defaultNum: 0,
              min: 0,
              max: numColumns,
              step: 1,
              digitsAfterDot: 0,
            }}
          />
        )}
      </ControlledFormField>
    </>
  );
};

DDForm.presets = DDPresets;
DDForm.onSubmit = (fieldValues) => {
  return _.pick(fieldValues, DDFields);
};
DDForm.mutationFn = ({ datasets, data }) =>
  datasets.length
    ? createMutationFn('/api/tasks')({
        body: {
          files_ids: datasets,
          config: {
            primitive_name: 'dd',
            config: data,
          },
        },
      })
    : Promise.reject('No datasets selected');
