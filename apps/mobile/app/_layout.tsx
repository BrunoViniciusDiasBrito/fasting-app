import { Stack } from 'expo-router';
import { AppProviders } from '@/src/app/providers/AppProviders';

export default function RootLayout() {
  return (
    <AppProviders>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#07111F' },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </AppProviders>
  );
}
