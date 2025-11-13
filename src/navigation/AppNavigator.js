import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../context/AuthContext';

// Import screens
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import CustomerDashboard from '../screens/customer/CustomerDashboard';
import VehicleListScreen from "../screens/vehicles/VehicleList";
import VehicleDetailsScreen from "../screens/vehicles/VehicleDetails";

import ServiceDashboard from '../screens/mechanic/ServiceDashboard';
import SplashScreen from '../screens/auth/SplashScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator for authenticated users
function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#ffffff',
                    borderTopWidth: 1,
                    borderTopColor: '#e5e5e5',
                },
                tabBarActiveTintColor: '#2563eb',
                tabBarInactiveTintColor: '#64748b',
            }}
        >
            <Tab.Screen
                name="Dashboard"
                component={CustomerDashboard}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Text style={{ fontSize: size, color }}>🏠</Text>
                    ),
                }}
            />
            <Tab.Screen
                name="Vehicles"
                component={VehicleList}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Text style={{ fontSize: size, color }}>🚗</Text>
                    ),
                }}
            />
            <Tab.Screen
                name="Services"
                component={ServiceDashboard}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Text style={{ fontSize: size, color }}>🔧</Text>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

// Stack Navigator
function AppStack() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <SplashScreen />;
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!isAuthenticated ? (
                <>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Signup" component={SignupScreen} />
                    <Stack.Screen name="Vehicles" component={VehicleListScreen} />
                    <Stack.Screen name="VehicleDetails" component={VehicleDetailsScreen} />
                </>
            ) : (
                <Stack.Screen name="Main" component={MainTabs} />
            )}
        </Stack.Navigator>
    );
}

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <AppStack />
        </NavigationContainer>
    );
}