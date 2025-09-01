'use client';

// Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Dev Tool
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Type
import { JSX, ReactNode } from 'react';

const QueryProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default QueryProvider;
