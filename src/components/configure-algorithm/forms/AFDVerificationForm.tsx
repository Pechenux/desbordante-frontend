import { useAtom } from 'jotai';
import _ from 'lodash';
//import { useEffect, useMemo, useState } from 'react';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { createMutationFn } from '@/api/fetchFunctions';
import { SchemaAfdVerificationTaskConfig } from '@/api/generated/schema';
import { ControlledFormField } from '@/components/common/uikit';
import { Select } from '@/components/common/uikit/Inputs';
import { fileIDsAtom } from '@/store/fileIDsAtom';
import { FormComponent } from '@/types/form';
import { GetAllFieds } from '@/types/getAllFields';
import {
  AFDVerificationAlgorithmOptions,
  AFDVerificationFields,
  isNullEqualNullOptions,
} from './options/AFDVerificationOptions';
import { AFDVerificationPresets } from './presets/AFDVerificationPresets';
export type AFDVerificationFormInputs =
  SchemaAfdVerificationTaskConfig['config'];
const defaultValue = AFDVerificationPresets.common.at(-1)
  ?.preset as GetAllFieds<AFDVerificationFormInputs>;

export const AFDVerificationForm: FormComponent<AFDVerificationFormInputs> = (
  {
    /*setPresets*/
  },
) => {
  const methods = useFormContext<AFDVerificationFormInputs>();

  const [fileIDs] = useAtom<Record<string, string>>(fileIDsAtom);
  const isDisabledColumnSelect = fileIDs['1'] === '';

  // const [algo_name] = useWatch<NARFormInputs>({
  //   name: ['algo_name'],
  // });

  // useEffect(() => {
  //   setPresets(FDPresets);
  //   methods.setValue('algo_name', defaultValue['algo_name']);
  // }, [methods, setPresets]);

  useEffect(() => {
    AFDVerificationFields.forEach((key) =>
      methods.setValue(key, defaultValue[key]),
    );
  }, [methods]);

  const columns1 = [
    { label: 'Column1', value: 0 },
    { label: 'Column2', value: 1 },
    { label: 'Column3', value: 2 },
  ];

  const columns2 = [
    { label: 'aaa', value: 0 },
    { label: 'bbb', value: 1 },
    { label: 'ccc', value: 2 },
  ];

  const [columns, setColumns] = useState(columns1);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    setColumns(flag ? columns2 : columns1);
    setFlag(!flag);
  }, [fileIDs]);

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
        formFieldProps={{ label: 'LHS' }}
        controllerProps={{
          name: 'lhs_indices',
          control: methods.control,
          disabled: isDisabledColumnSelect,
        }}
      >
        {({ field: { value, onChange } }) => (
          <Select
            isDisabled={isDisabledColumnSelect}
            isMulti
            value={value}
            onChange={onChange}
            options={columns}
          />
        )}
      </ControlledFormField>
      <ControlledFormField<AFDVerificationFormInputs, 'rhs_indices'>
        formFieldProps={{ label: 'RHS' }}
        controllerProps={{
          name: 'rhs_indices',
          control: methods.control,
          disabled: isDisabledColumnSelect,
        }}
      >
        {({ field: { value, onChange } }) => (
          <Select
            isDisabled={isDisabledColumnSelect}
            isMulti
            value={value}
            onChange={onChange}
            options={columns}
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
          <Select
            value={value}
            onChange={onChange}
            options={isNullEqualNullOptions}
          />
        )}
      </ControlledFormField>
    </>
  );
};

AFDVerificationForm.onSubmit = (fieldValues) => {
  return _.pick(fieldValues, AFDVerificationFields);
};
// использовать zod
AFDVerificationForm.mutationFn = ({ datasets, data }) =>
  datasets.length
    ? createMutationFn('/tasks/')({
        body: {
          files_ids: datasets,
          config: {
            primitive_name: 'afd_verification',
            config: data,
          },
        },
      })
    : Promise.reject('No datasets selected');
