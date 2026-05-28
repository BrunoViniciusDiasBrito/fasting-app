import { Link } from 'expo-router';
import { PropsWithChildren } from 'react';
import { Card, Button, Text } from 'react-native-paper';
import { FEATURE_GATES } from '@/src/shared/config/app-content';
import { useFeatureAccess } from '../hooks/useFeatureAccess';

type FeatureGateProps = PropsWithChildren<{
  feature: keyof typeof FEATURE_GATES;
}>;

export function FeatureGate({ feature, children }: FeatureGateProps) {
  const access = useFeatureAccess(feature);

  if (access.canAccess) return <>{children}</>;

  return (
    <Card mode="contained">
      <Card.Content style={{ gap: 12 }}>
        <Text variant="titleLarge" style={{ fontWeight: '800' }}>{access.gate.title}</Text>
        <Text variant="bodyMedium">{access.gate.description}</Text>
        <Text variant="bodySmall">Plano atual: {access.currentPlan}. Necessário: {access.gate.minPlan}.</Text>
        <Link href="/subscription" asChild>
          <Button mode="contained">Ver planos</Button>
        </Link>
      </Card.Content>
    </Card>
  );
}
