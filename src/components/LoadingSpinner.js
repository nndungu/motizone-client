import React from 'react';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

const LoadingSpinner = ({ size = 'large', color = colors.primary, text }) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={size} color={color} />
            {text && <Text style={styles.text}>{text}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    text: {
        marginTop: 10,
        color: colors.gray[600],
        fontSize: 14,
    },
});

export default LoadingSpinner;