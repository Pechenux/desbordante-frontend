import _ from 'lodash';
//import { useEffect, useMemo, useState } from 'react';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { createMutationFn } from '@/api/fetchFunctions';
import { SchemaAdcTaskConfig } from '@/api/generated/schema';
import { ControlledFormField } from '@/components/common/uikit';
import { NumberInput, Select } from '@/components/common/uikit/Inputs';
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
        formFieldProps={{ label: 'allow_cross_columns' }}
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
        formFieldProps={{ label: 'shard_length' }}
        controllerProps={{
          name: 'shard_length',
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
              max: 10, // TODO: table rows
              step: 1,
              digitsAfterDot: 0,
            }}
          />
        )}
      </ControlledFormField>
      <ControlledFormField<ADCFormInputs, 'minimum_shared_value'>
        formFieldProps={{ label: 'minimum_shared_value' }}
        controllerProps={{
          name: 'minimum_shared_value',
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
              step: 1,
              digitsAfterDot: 0,
            }}
          />
        )}
      </ControlledFormField>
      <ControlledFormField<ADCFormInputs, 'comparable_threshold'>
        formFieldProps={{ label: 'comparable_threshold' }}
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
        formFieldProps={{ label: 'evidence_threshold' }}
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
    ? createMutationFn('/tasks/')({
        body: {
          files_ids: datasets,
          config: {
            primitive_name: 'adc',
            config: data,
          },
        },
      })
    : Promise.reject('No datasets selected');
