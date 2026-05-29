import { Card, Text } from 'react-native-paper';
import { FeatureGate } from '@/src/features/subscription/ui/FeatureGate';
import { RECOMMENDATION_CARDS } from '@/src/shared/config/app-content';
import { Screen } from '@/src/shared/ui/Screen';

export default function RecommendationsScreen() {
  return (
    <Screen title="Recomendações" subtitle="Sugestões inteligentes para evoluir com segurança e consistência.">
      <FeatureGate feature="advancedRecommendations">
        {RECOMMENDATION_CARDS.map((card) => (
          <Card key={card.title} mode="contained">
            <Card.Content style={{ gap: 10 }}>
              <Text variant="labelLarge">{card.metric}</Text>
              <Text variant="titleLarge" style={{ fontWeight: '800' }}>{card.title}</Text>
              <Text variant="bodyMedium">{card.description}</Text>
            </Card.Content>
          </Card>
        ))}
      </FeatureGate>
    </Screen>
  );
}
