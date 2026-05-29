import { MD3DarkTheme, MD3Theme } from 'react-native-paper';

export const fastFlowTheme: MD3Theme = {
  ...MD3DarkTheme,
  roundness: 18,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#34D399',
    secondary: '#818CF8',
    tertiary: '#FDBA74',
    background: '#07111F',
    surface: '#0F172A',
    surfaceVariant: '#172033',
    onSurface: '#E2E8F0',
    onSurfaceVariant: '#CBD5E1',
    outline: '#334155',
    error: '#FB7185',
  },
};
