'use client';

import { useQueryParams } from '@/utils/useQueryParams';

export default function FD() {
  const { setQueryParams } = useQueryParams<{ taskID: string }>();

  setQueryParams({
    newPathname: '/reports/acd/result',
    erase: false,
    params: {},
  });
}
