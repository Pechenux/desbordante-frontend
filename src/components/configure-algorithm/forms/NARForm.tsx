'use client';

import _ from 'lodash';
import { useEffect } from 'react';
//import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { SchemaNarTaskConfig } from '@/api/generated/schema';
import { createMutationFn } from '@/api/services/server';
import { ControlledFormField } from '@/components/common/uikit';
import { NumberInput, Select } from '@/components/common/uikit/Inputs';
import { FormComponent } from '@/types/form';
import { GetAllFieds } from '@/types/getAllFields';
import { NARAlgorithmOptions, NARFields } from './options/NAROptions';
import { NARPresets } from './presets/NARPresets';

export type NARFormInputs = SchemaNarTaskConfig['config'];
const defaultValue = NARPresets.common.at(-1)
  ?.preset as GetAllFieds<NARFormInputs>;

export const NARForm: FormComponent<NARFormInputs> = (
  {
    /*setPresets*/
  },
) => {
  const methods = useFormContext<NARFormInputs>();

  // const [algo_name] = useWatch<NARFormInputs>({
  //   name: ['algo_name'],
  // });

  // useEffect(() => {
  //   setPresets(FDPresets);
  //   methods.setValue('algo_name', defaultValue['algo_name']);
  // }, [methods, setPresets]);

  useEffect(() => {
    NARFields.forEach((key) => methods.setValue(key, defaultValue[key]));
  }, [methods]);

  return (
    <>
      <ControlledFormField<NARFormInputs, 'algo_name'>
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
            options={NARAlgorithmOptions}
          />
        )}
      </ControlledFormField>
      <ControlledFormField<NARFormInputs, 'seed'>
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
            boundaries={{
              defaultNum: 1,
              min: 0,
              step: 1,
              digitsAfterDot: 0,
            }}
          />
        )}
      </ControlledFormField>

      <ControlledFormField<NARFormInputs, 'population_size'>
        formFieldProps={{ label: 'Population size' }}
        controllerProps={{
          name: 'population_size',
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
      <ControlledFormField<NARFormInputs, 'minconf'>
        formFieldProps={{ label: 'Minimum confidence' }}
        controllerProps={{
          name: 'minconf',
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
      <ControlledFormField<NARFormInputs, 'max_fitness_evaluations'>
        formFieldProps={{ label: 'Maximun fitness evaluations' }}
        controllerProps={{
          name: 'max_fitness_evaluations',
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
      <ControlledFormField<NARFormInputs, 'minsup'>
        formFieldProps={{ label: 'Minimum support' }}
        controllerProps={{
          name: 'minsup',
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
      <ControlledFormField<NARFormInputs, 'differential_scale'>
        formFieldProps={{ label: 'Differential scale' }}
        controllerProps={{
          name: 'differential_scale',
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
      <ControlledFormField<NARFormInputs, 'crossover_probability'>
        formFieldProps={{ label: 'Crossover probability' }}
        controllerProps={{
          name: 'crossover_probability',
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

NARForm.onSubmit = (fieldValues) => {
  return _.pick(fieldValues, NARFields);
};
// использовать zod
NARForm.mutationFn = ({ datasets, data }) =>
  datasets.length
    ? createMutationFn('/api/tasks')({
        body: {
          files_ids: datasets,
          config: {
            primitive_name: 'nar',
            config: data,
          },
        },
      })
    : Promise.reject('No datasets selected');
