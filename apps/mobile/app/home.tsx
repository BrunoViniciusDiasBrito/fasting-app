import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Chip, ProgressBar, Text, useTheme } from 'react-native-paper';
import { fetchAdsStatus } from '@/src/features/ads/api/ads-api';
import { fetchCurrentFast, fetchFastHistory, finishFast, startFast } from '@/src/features/fasting/api/fasting-api';
import { fetchSubscriptionStatus } from '@/src/features/subscription/api/subscription-api';
import { APP_BRAND, APP_ROUTES, DEFAULT_FASTING_PROTOCOL } from '@/src/shared/config/app-content';
import { MetricCard } from '@/src/shared/ui/MetricCard';
import { Screen } from '@/src/shared/ui/Screen';

function formatRemaining(expectedEndAt?: string) {
  if (!expectedEndAt) return 'Sem jejum ativo';
  const diffMs = new Date(expectedEndAt).getTime() - Date.now();
  if (diffMs <= 0) return 'Pronto para finalizar';
  const hours = Math.floor(diffMs / 3_600_000);
  const minutes = Math.floor((diffMs % 3_600_000) / 60_000);
  return `${hours}h ${minutes}min restantes`;
}

export default function HomeScreen() {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const currentFast = useQuery({ queryKey: ['fasting', 'current'], queryFn: fetchCurrentFast });
  const history = useQuery({ queryKey: ['fasting', 'history'], queryFn: fetchFastHistory });
  const subscription = useQuery({ queryKey: ['subscription', 'status'], queryFn: fetchSubscriptionStatus });
  const ads = useQuery({ queryKey: ['ads', 'status'], queryFn: fetchAdsStatus });

  const refreshFasting = () => {
    queryClient.invalidateQueries({ queryKey: ['fasting'] });
  };

  const startMutation = useMutation({ mutationFn: () => startFast(DEFAULT_FASTING_PROTOCOL.fastingHours), onSuccess: refreshFasting });
  const finishMutation = useMutation({
    mutationFn: () => finishFast(currentFast.data?.id ?? ''),
    onSuccess: refreshFasting,
  });

  const active = currentFast.data?.status === 'ACTIVE';
  const completed = history.data?.filter((item) => item.status === 'FINISHED').length ?? 0;
  const points = history.data?.reduce((sum, item) => sum + (item.pointsEarned ?? 0), 0) ?? 0;
  const levelProgress = Math.min(points / 500, 1);

  return (
    <Screen title={APP_BRAND.name} subtitle="Seu painel de foco, segurança e consistência no jejum intermitente.">
      <Card mode="contained" style={styles.hero}>
        <Card.Content style={styles.cardGap}>
          <View style={styles.rowBetween}>
            <Text variant="titleLarge" style={styles.strong}>{DEFAULT_FASTING_PROTOCOL.label}</Text>
            <Chip compact>{active ? 'Ativo' : 'Pronto'}</Chip>
          </View>
          <Text variant="displaySmall" style={{ color: theme.colors.primary }}>{formatRemaining(currentFast.data?.expectedEndAt)}</Text>
          <ProgressBar progress={active ? 0.48 : 0} color={theme.colors.primary} />
          <View style={styles.actions}>
            <Button mode="contained" loading={startMutation.isPending} disabled={active} onPress={() => startMutation.mutate()}>
              Iniciar jejum
            </Button>
            <Button mode="outlined" loading={finishMutation.isPending} disabled={!active} onPress={() => finishMutation.mutate()}>
              Finalizar
            </Button>
          </View>
        </Card.Content>
      </Card>

      <View style={styles.metrics}>
        <MetricCard label="Pontos" value={`${points}`} />
        <MetricCard label="Sessões" value={`${completed}`} tone="secondary" />
      </View>

      <Card mode="contained">
        <Card.Content style={styles.cardGap}>
          <Text variant="titleMedium" style={styles.strong}>Nível Iniciante</Text>
          <Text variant="bodyMedium">Continue com segurança. Seu progresso até Consistente:</Text>
          <ProgressBar progress={levelProgress} color={theme.colors.tertiary} />
        </Card.Content>
      </Card>

      <Card mode="contained">
        <Card.Content style={styles.cardGap}>
          <Text variant="titleMedium" style={styles.strong}>Plano e anúncios</Text>
          <Text>Plano atual: {subscription.data?.plan ?? 'FREE'}</Text>
          <Text>Anúncios: {ads.data?.showAds ? 'ativos no plano atual' : 'removidos'}</Text>
          <Link href="/subscription" asChild><Button mode="outlined">Ver paywall</Button></Link>
        </Card.Content>
      </Card>

      <View style={styles.actions}>
        {APP_ROUTES.map((route) => (
          <Link key={route.href} href={route.href} asChild>
            <Button mode="contained-tonal" icon={route.icon}>{route.label}</Button>
          </Link>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { borderWidth: 1, borderColor: '#1E293B' },
  cardGap: { gap: 14 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 },
  strong: { fontWeight: '800' },
  actions: { flexDirection: 'row', gap: 12, flexWrap: 'wrap' },
  metrics: { flexDirection: 'row', gap: 12, flexWrap: 'wrap' },
});
