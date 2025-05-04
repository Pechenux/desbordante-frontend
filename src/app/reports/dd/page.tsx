'use client';

import { useEffect } from 'react';
import { useQueryParams } from '@/utils/useQueryParams';

export default function DD() {
  const { setQueryParams } = useQueryParams<{ taskID: string }>();

  useEffect(
    () =>
      setQueryParams({
        newPathname: '/reports/dd/result',
        erase: false,
        params: {},
      }),
    [setQueryParams],
  );
}
