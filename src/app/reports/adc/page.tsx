'use client';

import { useQueryParams } from '@/utils/useQueryParams';

export default function ADC() {
  const { setQueryParams } = useQueryParams<{ taskID: string }>();

  setQueryParams({
    newPathname: '/reports/adc/result',
    erase: false,
    params: {},
  });
}
