'use client';

import { useEffect } from 'react';
import { useQueryParams } from '@/utils/useQueryParams';

export default function MFDVerification() {
  const { setQueryParams } = useQueryParams<{ taskID: string }>();

  useEffect(
    () =>
      setQueryParams({
        newPathname: '/reports/mfd_verification/clusters',
        erase: false,
        params: {},
      }),
    [setQueryParams],
  );
}
