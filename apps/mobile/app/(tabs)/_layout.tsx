import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useTheme } from 'react-native-paper';

const TAB_ICON = {
  home: 'view-dashboard-outline',
  tips: 'lightbulb-on-outline',
  recommendations: 'chart-timeline-variant',
  subscription: 'credit-card-outline',
  settings: 'cog-outline',
} as const;

export default function TabsLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: theme.colors.background },
        headerTintColor: theme.colors.onSurface,
        headerTitleStyle: { fontWeight: '800' },
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.outline,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarIcon: ({ color, size }) => {
          const iconName = TAB_ICON[route.name as keyof typeof TAB_ICON] ?? 'circle-outline';
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="home" options={{ title: 'Dashboard' }} />
      <Tabs.Screen name="tips" options={{ title: 'Dicas' }} />
      <Tabs.Screen name="recommendations" options={{ title: 'Recomendações' }} />
      <Tabs.Screen name="subscription" options={{ title: 'Planos' }} />
      <Tabs.Screen name="settings" options={{ title: 'Ajustes' }} />
    </Tabs>
  );
}
