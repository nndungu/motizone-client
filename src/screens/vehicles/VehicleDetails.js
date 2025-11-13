import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { VehicleAPI } from "../../api/vehicles";

export default function VehicleDetails({ route }) {
    const { vehicleId } = route.params;
    const [vehicle, setVehicle] = useState(null);

    useEffect(() => {
        VehicleAPI.getOne(vehicleId).then(setVehicle);
    }, []);

    if (!vehicle)
        return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

    const handleRent = async () => {
        await VehicleAPI.rent(vehicle.id);
        alert("Request Sent. Our agent will contact you.");
    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: vehicle.imageUrl }} style={styles.image} />

            <Text style={styles.title}>{vehicle.make} {vehicle.model}</Text>
            <Text style={styles.price}>KES {vehicle.pricePerDay}/day</Text>

            <Text style={styles.details}>{vehicle.description}</Text>

            <TouchableOpacity style={styles.button} onPress={handleRent}>
                <Text style={styles.buttonText}>Rent This Vehicle</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20 },
    image: { width: "100%", height: 240, borderRadius: 12, marginBottom: 20 },
    title: { fontSize: 22, fontWeight: "700", color: "#000" },
    price: { marginTop: 4, fontSize: 18, color: "#007bff", fontWeight: "600" },
    details: { marginVertical: 20, fontSize: 15, color: "#555", lineHeight: 22 },
    button: {
        backgroundColor: "#007bff",
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
