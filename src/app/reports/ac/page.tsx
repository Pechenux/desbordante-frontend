'use client';

import { useQueryParams } from '@/utils/useQueryParams';

export default function AC() {
  const { setQueryParams } = useQueryParams<{ taskID: string }>();

  setQueryParams({
    newPathname: '/reports/ac/result',
    erase: false,
    params: {},
  });
}
