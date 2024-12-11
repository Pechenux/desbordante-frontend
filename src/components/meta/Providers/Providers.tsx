'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider as JotaiProvider } from 'jotai';
import { getQueryClient } from '@/api/queryClient/queryClient';
import { PortalRoot } from '../PortalRoot';

export const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <PortalRoot>
          {children}
          {isDevelopment && <ReactQueryDevtools initialIsOpen={false} />}
        </PortalRoot>
      </JotaiProvider>
    </QueryClientProvider>
  );
};
