import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_600SemiBold,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto';

import { ErrorState, LoadingState } from '../components/AppStates';
import { useApp } from '../context/AppContext';
import { AppProvider } from '../context/AppProvider';
import { FeedbackProvider } from '../context/FeedbackProvider';
import { colors } from '../theme';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.fill}>
      <SafeAreaProvider>
        <AppProvider>
          <FeedbackProvider>
            <RootNavigator />
          </FeedbackProvider>
        </AppProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

function RootNavigator() {
  const [fontsLoaded, fontError] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_600SemiBold,
    Roboto_700Bold,
  });
  const { phase, startupError, retryStartup } = useApp();

  if (fontError) {
    console.warn('Huruf Roboto gagal dimuat, memakai huruf sistem.', fontError);
  }

  if (!fontsLoaded && !fontError) {
    return <LoadingState label="Menyiapkan aplikasi..." />;
  }

  if (phase === 'error') {
    return (
      <ErrorState
        message={startupError || 'Penyimpanan lokal tidak dapat dibaca.'}
        onAction={retryStartup}
        title="Gagal memuat data"
      />
    );
  }

  return (
    <>
      <StatusBar backgroundColor={colors.neutral.background} style="dark" translucent />
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: colors.neutral.background },
          headerShown: false,
        }}
      >
        <Stack.Screen name="(app)" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="transaction/[id]/index" />
        <Stack.Screen
          name="transaction/[id]/edit"
          options={{ animation: 'slide_from_bottom' }}
        />
        <Stack.Screen name="transaction/new" options={{ animation: 'slide_from_bottom' }} />
      </Stack>
    </>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
});
