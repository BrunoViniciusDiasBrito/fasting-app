import { Card, List, Text, useTheme } from 'react-native-paper';
import { INSTRUCTION_SECTIONS, MEDICAL_DISCLAIMER } from '@/src/features/instructions/model/instructions';
import { Screen } from '@/src/shared/ui/Screen';

export default function TipsScreen() {
  const theme = useTheme();

  return (
    <Screen title="Dicas e recomendações" subtitle="Conteúdo simples e responsável para preparar, manter e quebrar o jejum.">
      {INSTRUCTION_SECTIONS.map((section) => (
        <Card key={section.title} mode="contained">
          <Card.Content>
            <Text variant="titleLarge" style={{ color: theme.colors[section.tone], fontWeight: '800' }}>{section.title}</Text>
            {section.items.map((item) => (
              <List.Item key={item} title={item} titleNumberOfLines={3} left={(props) => <List.Icon {...props} icon="check-circle-outline" />} />
            ))}
          </Card.Content>
        </Card>
      ))}

      <Card mode="outlined">
        <Card.Content>
          <Text variant="titleMedium" style={{ color: theme.colors.error, fontWeight: '800' }}>Aviso de segurança</Text>
          <Text variant="bodyMedium">{MEDICAL_DISCLAIMER}</Text>
        </Card.Content>
      </Card>
    </Screen>
  );
}
