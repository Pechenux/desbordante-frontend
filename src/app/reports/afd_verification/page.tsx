'use client';

import { useQueryParams } from '@/utils/useQueryParams';

export default function AFDVerification() {
  const { setQueryParams } = useQueryParams<{ taskID: string }>();

  setQueryParams({
    newPathname: '/reports/afd_verification/result',
    erase: false,
    params: {},
  });
}
