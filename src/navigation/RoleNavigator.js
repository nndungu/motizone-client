import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";
import { USER_ROLES } from "../config";

// Dashboards
import CustomerDashboard from "../screens/dashboard/CustomerDashboard";
import MechanicDashboard from "../screens/dashboard/MechanicDashboard";
import AdminDashboard from "../screens/dashboard/AdminDashboard";
import FinanceDashboard from "../screens/dashboard/FinanceDashboard";

const Stack = createNativeStackNavigator();

export default function RoleNavigator() {
    const { user } = useAuth();

    switch (user.role) {
        case USER_ROLES.MECHANIC:
            return <Stack.Navigator><Stack.Screen name="MechanicDashboard" component={MechanicDashboard} /></Stack.Navigator>;

        case USER_ROLES.ADMIN:
            return <Stack.Navigator><Stack.Screen name="AdminDashboard" component={AdminDashboard} /></Stack.Navigator>;

        case USER_ROLES.FINANCE_AGENT:
            return <Stack.Navigator><Stack.Screen name="FinanceDashboard" component={FinanceDashboard} /></Stack.Navigator>;

        default:
            return <Stack.Navigator><Stack.Screen name="CustomerDashboard" component={CustomerDashboard} /></Stack.Navigator>;
    }
}
