import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import DashboardCard from "../../components/DashboardCard";
import { useAuth } from "../../context/AuthContext";

export default function FinanceDashboard({ navigation }) {
    const { logout } = useAuth();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Finance Agent Dashboard</Text>

            <View style={styles.grid}>
                <DashboardCard title="Review Applications" icon="briefcase-outline" onPress={() => navigation.navigate("FinancingReview")} />
                <DashboardCard title="Approved Loans" icon="checkmark-done-circle-outline" onPress={() => navigation.navigate("ApprovedLoans")} />
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
