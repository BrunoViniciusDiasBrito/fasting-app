import { Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0F172A' }}>
      <Text style={{ color: '#E2E8F0', fontSize: 22, fontWeight: '700' }}>FastFlow</Text>
      <Text style={{ color: '#94A3B8', marginTop: 8 }}>Estrutura base criada com foco em produção.</Text>
    </View>
  );
}
