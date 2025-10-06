import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons'; // ✅ Expo-included icon set
import { Tabs } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
        }}
      >
        {/* Home Tab */}
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size ?? 28} color={color} />
            ),
          }}
        />

        {/* Video Player Tab */}
        <Tabs.Screen
          name="video"
          options={{
            title: 'Video Player',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="videocam" size={size ?? 28} color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
