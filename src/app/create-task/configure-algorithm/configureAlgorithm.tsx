'use client';

import { useRouter } from 'next/navigation';
import { memo } from 'react';
import { FormLayout } from '@/components/configure-algorithm/FormLayout';
// import {
//   ARForm,
//   CFDForm,
//   FDForm,
//   MFDForm,
//   TypoFDForm,
// } from '@/components/configure-algorithm/forms';
//import { FDForm } from '@/components/configure-algorithm/forms/FDForm';
import {
  DDForm,
  MDForm,
  NARForm,
  ADCForm,
  ACForm,
  AFDVerificationForm,
} from '@/components/configure-algorithm/forms';
import { PrimitiveType } from '@/constants/primitivesInfo/primitives';
import { FormComponent } from '@/types/form';
import { useQueryParams } from '@/utils/useQueryParams';
import styles from './configureAlgorithm.module.scss';

export interface datasetInputInfo {
  label: string;
  inputId: string;
  datasetId: string;
}

const forms: Partial<
  Record<
    PrimitiveType,
    {
      formComponent: FormComponent;
      datasetInputs: datasetInputInfo[];
    }
  >
> = {
  // FD: {
  //   formComponent: FDForm,
  //   datasetInputs: [{ label: 'Dataset', inputName: 'dataset_id' }],
  // },
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
  // FD: FDForm,
  // AR: ARForm,
  // CFD: CFDForm,
  // MFD: MFDForm,
  // TypoFD: TypoFDForm,
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
