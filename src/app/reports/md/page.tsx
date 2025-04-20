'use client';

import { useQueryParams } from '@/utils/useQueryParams';

export default function MD() {
  const { setQueryParams } = useQueryParams<{ taskID: string }>();

  setQueryParams({
    newPathname: '/reports/md/result',
    erase: false,
    params: {},
  });
}
