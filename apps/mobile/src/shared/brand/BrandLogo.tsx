import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { APP_BRAND } from '@/src/shared/config/app-content';

type BrandLogoProps = {
  size?: number;
  showWordmark?: boolean;
};

export function BrandLogo({ size = 112, showWordmark = true }: BrandLogoProps) {
  const theme = useTheme();
  const biteSize = size * 0.18;

  return (
    <View style={styles.wrap}>
      <View style={[styles.logo, { width: size, height: size, borderRadius: size / 2, backgroundColor: theme.colors.primary }]}>
        <View style={[styles.inner, { width: size * 0.52, height: size * 0.52, borderRadius: size * 0.26, backgroundColor: theme.colors.background }]} />
        <View style={[styles.tickHour, { height: size * 0.3, top: size * 0.27, backgroundColor: theme.colors.onSurface }]} />
        <View style={[styles.tickMinute, { width: size * 0.22, top: size * 0.55, left: size * 0.5, backgroundColor: theme.colors.onSurface }]} />
        {[0, 1, 2].map((item) => (
          <View
            key={item}
            style={[
              styles.bite,
              {
                width: biteSize,
                height: biteSize,
                borderRadius: biteSize / 2,
                right: -biteSize * 0.25,
                top: size * 0.1 + item * biteSize * 0.82,
                backgroundColor: theme.colors.background,
              },
            ]}
          />
        ))}
      </View>
      {showWordmark ? (
        <View style={styles.wordmark}>
          <Text variant="displaySmall" style={styles.wordStrong}>Fast</Text>
          <Text variant="displaySmall" style={[styles.wordStrong, { color: theme.colors.primary }]}>Flow</Text>
        </View>
      ) : null}
      {showWordmark ? <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>{APP_BRAND.tagline}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', gap: 12 },
  logo: { overflow: 'hidden', alignItems: 'center', justifyContent: 'center' },
  inner: { position: 'absolute' },
  tickHour: { position: 'absolute', width: 10, borderRadius: 10 },
  tickMinute: { position: 'absolute', height: 10, borderRadius: 10, transform: [{ rotate: '40deg' }] },
  bite: { position: 'absolute' },
  wordmark: { flexDirection: 'row', alignItems: 'center' },
  wordStrong: { fontWeight: '900', letterSpacing: -1 },
});
