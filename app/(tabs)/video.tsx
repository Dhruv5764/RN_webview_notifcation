import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import React, { useEffect, useState } from 'react';
import { Alert, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

// Notification handler (foreground behavior)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function HomeScreen(): JSX.Element {
  const [granted, setGranted] = useState<boolean>(false);

  // Ask for permissions once
  useEffect(() => {
    (async () => {
      if (!Device.isDevice) return;
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      const ok = finalStatus === 'granted';
      setGranted(ok);
      if (!ok) Alert.alert('Permission needed', 'Enable notifications to test buttons.');
    })();
  }, []);

  const notify = async (
    title: string,
    body: string,
    seconds: number = 3,
    data: Record<string, unknown> = {}
  ): Promise<void> => {
    const s = Math.max(1, Number.isFinite(seconds) ? Math.trunc(seconds) : 3);
    await Notifications.scheduleNotificationAsync({
      content: { title, body, data },
      trigger: { seconds: s, repeats: false } as Notifications.TimeIntervalTriggerInput,
    });
  };

  return (
    <View style={styles.container}>
      {/* Web content */}
      <View style={styles.webviewWrap}>
        <WebView
          source={{ uri: 'https://reactnative.dev/docs/getting-started' }}
          onLoadEnd={() => {
            // fire-and-forget; ignore returned Promise for TS
            void notify('WebView Loaded', 'The page finished loading.', 2);
          }}
          style={{ flex: 1 }}
        />
      </View>

      {/* Buttons */}
      <View style={styles.buttons}>
        <Pill
          label="Notify: Hello 👋"
          onPress={() => {
            setTimeout(() => {
              void notify('Hello 👋', 'Your first local notification!', 2);
            }, 1500);
          }}
          disabled={!granted}
        />
        <Pill
          label="Notify: local notification"
          onPress={() => {
            setTimeout(() => {
              void notify(
                'Local Notification', // title
                'Hello! This is a delayed message.', // body
                4, // seconds
                { action: 'open-video' } // data
              );
            }, 2000);
          }}
          disabled={!granted}
        />
      </View>
    </View>
  );
}

/* --------- Reusable pill button --------- */
type PillProps = {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
};

function Pill({ label, onPress, disabled }: PillProps): JSX.Element {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.pill,
        disabled && styles.pillDisabled,
        pressed && !disabled && styles.pillPressed,
      ]}
    >
      <Text style={[styles.pillText, disabled && styles.pillTextDisabled]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0e0f12' },
  webviewWrap: { flex: 1, backgroundColor: '#000' },
  buttons: {
    padding: 12,
    gap: 10,
    backgroundColor: Platform.select({ ios: '#0f1115', android: '#101217' }),
  },
  pill: {
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 999,
    backgroundColor: '#3b82f6',
  },
  pillPressed: { transform: [{ scale: 0.98 }] },
  pillDisabled: { backgroundColor: '#334155' },
  pillText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  pillTextDisabled: { color: '#cbd5e1' },
});
