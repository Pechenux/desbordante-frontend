'use client';

import { useQueryParams } from '@/utils/useQueryParams';

export default function PFD() {
  const { setQueryParams } = useQueryParams<{ taskID: string }>();

  setQueryParams({
    newPathname: '/reports/pfd/result',
    erase: false,
    params: {},
  });
}
