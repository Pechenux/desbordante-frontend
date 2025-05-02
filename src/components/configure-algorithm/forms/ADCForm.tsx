import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import _ from 'lodash';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { SchemaAdcTaskConfig } from '@/api/generated/schema';
import { createMutationFn, createQueryFn } from '@/api/services/server';
import { ControlledFormField } from '@/components/common/uikit';
import { NumberInput, Select } from '@/components/common/uikit/Inputs';
import { fileIDsAtom } from '@/store/fileIDsAtom';
import { FormComponent } from '@/types/form';
import { GetAllFieds } from '@/types/getAllFields';
import {
  ADCAlgorithmOptions,
  ADCFields,
  allowCrossColumnsOptions,
} from './options/ADCOptions';
import { ADCPresets } from './presets/ADCPresets';

export type ADCFormInputs = SchemaAdcTaskConfig['config'];
const defaultValue = ADCPresets.common.at(-1)
  ?.preset as GetAllFieds<ADCFormInputs>;

export const ADCForm: FormComponent<ADCFormInputs> = (
  {
    /*setPresets*/
  },
) => {
  const methods = useFormContext<ADCFormInputs>();

  const [fileIDs] = useAtom<Record<string, string>>(fileIDsAtom);
  const isDisabledInput = fileIDs['1'] === '';

  // const [algo_name] = useWatch<NARFormInputs>({
  //   name: ['algo_name'],
  // });

  // useEffect(() => {
  //   setPresets(FDPresets);
  //   methods.setValue('algo_name', defaultValue['algo_name']);
  // }, [methods, setPresets]);

  useEffect(() => {
    ADCFields.forEach((key) => methods.setValue(key, defaultValue[key]));
  }, [methods]);

  const { data } = useQuery({
    queryKey: [`/api/files/ids`, fileIDs],
    queryFn: createQueryFn('/api/files/ids', {
      params: {
        query: { ids: fileIDs['1'] ? [fileIDs['1']] : undefined },
      },
    }),
    enabled: true,
  });

  const numRows = data && data[0]?.num_rows;
  return (
    <>
      <ControlledFormField<ADCFormInputs, 'algo_name'>
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
            options={ADCAlgorithmOptions}
          />
        )}
      </ControlledFormField>
      <ControlledFormField<ADCFormInputs, 'allow_cross_columns'>
        formFieldProps={{ label: 'Allow cross columns' }}
        controllerProps={{
          name: 'allow_cross_columns',
          control: methods.control,
        }}
      >
        {({ field: { value, onChange } }) => (
          <Select
            value={value}
            onChange={onChange}
            options={allowCrossColumnsOptions}
          />
        )}
      </ControlledFormField>
      <ControlledFormField<ADCFormInputs, 'shard_length'>
        formFieldProps={{ label: 'Shard length' }}
        controllerProps={{
          name: 'shard_length',
          control: methods.control,
          disabled: isDisabledInput,
        }}
      >
        {({ field: { value, onChange } }) => (
          <NumberInput
            disabled={isDisabledInput}
            value={[value ?? 1]}
            onChange={([newValue]) => onChange(newValue)}
            boundaries={{
              defaultNum: 1,
              min: 1,
              max: numRows,
              step: 1,
              digitsAfterDot: 0,
            }}
          />
        )}
      </ControlledFormField>
      <ControlledFormField<ADCFormInputs, 'minimum_shared_value'>
        formFieldProps={{ label: 'Minimum shared value' }}
        controllerProps={{
          name: 'minimum_shared_value',
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
              min: 0,
              max: 1,
              step: 0.01,
              digitsAfterDot: 2,
            }}
          />
        )}
      </ControlledFormField>
      <ControlledFormField<ADCFormInputs, 'comparable_threshold'>
        formFieldProps={{ label: 'Comparable threshold' }}
        controllerProps={{
          name: 'comparable_threshold',
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
              min: 0,
              max: 1,
              step: 0.01,
              digitsAfterDot: 2,
            }}
          />
        )}
      </ControlledFormField>
      <ControlledFormField<ADCFormInputs, 'evidence_threshold'>
        formFieldProps={{ label: 'Evidence threshold' }}
        controllerProps={{
          name: 'evidence_threshold',
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
              min: 0,
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

ADCForm.onSubmit = (fieldValues) => {
  return _.pick(fieldValues, ADCFields);
};
// использовать zod
ADCForm.mutationFn = ({ datasets, data }) =>
  datasets.length
    ? createMutationFn('/api/tasks')({
        body: {
          files_ids: datasets,
          config: {
            primitive_name: 'adc',
            config: data,
          },
        },
      })
    : Promise.reject('No datasets selected');
