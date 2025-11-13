import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Motizone</Text>
      <Button title="Browse Vehicles" onPress={() => navigation.navigate('Vehicles')} />
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16 }, title: { fontSize: 20, fontWeight: '700', marginBottom: 12 } });
