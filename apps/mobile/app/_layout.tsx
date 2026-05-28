import { Stack } from 'expo-router';
import { AppProviders } from '@/src/app/providers/AppProviders';

export default function RootLayout() {
  return (
    <AppProviders>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#07111F' },
          headerTintColor: '#E2E8F0',
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: '#07111F' },
        }}
      />
    </AppProviders>
  );
}
