import { ResizeMode, Video } from 'expo-av';
import React, { useRef, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

const HLS_URL = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';

export default function VideoScreen() {
  const videoRef = useRef(null);
  const [status, setStatus] = useState({});
  const isReady = status?.isLoaded;
  const isPlaying = status?.isPlaying;
  const hasEnded = status?.didJustFinish;

  const togglePlay = async () => {
    if (!videoRef.current || !isReady) return;
    if (isPlaying) await videoRef.current.pauseAsync();
    else await videoRef.current.playAsync();
  };

  const goFullscreen = async () => {
    if (!videoRef.current || !isReady) return;
    await videoRef.current.presentFullscreenPlayer();
  };

  const replay = async () => {
    if (!videoRef.current) return;
    await videoRef.current.setPositionAsync(0);
    await videoRef.current.playAsync();
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>🎥 HLS Video Player</Text> */}

      <View style={styles.playerShell}>
        <Video
          ref={videoRef}
          style={styles.video}
          source={{ uri: HLS_URL }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          onPlaybackStatusUpdate={(s) => setStatus(s)}
        />

        {/* Overlay: show Replay when ended */}
        {hasEnded && (
          <Pressable style={styles.replayOverlay} onPress={replay}>
            <Text style={styles.replayText}>⟲ Start Again</Text>
          </Pressable>
        )}

        {/* Overlay: loading */}
        {!isReady && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" />
            <Text style={styles.loadingText}>Loading…</Text>
          </View>
        )}
      </View>

      {/* Custom bottom controls */}
      <View style={styles.controls}>
        <PillButton
          label={isPlaying ? 'Pause' : 'Play'}
          onPress={togglePlay}
          disabled={!isReady}
        />
        <PillButton label="Fullscreen" onPress={goFullscreen} disabled={!isReady} />
        <PillButton label="Replay" onPress={replay} disabled={!isReady} />
      </View>
    </View>
  );
}

/* ---------- Reusable pill button ---------- */
function PillButton({ label, onPress, disabled }) {
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

/* -------------------- styles -------------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e0f12',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  playerShell: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#000',
    position: 'relative',
  },
  video: {
    width: '100%',
    height: 240,
    backgroundColor: '#000',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 14,
  },
  pill: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 999,
    backgroundColor: '#3b82f6', // blue-500
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  pillPressed: {
    transform: [{ scale: 0.98 }],
  },
  pillDisabled: {
    backgroundColor: '#334155', // slate-700
  },
  pillText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  pillTextDisabled: {
    color: '#cbd5e1', // slate-300
  },
  replayOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  replayText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: 'rgba(59,130,246,0.9)',
    borderRadius: 999,
  },
  loadingOverlay: {
    position: 'absolute',
    inset: 0,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  loadingText: {
    color: '#e5e7eb',
  },
});
