import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { NativeModules } from 'react-native';

let TPStreams: any = null;
try {
  if (NativeModules.TPStreams) {
    const tpLib = require('react-native-tpstreams');
    TPStreams = tpLib.TPStreams;
  }
} catch (e) {
  console.warn('Failed to load react-native-tpstreams:', e);
}

if (TPStreams) {
  try {
    TPStreams.initialize('87r52e');
  } catch (err) {
    console.error('Failed to initialize TPStreams:', err);
  }
}

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="switch-course"
          options={{
            presentation: 'card',
            animation: 'slide_from_right',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="lecture/[id]"
          options={{
            presentation: 'card',
            animation: 'slide_from_right',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="announcement/[id]"
          options={{
            presentation: 'card',
            animation: 'slide_from_right',
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
}
