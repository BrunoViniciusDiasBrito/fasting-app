import { StyleSheet } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';

type MetricCardProps = {
  label: string;
  value: string;
  tone?: 'primary' | 'secondary' | 'tertiary';
};

export function MetricCard({ label, value, tone = 'primary' }: MetricCardProps) {
  const theme = useTheme();
  const color = theme.colors[tone];

  return (
    <Card mode="contained" style={styles.card}>
      <Card.Content>
        <Text variant="labelLarge" style={{ color }}>{label}</Text>
        <Text variant="headlineSmall" style={styles.value}>{value}</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, minWidth: 145 },
  value: { marginTop: 6, fontWeight: '800' },
});
