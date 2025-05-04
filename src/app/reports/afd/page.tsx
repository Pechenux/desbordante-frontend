'use client';

import { useEffect } from 'react';
import { useQueryParams } from '@/utils/useQueryParams';

export default function AFD() {
  const { setQueryParams } = useQueryParams<{ taskID: string }>();

  useEffect(
    () =>
      setQueryParams({
        newPathname: '/reports/afd/result',
        erase: false,
        params: {},
      }),
    [setQueryParams],
  );
}
