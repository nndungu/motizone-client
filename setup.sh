#!/bin/bash

echo "🚗 Setting up Motizone Client for Node 20..."

# Check Node version
echo "📋 Node.js version:"
node --version

# Clean up
echo "🧹 Cleaning up..."
rm -rf node_modules package-lock.json

# Install Expo and core dependencies
echo "📦 Installing Expo and React Native..."
npx expo install

# Install React Navigation
echo "📦 Installing React Navigation..."
npx expo install @react-navigation/native
npx expo install @react-navigation/native-stack
npx expo install @react-navigation/bottom-tabs
npx expo install @react-navigation/drawer

# Install required dependencies
echo "📦 Installing required dependencies..."
npx expo install @react-native-async-storage/async-storage
npx expo install react-native-screens
npx expo install react-native-safe-area-context
npx expo install react-native-gesture-handler
npx expo install react-native-reanimated

# Install additional packages
echo "📦 Installing additional packages..."
npm install axios react-hook-form

echo "✅ Setup complete!"
echo "🎯 Run 'npm start' to begin development"
echo "📱 Scan the QR code with Expo Go app"