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
import { MainPrimitives } from '@/constants/primitivesInfo/primitives';
import { FormComponent, FormData } from '@/types/form';
import { useQueryParams } from '@/utils/useQueryParams';
import styles from './configureAlgorithm.module.scss';

const forms: Partial<Record<MainPrimitives, FormComponent>> = {
  // FD: FDForm,
  // AR: ARForm,
  // CFD: CFDForm,
  // MFD: MFDForm,
  // TypoFD: TypoFDForm,
};

const ConfigurePrimitive = () => {
  const router = useRouter();
  const { queryParams } = useQueryParams<{ primitive: MainPrimitives }>();
  // const {
  //   primitive: { value: primitiveValue },
  //   fileID,
  //   config,
  // } = useTaskUrlParams();

  const primitiveValue = queryParams.primitive;
  const fileID = '';
  const config: FormData = { algorithmName: '' };

  if (primitiveValue === undefined) {
    router.push('/create-task/choose-primitive');
  }

  if (fileID === undefined) {
    router.push('/create-task/choose-file');
  }

  if (
    primitiveValue === undefined ||
    fileID === undefined ||
    !forms[primitiveValue]
  ) {
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
      fileID={fileID}
      primitive={primitiveValue}
      FormComponent={forms[primitiveValue]}
      startValues={config as FormData}
    />
  );
};

export default memo(ConfigurePrimitive);
