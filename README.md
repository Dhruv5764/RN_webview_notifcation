## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```


👇

📱 React Native (Expo) — WebView + Notifications + Video Player
🎯 Objective

This project is a React Native app built with Expo Router that demonstrates three key features:

WebView Integration — embedding a live website.

Local Notifications — triggered on user actions, with delayed scheduling.

HLS Video Player — streaming video playback with native and custom controls.

🧠 Features Overview
🧩 1. WebView + Notifications (Home Screen)

Displays a live website inside a React Native WebView.

Two buttons trigger distinct local notifications with a short delay (2–4 seconds).

Uses expo-notifications for scheduling and permission handling.


Permission request handled automatically on first load.

🎬 2. HLS Video Player (Video Screen)

Plays an HLS stream using expo-av’s Video component.
Stream URL:
https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8

Includes:

Play / Pause toggle

Fullscreen support

Replay button and overlay once video ends

Loading indicator while buffering

🔀 3. Navigation

Implemented with Expo Router and file-based routing.

Bottom tab navigation includes:

Home tab → WebView + Notifications

Video Player tab → Video playback screen
