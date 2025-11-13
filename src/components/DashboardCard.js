import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function DashboardCard({ title, icon, onPress }) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Ionicons name={icon} size={32} color="#007bff" style={styles.icon} />
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 18,
        alignItems: "center",
        justifyContent: "center",
        width: "45%",
        margin: "2.5%",
        borderWidth: 1,
        borderColor: "#e6e6e6",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    icon: { marginBottom: 10 },
    title: { fontSize: 16, fontWeight: "600", textAlign: "center", color: "#333" },
});
