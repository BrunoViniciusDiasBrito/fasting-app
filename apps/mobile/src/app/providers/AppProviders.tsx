import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren, useMemo } from 'react';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { setupInterceptors } from '@/src/shared/api/interceptors';
import { fastFlowTheme } from '@/src/shared/theme/theme';

export function AppProviders({ children }: PropsWithChildren) {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            staleTime: 30_000,
          },
        },
      }),
    [],
  );

  useMemo(() => setupInterceptors(), []);

  return (
    <SafeAreaProvider>
      <PaperProvider theme={fastFlowTheme}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
