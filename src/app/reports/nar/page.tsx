'use client';

import { useEffect } from 'react';
import { useQueryParams } from '@/utils/useQueryParams';

export default function NAR() {
  const { setQueryParams } = useQueryParams<{ taskID: string }>();

  useEffect(
    () =>
      setQueryParams({
        newPathname: '/reports/nar/result',
        erase: false,
        params: {},
      }),
    [setQueryParams],
  );
}
