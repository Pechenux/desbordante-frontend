// import { FDPresets } from '@constants/presets/FDPresets';
import _ from 'lodash';
//import { useEffect, useMemo, useState } from 'react';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { createMutationFn } from '@/api/fetchFunctions';
import { SchemaMdTaskConfigInput } from '@/api/generated/schema';
import { ControlledFormField } from '@/components/common/uikit';
import { NumberInput, Select } from '@/components/common/uikit/Inputs';
import { FormComponent } from '@/types/form';
import { GetAllFieds } from '@/types/getAllFields';
import { ColumnMatchesInput } from '../MD/ColumnMatchesInput';
import {
  levelDefenitionOptions,
  MDAlgorithmOptions,
  MDFields,
  pruneNondisjointOptions,
} from './options/MDOptions';
import { MDPresets } from './presets/MDPresets';

export type MDFormInputs = SchemaMdTaskConfigInput['config'];
const defaultValue = MDPresets.common.at(-1)
  ?.preset as GetAllFieds<MDFormInputs>;

export const MDForm: FormComponent<MDFormInputs> = (
  {
    /*setPresets*/
  },
) => {
  const methods = useFormContext<MDFormInputs>();

  // const [algo_name] = useWatch<NARFormInputs>({
  //   name: ['algo_name'],
  // });

  // useEffect(() => {
  //   setPresets(FDPresets);
  //   methods.setValue('algo_name', defaultValue['algo_name']);
  // }, [methods, setPresets]);

  useEffect(() => {
    MDFields.forEach((key) => methods.setValue(key, defaultValue[key]));
  }, [methods]);

  return (
    <>
      <ControlledFormField<MDFormInputs, 'algo_name'>
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
            options={MDAlgorithmOptions}
          />
        )}
      </ControlledFormField>

      <ControlledFormField<MDFormInputs, 'min_support'>
        formFieldProps={{ label: 'Minimum support' }}
        controllerProps={{
          name: 'min_support',
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
              max: 10, //TODO: size table
              step: 1,
              digitsAfterDot: 0,
            }}
          />
        )}
      </ControlledFormField>
      <ControlledFormField<MDFormInputs, 'max_cardinality'>
        formFieldProps={{ label: 'Maximum cardinality' }}
        controllerProps={{
          name: 'max_cardinality',
          control: methods.control,
        }}
      >
        {({ field: { value, onChange } }) => (
          <NumberInput
            value={[value ?? 1]}
            onChange={([newValue]) => onChange(newValue)}
            boundaries={{
              defaultNum: 1,
              min: -1,
              max: 10, //TODO: size table
              step: 1,
              digitsAfterDot: 0,
            }}
          />
        )}
      </ControlledFormField>
      <ControlledFormField<MDFormInputs, 'threads'>
        formFieldProps={{ label: 'Threads' }}
        controllerProps={{
          name: 'threads',
          control: methods.control,
        }}
      >
        {({ field: { value, onChange } }) => (
          <NumberInput
            value={[value ?? 1]}
            onChange={([newValue]) => onChange(newValue)}
            boundaries={{
              defaultNum: 0,
              min: 0,
              max: 65536,
              step: 1,
              digitsAfterDot: 0,
            }}
          />
        )}
      </ControlledFormField>
      <ControlledFormField<MDFormInputs, 'level_definition'>
        formFieldProps={{ label: 'Level definition' }}
        controllerProps={{
          name: 'level_definition',
          control: methods.control,
        }}
      >
        {({ field: { value, onChange } }) => (
          <Select
            value={value}
            onChange={onChange}
            options={levelDefenitionOptions}
          />
        )}
      </ControlledFormField>
      <ControlledFormField<MDFormInputs, 'prune_nondisjoint'>
        formFieldProps={{ label: 'Prune nondisjoint' }}
        controllerProps={{
          name: 'prune_nondisjoint',
          control: methods.control,
        }}
      >
        {({ field: { value, onChange } }) => (
          <Select
            value={value}
            onChange={onChange}
            options={pruneNondisjointOptions}
          />
        )}
      </ControlledFormField>

      <ControlledFormField<MDFormInputs, 'column_matches'>
        formFieldProps={{ label: 'Column matches' }}
        controllerProps={{
          name: 'column_matches',
          control: methods.control,
        }}
      >
        {({ field: { value, onChange } }) => (
          <ColumnMatchesInput value={value} onChange={onChange} />
        )}
      </ControlledFormField>
    </>
  );
};

MDForm.onSubmit = (fieldValues) => {
  return _.pick(fieldValues, MDFields);
};
// использовать zod
MDForm.mutationFn = ({ datasets, data }) => {
  console.log(4444, data);
  return datasets.length
    ? createMutationFn('/tasks/')({
        body: {
          files_ids: datasets,
          config: {
            primitive_name: 'md',
            config: data,
          },
        },
      })
    : Promise.reject('No datasets selected');
};
