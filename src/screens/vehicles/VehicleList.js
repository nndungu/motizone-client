import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from "react-native";
import { VehicleAPI } from "../../api/vehicles";

export default function VehicleList({ navigation }) {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        VehicleAPI.getAll().then(data => {
            setVehicles(data);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    if (loading)
        return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("VehicleDetails", { vehicleId: item.id })}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <Text style={styles.name}>{item.make} {item.model}</Text>
            <Text style={styles.price}>KES {item.pricePerDay}/day</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={vehicles}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 10, paddingTop: 15 },
    card: {
        width: "48%",
        margin: "1%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: "#e6e6e6",
    },
    image: { width: "100%", height: 120, borderRadius: 8, marginBottom: 10 },
    name: { fontSize: 14, fontWeight: "600", color: "#333" },
    price: { marginTop: 4, fontSize: 13, color: "#007bff", fontWeight: "600" },
});
