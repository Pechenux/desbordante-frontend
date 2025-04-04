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
import { NARForm } from '@/components/configure-algorithm/forms/NARForm';
import { PrimitiveType } from '@/constants/primitivesInfo/primitives';
import { FormComponent } from '@/types/form';
import { useQueryParams } from '@/utils/useQueryParams';
import styles from './configureAlgorithm.module.scss';

const forms: Partial<
  Record<
    PrimitiveType,
    {
      formComponent: FormComponent;
      datasetInputs: { label: string; inputId: string; inputName: string }[];
    }
  >
> = {
  // FD: {
  //   formComponent: FDForm,
  //   datasetInputs: [{ label: 'Dataset', inputName: 'dataset_id' }],
  // },
  NAR: {
    formComponent: NARForm,
    datasetInputs: [
      { label: 'Dataset', inputId: 'dataset_id', inputName: 'dataset_name' },
    ],
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
