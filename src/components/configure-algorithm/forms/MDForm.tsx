'use client';

import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import _ from 'lodash';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { SchemaMdTaskConfigInput } from '@/api/generated/schema';
import { createMutationFn, createQueryFn } from '@/api/services/server';
import { ControlledFormField } from '@/components/common/uikit';
import {
  CheckboxGroup,
  NumberInput,
  Select,
} from '@/components/common/uikit/Inputs';
import { fileIDsAtom } from '@/store/fileIDsAtom';
import { FormComponent } from '@/types/form';
import { GetAllFieds } from '@/types/getAllFields';
import { ColumnMatchesInput } from '../MD/ColumnMatchesInput';
import {
  levelDefenitionOptions,
  MDAlgorithmOptions,
  MDFields,
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

  const [fileIDs] = useAtom<Record<string, string>>(fileIDsAtom);
  const isDisabledColumnMatches = fileIDs['1'] === ''; // left_table unselect

  useEffect(() => {
    MDFields.forEach((key) => methods.setValue(key, defaultValue[key]));
  }, [methods]);

  const { data } = useQuery({
    queryKey: [`/api/files/ids`, fileIDs],
    queryFn: createQueryFn('/api/files/ids', {
      params: {
        query: { ids: fileIDs['1'] ? [fileIDs['1']] : undefined },
      },
    }),
    enabled: !!fileIDs['1'],
  });

  const numRowsLeft = data && data[0]?.num_rows;
  const numRowsRight = data && data[1]?.num_rows;

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
      <ControlledFormField<MDFormInputs, 'column_matches'>
        formFieldProps={{
          label: 'Column matches',
          disabled: isDisabledColumnMatches,
        }}
        controllerProps={{
          name: 'column_matches',
          control: methods.control,
        }}
      >
        {({ field: { value, onChange } }) => (
          <ColumnMatchesInput
            value={value}
            onChange={onChange}
            disabled={isDisabledColumnMatches}
          />
        )}
      </ControlledFormField>

      <ControlledFormField<MDFormInputs, 'min_support'>
        formFieldProps={{
          label: 'Minimum support',
          disabled: isDisabledColumnMatches,
        }}
        controllerProps={{
          name: 'min_support',
          control: methods.control,
        }}
      >
        {({ field: { value, onChange } }) => (
          <NumberInput
            disabled={isDisabledColumnMatches}
            value={[value ?? 1]}
            onChange={([newValue]) => onChange(newValue)}
            boundaries={{
              defaultNum: 1,
              min: 0,
              max: (numRowsLeft ?? 1) * (numRowsRight ?? 1),
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
      <ControlledFormField<MDFormInputs, 'threads'>
        formFieldProps={{ label: 'Thread count' }}
        controllerProps={{
          name: 'threads',
          control: methods.control,
        }}
      >
        {({ field: { value, onChange } }) => (
          <NumberInput
            value={[value ?? 1]}
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
      <ControlledFormField<MDFormInputs, 'prune_nondisjoint'>
        formFieldProps={{ label: 'Prune nondisjoint' }}
        controllerProps={{
          name: 'prune_nondisjoint',
          control: methods.control,
        }}
      >
        {({ field: { value, onChange } }) => (
          <CheckboxGroup
            values={value ? ['isPrune'] : []}
            onChange={(newValue) => {
              onChange(newValue.length > 0);
            }}
            options={[{ label: 'Prune', value: 'isPrune' }]}
          />
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
  return datasets.length
    ? createMutationFn('/api/tasks')({
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
