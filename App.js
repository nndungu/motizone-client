import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';

// Import your contexts
import { AuthProvider } from './src/context/AuthContext';
import { CartProvider } from './src/context/CartContext';

// Import your navigator
import AppNavigator from './src/navigation/AppNavigator';

const Stack = createNativeStackNavigator();

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                // Pre-load fonts, make any API calls you need to do here
                await Promise.all([
                    // Add any async tasks here (fonts, API calls, etc.)
                ]);
            } catch (e) {
                console.warn(e);
            } finally {
                // Tell the application to render
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            // This tells the splash screen to hide immediately
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    return (
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <AuthProvider>
                <CartProvider>
                    <NavigationContainer>
                        <AppNavigator />
                        <StatusBar style="auto" />
                    </NavigationContainer>
                </CartProvider>
            </AuthProvider>
        </View>
    );
}