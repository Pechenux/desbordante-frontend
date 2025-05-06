'use client';

import { useRouter } from 'next/navigation';
import { memo } from 'react';
import { FormLayout } from '@/components/configure-algorithm/FormLayout';
import {
  ACForm,
  ADCForm,
  AFDForm,
  AFDVerificationForm,
  ARForm,
  DDForm,
  FDForm,
  MDForm,
  NARForm,
  PFDForm,
  MFDForm,
} from '@/components/configure-algorithm/forms';
import { PrimitiveType } from '@/constants/primitivesInfo/primitives';
import { FormComponent } from '@/types/form';
import { useQueryParams } from '@/utils/useQueryParams';
import styles from './configureAlgorithm.module.scss';

export interface DatasetInputInfo {
  label: string;
  inputId: string;
  datasetId: string;
}

const forms: Partial<
  Record<
    PrimitiveType,
    {
      formComponent: FormComponent;
      datasetInputs: DatasetInputInfo[];
    }
  >
> = {
  FD: {
    formComponent: FDForm,
    datasetInputs: [{ label: 'Dataset', inputId: '1', datasetId: '' }],
  },
  PFD: {
    formComponent: PFDForm,
    datasetInputs: [{ label: 'Dataset', inputId: '1', datasetId: '' }],
  },
  DD: {
    formComponent: DDForm,
    datasetInputs: [
      { label: 'Dataset', inputId: '1', datasetId: '' },
      {
        label: 'Difference table',
        inputId: '2',
        datasetId: '',
      },
    ],
  },
  MD: {
    formComponent: MDForm,
    datasetInputs: [
      { label: 'Left table', inputId: '1', datasetId: '' },
      { label: 'Right table (optional)', inputId: '2', datasetId: '' },
    ],
  },
  MFD: {
    formComponent: MFDForm,
    datasetInputs: [{ label: 'Dataset', inputId: '1', datasetId: '' }],
  },
  NAR: {
    formComponent: NARForm,
    datasetInputs: [{ label: 'Dataset', inputId: '1', datasetId: '' }],
  },
  ADC: {
    formComponent: ADCForm,
    datasetInputs: [{ label: 'Dataset', inputId: '1', datasetId: '' }],
  },
  AC: {
    formComponent: ACForm,
    datasetInputs: [{ label: 'Dataset', inputId: '1', datasetId: '' }],
  },
  AFDverification: {
    formComponent: AFDVerificationForm,
    datasetInputs: [{ label: 'Dataset', inputId: '1', datasetId: '' }],
  },
  AFD: {
    formComponent: AFDForm,
    datasetInputs: [{ label: 'Dataset', inputId: '1', datasetId: '' }],
  },
  AR: {
    formComponent: ARForm,
    datasetInputs: [{ label: 'Dataset', inputId: '1', datasetId: '' }],
  },
};

const ConfigurePrimitive = () => {
  const router = useRouter();
  const { queryParams } = useQueryParams<{ primitive: PrimitiveType }>();
  const primitiveValue = queryParams.primitive;

  if (primitiveValue === undefined) {
    router.push('/create-task/choose-primitive');
  }

  if (primitiveValue === undefined || !forms[primitiveValue]) {
    return (
      <div className={styles.filler}>
        <h6>
          &quot;{primitiveValue}&quot; primitive does not have configurator
        </h6>
      </div>
    );
  }

  return (
    <FormLayout
      FormComponent={forms[primitiveValue].formComponent}
      datasetInputs={forms[primitiveValue].datasetInputs}
    />
  );
};

export default memo(ConfigurePrimitive);
