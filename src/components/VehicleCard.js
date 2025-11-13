import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function VehicleCard({ vehicle, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Text style={styles.title}>{vehicle.make} {vehicle.model}</Text>
      <Text>{vehicle.year} • {vehicle.color}</Text>
      <Text>{vehicle.price ? `KES ${vehicle.price}` : ''}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { padding: 12, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, marginBottom: 8 },
  title: { fontWeight: '600', marginBottom: 4 }
});
