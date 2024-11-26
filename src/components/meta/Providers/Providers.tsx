'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
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
      <PortalRoot>
        {children}
        {isDevelopment && <ReactQueryDevtools initialIsOpen={false} />}
      </PortalRoot>
    </QueryClientProvider>
  );
};
