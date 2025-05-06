import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import _ from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import {
  MFDVerificationCosineConfigMetric,
  MFDVerificationEuclideanConfigMetric,
  MFDVerificationMetricAlgorithm,
  SchemaMfdVerificationTaskConfigInput,
} from '@/api/generated/schema';
import { createMutationFn, createQueryFn } from '@/api/services/server';
import {
  CheckboxGroup,
  ControlledFormField,
  NumberInput,
  Select,
  SelectOption,
} from '@/components/common/uikit';
import { fileIDsAtom } from '@/store/fileIDsAtom';
import { FormComponent } from '@/types/form';
import {
  MFDAlgorithmOptions,
  MFDColumnCategories,
  MFDColumnCategoriesOptions,
  MFDMetricOptions,
} from './options/MFDOptions';
import { MFDPresets } from './presets/MFDPresets';

export type MFDFormInputs = SchemaMfdVerificationTaskConfigInput['config'] & {
  rhsColumnType: MFDColumnCategories;
};

export const MFDForm: FormComponent<MFDFormInputs> = () => {
  const methods = useFormContext<MFDFormInputs>();

  const [rhsColumnType] = useWatch({
    name: ['rhsColumnType'],
  });
  const [metric, rhs_indices] = useWatch({
    name: ['metric', 'rhs_indices'],
  });

  const [fileIDs] = useAtom(fileIDsAtom);

  const { data, isLoading } = useQuery({
    queryKey: [`/api/files/ids`, fileIDs],
    queryFn: createQueryFn('/api/files/ids', {
      params: {
        query: { ids: fileIDs['1'] ? [fileIDs['1']] : undefined },
      },
    }),
    enabled: !!fileIDs['1'],
  });

  useEffect(() => {
    methods.trigger(['metric']);
  }, [methods, rhsColumnType]);
  useEffect(() => {
    methods.trigger(['metric_algorithm']);
  }, [methods, rhs_indices, rhsColumnType]);

  const qDisabled = metric !== MFDVerificationCosineConfigMetric.cosine;

  const [columnMode, setColumnMode] = useState<
    'manual' | 'auto' | 'error' | 'errorMixTypes'
  >('manual');

  const columnData: SelectOption<number>[] = useMemo(() => {
    const dataset = data?.[0];

    if (dataset) {
      const countOfColumns: number = dataset.num_columns;
      const hasHeader: boolean = dataset.with_header;
      const headers: string[] = dataset.header || [];

      return [...Array(countOfColumns)].map((_, i) => ({
        label: hasHeader ? `${i + 1}: ${headers[i]}` : `Column ${i + 1}`,
        value: i,
      }));
    }

    return [];
  }, [data]);

  useEffect(() => {
    methods.trigger(['rhs_indices']);
  }, [columnMode, methods, rhsColumnType]);

  useEffect(() => {
    if (
      !Array.isArray(rhs_indices) ||
      columnData.length === 0 ||
      columnData.some((elem) => (elem.badges ?? []).length == 0)
    ) {
      setColumnMode('manual');
      return;
    }

    const types: MFDColumnCategories[] = [];

    if (types.length === 0) {
      setColumnMode('manual');
    } else if (types.length === 1) {
      const columnType = types[0];
      if (
        MFDColumnCategories.Numeric === columnType ||
        MFDColumnCategories.String === columnType
      ) {
        setColumnMode('auto');
        methods.setValue('rhsColumnType', columnType);
      } else {
        setColumnMode('error');
      }
    } else {
      setColumnMode('errorMixTypes');
    }
  }, [columnData, methods, rhs_indices]);

  return (
    <>
      <ControlledFormField<MFDFormInputs, 'lhs_indices'>
        formFieldProps={{ label: 'LHS Columns' }}
        controllerProps={{
          name: 'lhs_indices',
          control: methods.control,
          rules: {
            validate: (value) => {
              if (Array.isArray(value))
                return value.length > 0 ? undefined : 'Cannot be empty';
              return undefined;
            },
          },
        }}
      >
        {({ field: { value, onChange } }) => (
          <Select
            value={value}
            onChange={onChange}
            options={columnData}
            isLoading={isLoading}
            isMulti
          />
        )}
      </ControlledFormField>
      <ControlledFormField<MFDFormInputs, 'rhs_indices'>
        formFieldProps={{ label: 'RHS Columns' }}
        controllerProps={{
          name: 'rhs_indices',
          control: methods.control,
          rules: {
            validate: (value, formState) => {
              if (Array.isArray(value) && value.length === 0)
                return 'Cannot be empty';

              if (columnMode === 'error') return 'Choose different columns';

              if (columnMode === 'errorMixTypes')
                return 'Columns must have one type';

              if (
                Array.isArray(value) &&
                formState.rhsColumnType === 'String' &&
                value.length > 1
              )
                return 'Must contain only one column of type "String"';
              return undefined;
            },
          },
        }}
      >
        {({ field: { value, onChange } }) => (
          <Select
            value={value}
            onChange={onChange}
            options={columnData}
            isLoading={isLoading}
            isMulti
          />
        )}
      </ControlledFormField>
      <ControlledFormField<MFDFormInputs, 'rhsColumnType'>
        formFieldProps={{
          label: 'RHS column type',
          disabled: columnMode === 'auto',
        }}
        controllerProps={{
          name: 'rhsColumnType',
          control: methods.control,
        }}
      >
        {({ field: { value, onChange } }) => (
          <Select
            value={value}
            onChange={onChange}
            options={MFDColumnCategoriesOptions}
            isLoading={isLoading}
          />
        )}
      </ControlledFormField>
      <ControlledFormField<MFDFormInputs, 'metric'>
        formFieldProps={{
          label: 'Metric',
        }}
        controllerProps={{
          name: 'metric',
          control: methods.control,
          rules: {
            validate: (value, formState) => {
              return formState.rhsColumnType == MFDColumnCategories.Numeric &&
                value !== MFDVerificationEuclideanConfigMetric.euclidean
                ? 'Must be Euclidean if column type is numeric'
                : formState.rhsColumnType != MFDColumnCategories.Numeric &&
                    value === MFDVerificationEuclideanConfigMetric.euclidean
                  ? "Can't be Euclidean if column type is not numeric"
                  : undefined;
            },
          },
        }}
      >
        {({ field: { value, onChange } }) => (
          <Select
            value={value}
            onChange={onChange}
            options={MFDMetricOptions}
          />
        )}
      </ControlledFormField>
      <ControlledFormField<MFDFormInputs, 'metric_algorithm'>
        formFieldProps={{
          label: 'Algorithm',
        }}
        controllerProps={{
          name: 'metric_algorithm',
          control: methods.control,
          rules: {
            validate: (value, formState) => {
              if (Array.isArray(formState.rhs_indices))
                return value === MFDVerificationMetricAlgorithm.calipers &&
                  (formState.rhsColumnType != MFDColumnCategories.Numeric ||
                    formState.rhs_indices.length !== 2)
                  ? 'Count of RHS Columns must be 2'
                  : undefined;
              return undefined;
            },
          },
        }}
      >
        {({ field: { value, onChange } }) => (
          <Select
            value={value}
            onChange={onChange}
            options={MFDAlgorithmOptions}
          />
        )}
      </ControlledFormField>
      <ControlledFormField<MFDFormInputs, 'parameter'>
        formFieldProps={{ label: 'Tolerance parameter' }}
        controllerProps={{
          name: 'parameter',
          control: methods.control,
        }}
      >
        {({ field: { value, onChange } }) => (
          <NumberInput
            value={[value ?? 1]}
            onChange={([newValue]) => onChange(newValue)}
            boundaries={{
              defaultNum: 1.0,
              min: 0,
            }}
          />
        )}
      </ControlledFormField>
      <ControlledFormField<MFDFormInputs, 'q'>
        formFieldProps={{ label: 'Q-gram length', disabled: qDisabled }}
        controllerProps={{
          name: 'q',
          control: methods.control,
        }}
      >
        {({ field: { value, onChange } }) => (
          <NumberInput
            value={[value ?? 1]}
            onChange={([newValue]) => onChange(newValue)}
            boundaries={{
              defaultNum: 1.0,
              min: 1,
              includingMin: true,
              step: 1,
              digitsAfterDot: 0,
            }}
            disabled={qDisabled}
          />
        )}
      </ControlledFormField>
      <ControlledFormField<MFDFormInputs, 'dist_from_null_is_infinity'>
        formFieldProps={{
          label: 'Distance to null',
          tooltip: 'True is infinity, false is zero',
        }}
        controllerProps={{
          name: 'dist_from_null_is_infinity',
          control: methods.control,
        }}
      >
        {({ field: { value, onChange } }) => (
          <CheckboxGroup
            values={value ? ['isInfinity'] : []}
            onChange={(newValue) => {
              onChange(newValue.length > 0);
            }}
            options={[{ label: 'Infinity', value: 'isInfinity' }]}
          />
        )}
      </ControlledFormField>
    </>
  );
};

MFDForm.presets = MFDPresets;
MFDForm.onSubmit = (fieldValues) =>
  _.omit(
    {
      ...fieldValues,
      algo_name: 'metricverification',
      is_null_equal_null: true,
    },
    [
      'rhsColumnType',
      ...(fieldValues.metric === MFDVerificationCosineConfigMetric.cosine
        ? []
        : ['q']),
    ],
  );
MFDForm.mutationFn = ({ datasets, data }) => {
  return datasets.length
    ? createMutationFn('/api/tasks')({
        body: {
          files_ids: datasets,
          config: {
            primitive_name: 'mfd_verification',
            config: data,
          },
        },
      })
    : Promise.reject('No datasets selected');
};
