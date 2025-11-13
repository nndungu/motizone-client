import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import { USER_ROLES } from '../config';

// Import your screens
import CustomerDashboard from '../screens/customer/CustomerDashboard';
import VehicleList from '../screens/sales/VehicleList';
import VehicleDetails from '../screens/sales/VehicleDetails';
import ServiceDashboard from '../screens/mechanic/ServiceDashboard';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const SalesStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="VehicleList" component={VehicleList} />
        <Stack.Screen name="VehicleDetails" component={VehicleDetails} />
    </Stack.Navigator>
);

const MainNavigator = () => {
    const { user } = useAuth();

    const getRoleBasedTabs = () => {
        switch (user?.role) {
            case USER_ROLES.CUSTOMER:
                return (
                    <>
                        <Tab.Screen name="Dashboard" component={CustomerDashboard} />
                        <Tab.Screen name="Vehicles" component={SalesStack} />
                        <Tab.Screen name="Services" component={ServiceDashboard} />
                    </>
                );

            case USER_ROLES.MECHANIC:
                return (
                    <>
                        <Tab.Screen name="Services" component={ServiceDashboard} />
                    </>
                );

            case USER_ROLES.ADMIN:
                return (
                    <>
                        <Tab.Screen name="Dashboard" component={CustomerDashboard} />
                        <Tab.Screen name="Vehicles" component={SalesStack} />
                        <Tab.Screen name="Services" component={ServiceDashboard} />
                    </>
                );

            default:
                return <Tab.Screen name="Dashboard" component={CustomerDashboard} />;
        }
    };

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: { backgroundColor: '#fff' },
            }}
        >
            {getRoleBasedTabs()}
        </Tab.Navigator>
    );
};

export default MainNavigator;