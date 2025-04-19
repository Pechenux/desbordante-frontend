'use client';

import { useQueryParams } from '@/utils/useQueryParams';

export default function FD() {
  const { setQueryParams } = useQueryParams<{ taskID: string }>();

  setQueryParams({
    newPathname: '/reports/afd/result',
    erase: false,
    params: {},
  });
}
