'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useQueryParams<T = object>() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryParams = searchParams as unknown as Partial<T>;
  const urlSearchParams = new URLSearchParams(searchParams);

  function setQueryParams({
    newPathname,
    params,
  }: {
    newPathname?: string;
    params: Partial<T>;
  }) {
    Object.entries(params).forEach(([key, value]) => {
      urlSearchParams.set(key, String(value));
    });

    const search = urlSearchParams.toString();
    const query = search ? `?${search}` : '';

    const pagePathname = newPathname ?? pathname;

    router.push(`${pagePathname}${query}`);
  }

  return { queryParams, setQueryParams };
}
