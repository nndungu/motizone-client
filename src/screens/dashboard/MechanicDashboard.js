import React from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import DashboardCard from "../../components/DashboardCard";
import { useAuth } from "../../context/AuthContext";

export default function AdminDashboard({ navigation }) {
    const { logout } = useAuth();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Admin Dashboard</Text>

            <View style={styles.grid}>
                <DashboardCard title="Manage Users" icon="people-outline" onPress={() => navigation.navigate("Users")} />
                <DashboardCard title="Vehicle Inventory" icon="car-sport-outline" onPress={() => navigation.navigate("VehicleManagement")} />
                <DashboardCard title="Service Operations" icon="construct-outline" onPress={() => navigation.navigate("AdminServices")} />
                <DashboardCard title="Payments & Reports" icon="bar-chart-outline" onPress={() => navigation.navigate("Reports")} />
            </View>

            <Text style={styles.logout} onPress={logout}>Logout</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{ padding:20, alignItems:"center" },
    title:{ fontSize:26, fontWeight:"700", marginBottom:20 },
    grid:{ flexDirection:"row", flexWrap:"wrap", justifyContent:"center", width:"100%" },
    logout:{ marginTop:30, color:"#007bff", fontWeight:"600" }
});
