'use client';

import { useEffect } from 'react';
import { useQueryParams } from '@/utils/useQueryParams';

export default function AFDVerification() {
  const { setQueryParams } = useQueryParams<{ taskID: string }>();

  useEffect(
    () =>
      setQueryParams({
        newPathname: '/reports/afd_verification/result',
        erase: false,
        params: {},
      }),
    [setQueryParams],
  );
}
