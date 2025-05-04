'use client';

import { useEffect } from 'react';
import { useQueryParams } from '@/utils/useQueryParams';

export default function MD() {
  const { setQueryParams } = useQueryParams<{ taskID: string }>();

  useEffect(
    () =>
      setQueryParams({
        newPathname: '/reports/md/result',
        erase: false,
        params: {},
      }),
    [setQueryParams],
  );
}
