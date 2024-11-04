'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { getQueryClient } from '@/api/queryClient/queryClient';
import { ModalRoot } from '../ModalRoot';

export const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ModalRoot>
        {children}
        {isDevelopment && <ReactQueryDevtools initialIsOpen={false} />}
      </ModalRoot>
    </QueryClientProvider>
  );
};
