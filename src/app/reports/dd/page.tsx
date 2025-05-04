'use client';

import { useQueryParams } from '@/utils/useQueryParams';

export default function DD() {
  const { setQueryParams } = useQueryParams<{ taskID: string }>();

  setQueryParams({
    newPathname: '/reports/dd/result',
    erase: false,
    params: {},
  });
}
