// import { FDPresets } from '@constants/presets/FDPresets';
import _ from 'lodash';
//import { useEffect, useMemo, useState } from 'react';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { createMutationFn } from '@/api/fetchFunctions';
import { SchemaDdTaskConfig } from '@/api/generated/schema';
import { ControlledFormField } from '@/components/common/uikit';
import { NumberInput, Select } from '@/components/common/uikit/Inputs';
//import { PrimitiveType } from '@/constants/primitivesInfo/primitives';
import { FormComponent } from '@/types/form';
import { GetAllFieds } from '@/types/getAllFields';
//import { UnionKeys } from '@/types/unionKeys';
import { DDAlgorithmOptions, DDFields } from './options/DDOptions';
import { DDPresets } from './presets/DDPresets';

export type DDFormInputs = SchemaDdTaskConfig['config'];
//type NARFormKeys = UnionKeys<DDFormInputs>;
const defaultValue = DDPresets.common.at(-1)
  ?.preset as GetAllFieds<DDFormInputs>;

export const DDForm: FormComponent<DDFormInputs> = (
  {
    /*setPresets*/
  },
) => {
  const methods = useFormContext<DDFormInputs>();

  // const [algo_name] = useWatch<NARFormInputs>({
  //   name: ['algo_name'],
  // });

  // useEffect(() => {
  //   setPresets(FDPresets);
  //   methods.setValue('algo_name', defaultValue['algo_name']);
  // }, [methods, setPresets]);

  useEffect(() => {
    DDFields.forEach((key) => methods.setValue(key, defaultValue[key]));
  }, [methods]);

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
        formFieldProps={{ label: 'Number of rows' }}
        controllerProps={{
          name: 'num_rows',
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
      <ControlledFormField<DDFormInputs, 'num_columns'>
        formFieldProps={{ label: 'Number of columns' }}
        controllerProps={{
          name: 'num_columns',
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
    </>
  );
};

DDForm.onSubmit = (fieldValues) => {
  //const algo_name = fieldValues.algo_name;
  return _.pick(fieldValues, DDFields);
};
// использовать zod
DDForm.mutationFn = ({ datasets, data }) =>
  datasets.length
    ? createMutationFn('/tasks/')({
        body: {
          files_ids: datasets,
          config: {
            primitive_name: 'dd',
            config: data,
          },
        },
      })
    : Promise.reject('No datasets selected');
