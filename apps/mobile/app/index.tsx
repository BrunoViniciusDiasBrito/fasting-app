import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { BrandLogo } from '@/src/shared/brand/BrandLogo';
import { APP_BRAND } from '@/src/shared/config/app-content';

export default function SplashScreen() {
  const router = useRouter();
  const theme = useTheme();
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(24)).current;
  const scale = useRef(new Animated.Value(0.88)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 650, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 650, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 7, tension: 55, useNativeDriver: true }),
    ]).start();

    const timeout = setTimeout(() => router.replace('/home'), 1600);
    return () => clearTimeout(timeout);
  }, [opacity, router, scale, translateY]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}> 
      <Animated.View style={{ opacity, transform: [{ translateY }, { scale }] }}>
        <BrandLogo size={132} />
      </Animated.View>
      <Animated.View style={[styles.footer, { opacity }]}> 
        <Text variant="titleMedium" style={{ color: theme.colors.onSurfaceVariant }}>{APP_BRAND.splashSubtitle}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  footer: { position: 'absolute', bottom: 72, alignItems: 'center' },
});
