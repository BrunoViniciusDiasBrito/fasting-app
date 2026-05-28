import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Card, Chip, Text } from 'react-native-paper';
import { syncSubscription, fetchSubscriptionStatus } from '@/src/features/subscription/api/subscription-api';
import { PAYWALL_PLANS } from '@/src/features/subscription/model/paywall-plans';
import { Screen } from '@/src/shared/ui/Screen';

export default function SubscriptionScreen() {
  const queryClient = useQueryClient();
  const status = useQuery({ queryKey: ['subscription', 'status'], queryFn: fetchSubscriptionStatus });
  const sync = useMutation({
    mutationFn: (planCode: string) => syncSubscription(planCode),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['subscription'] }),
  });

  return (
    <Screen title="Paywall FastFlow" subtitle="Escolha entre plano free, remover anúncios ou evoluir para recursos premium.">
      {PAYWALL_PLANS.map((plan) => {
        const selected = status.data?.plan === plan.code;
        return (
          <Card key={plan.code} mode={selected ? 'elevated' : 'contained'} onPress={() => plan.code !== 'FREE' && sync.mutate(plan.code)}>
            <Card.Content style={{ gap: 10 }}>
              <Chip compact>{selected ? 'Plano atual' : plan.priceLabel}</Chip>
              <Text variant="titleLarge" style={{ fontWeight: '800' }}>{plan.title}</Text>
              {plan.perks.map((perk) => <Text key={perk}>• {perk}</Text>)}
            </Card.Content>
          </Card>
        );
      })}
    </Screen>
  );
}
