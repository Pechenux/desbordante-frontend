'use client';

import { useQueryParams } from '@/utils/useQueryParams';

export default function NAR() {
  const { setQueryParams } = useQueryParams<{ taskID: string }>();

  setQueryParams({
    newPathname: '/reports/nar/result',
    erase: false,
    params: {},
  });
}
