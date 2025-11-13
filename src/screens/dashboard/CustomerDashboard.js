import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import DashboardCard from "../../components/DashboardCard";
import { useAuth } from "../../context/AuthContext";

export default function CustomerDashboard({ navigation }) {
    const { logout } = useAuth();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Welcome to Motizone</Text>
            <Text style={styles.subtitle}>Customer Dashboard</Text>

            <View style={styles.grid}>
                <DashboardCard
                    title="Browse Vehicles"
                    icon="car-outline"
                    onPress={() => navigation.navigate("Vehicles")}
                />
                <DashboardCard
                    title="Rent a Car"
                    icon="key-outline"
                    onPress={() => navigation.navigate("Rentals")}
                />
                <DashboardCard
                    title="Car Services"
                    icon="construct-outline"
                    onPress={() => navigation.navigate("ServiceBooking")}
                />
                <DashboardCard
                    title="Customization"
                    icon="color-palette-outline"
                    onPress={() => navigation.navigate("Customization")}
                />
                <DashboardCard
                    title="Buy Parts"
                    icon="cog-outline"
                    onPress={() => navigation.navigate("Parts")}
                />
                <DashboardCard
                    title="Apply for Financing"
                    icon="cash-outline"
                    onPress={() => navigation.navigate("Financing")}
                />
            </View>

            <Text style={styles.logout} onPress={logout}>
                Logout
            </Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, alignItems: "center" },
    title: { fontSize: 26, fontWeight: "700", color: "#1a1a1a", marginBottom: 4 },
    subtitle: { fontSize: 14, color: "#555", marginBottom: 20 },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        width: "100%",
    },
    logout: {
        marginTop: 30,
        color: "#007bff",
        fontSize: 15,
        fontWeight: "600",
    },
});
