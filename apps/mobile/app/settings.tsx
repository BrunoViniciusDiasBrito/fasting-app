import { useQuery } from '@tanstack/react-query';
import { Link } from 'expo-router';
import { Button, Card, List, Switch, Text } from 'react-native-paper';
import { fetchReminders } from '@/src/features/reminders/api/reminders-api';
import { fetchMe } from '@/src/features/profile/api/profile-api';
import { Screen } from '@/src/shared/ui/Screen';

export default function SettingsScreen() {
  const profile = useQuery({ queryKey: ['me'], queryFn: fetchMe });
  const reminders = useQuery({ queryKey: ['reminders'], queryFn: fetchReminders });
  const activeReminders = reminders.data?.filter((item) => item.enabled).length ?? 0;

  return (
    <Screen title="Configurações" subtitle="Gerencie sua conta, privacidade, lembretes e monetização.">
      <Card mode="contained">
        <Card.Content>
          <Text variant="titleLarge">Conta</Text>
          <List.Item title={profile.data?.name ?? 'Usuário FastFlow'} description={profile.data?.email ?? 'Faça login para sincronizar dados'} left={(props) => <List.Icon {...props} icon="account-circle" />} />
          <List.Item title="Fuso horário" description={profile.data?.timezone ?? 'UTC'} left={(props) => <List.Icon {...props} icon="earth" />} />
        </Card.Content>
      </Card>

      <Card mode="contained">
        <Card.Content>
          <Text variant="titleLarge">Lembretes</Text>
          <List.Item title="Notificações motivacionais" description={`${activeReminders} lembretes ativos`} right={() => <Switch value={activeReminders > 0} />} />
          <List.Item title="Alertas de segurança" description="Recomendado para jejuns longos" right={() => <Switch value />} />
        </Card.Content>
      </Card>

      <Card mode="contained">
        <Card.Content>
          <Text variant="titleLarge">Privacidade e LGPD</Text>
          <List.Item title="Exportar meus dados" description="Disponível via endpoint /me/export-data" left={(props) => <List.Icon {...props} icon="download" />} />
          <List.Item title="Gerenciar consentimentos" description="Termos, privacidade, marketing e analytics" left={(props) => <List.Icon {...props} icon="shield-check" />} />
        </Card.Content>
      </Card>

      <Link href="/subscription" asChild>
        <Button mode="contained">Gerenciar assinatura</Button>
      </Link>
    </Screen>
  );
}
