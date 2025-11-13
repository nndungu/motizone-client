import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing } from '../theme/colors';

const ErrorMessage = ({ message, onRetry, retryText = 'Try Again' }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.message}>{message}</Text>
            {onRetry && (
                <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
                    <Text style={styles.retryText}>{retryText}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.xl,
    },
    message: {
        fontSize: 16,
        color: colors.gray[600],
        textAlign: 'center',
        marginBottom: spacing.md,
    },
    retryButton: {
        backgroundColor: colors.primary,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        borderRadius: 6,
    },
    retryText: {
        color: colors.white,
        fontSize: 14,
        fontWeight: '600',
    },
});

export default ErrorMessage;