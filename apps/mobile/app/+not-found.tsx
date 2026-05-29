import { Link, Stack } from 'expo-router';
import { Button, Text } from 'react-native-paper';
import { Screen } from '@/src/shared/ui/Screen';

export default function NotFoundScreen() {
  return (
    <Screen title="Rota não encontrada" subtitle="A tela solicitada não existe ou mudou de lugar.">
      <Stack.Screen options={{ title: 'Não encontrada' }} />
      <Text>Volte para o dashboard para continuar sua rotina de jejum.</Text>
      <Link href="/home" asChild>
        <Button mode="contained">Ir para o dashboard</Button>
      </Link>
    </Screen>
  );
}
