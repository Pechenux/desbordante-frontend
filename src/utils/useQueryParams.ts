'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export function useQueryParams<T = object>() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryParams = useMemo(
    () => Object.fromEntries(searchParams.entries()) as unknown as Partial<T>,
    [searchParams],
  );
  const urlSearchParams = new URLSearchParams(searchParams);

  function setQueryParams({
    newPathname,
    params,
    erase = true,
  }: {
    newPathname?: string;
    params: Partial<T>;
    erase?: boolean;
  }) {
    const currentQueryParams = erase ? new URLSearchParams() : urlSearchParams;

    Object.entries(params).forEach(([key, value]) => {
      currentQueryParams.set(key, String(value));
    });

    const search = currentQueryParams.toString();
    const query = search ? `?${search}` : '';

    const pagePathname = newPathname ?? pathname;

    router.push(`${pagePathname}${query}`);
  }

  return { queryParams, setQueryParams };
}
