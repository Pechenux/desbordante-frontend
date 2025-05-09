'use client';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { Provider as JotaiProvider } from 'jotai';
import { getQueryClient, persister } from '@/api/queryClient/queryClient';
import { PortalRoot } from '../PortalRoot';
import { ToastContainer } from '../ToastContainer';

export const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const queryClient = getQueryClient();

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <JotaiProvider>
        <PortalRoot>
          {children}
          {isDevelopment && <ReactQueryDevtools initialIsOpen={false} />}
          <ToastContainer />
        </PortalRoot>
      </JotaiProvider>
    </PersistQueryClientProvider>
  );
};
