import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
import { useCart } from '../../../context/CartContext';
import { paymentsAPI } from '../../../api/payments';
import { ordersAPI } from '../../../api/orders';
import LoadingSpinner from '../../../components/LoadingSpinner';

const CheckoutScreen = ({ navigation, route }) => {
    const { cartItems, clearCart } = useCart();
    const [selectedPayment, setSelectedPayment] = useState('stripe');
    const [processing, setProcessing] = useState(false);

    const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handlePayment = async () => {
        if (cartItems.length === 0) {
            Alert.alert('Error', 'Your cart is empty');
            return;
        }

        setProcessing(true);
        try {
            // Create order first
            const orderData = {
                items: cartItems,
                totalAmount,
                paymentMethod: selectedPayment,
            };

            const order = await ordersAPI.createOrder(orderData);

            // Process payment
            let paymentResult;
            if (selectedPayment === 'stripe') {
                paymentResult = await paymentsAPI.stripePayment({
                    orderId: order.id,
                    amount: totalAmount,
                    currency: 'usd',
                });
            } else if (selectedPayment === 'mpesa') {
                paymentResult = await paymentsAPI.mpesaSimulate({
                    orderId: order.id,
                    amount: totalAmount,
                    phoneNumber: '+254712345678', // In real app, get from user
                });
            }

            if (paymentResult.success) {
                Alert.alert(
                    'Success',
                    'Payment processed successfully!',
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                                clearCart();
                                navigation.navigate('Orders');
                            },
                        },
                    ]
                );
            } else {
                Alert.alert('Payment Failed', paymentResult.message || 'Please try again');
            }
        } catch (error) {
            console.error('Payment error:', error);
            Alert.alert('Error', 'Failed to process payment. Please try again.');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Order Summary</Text>
                {cartItems.map((item, index) => (
                    <View key={index} style={styles.orderItem}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemPrice}>
                            ${item.price} x {item.quantity}
                        </Text>
                    </View>
                ))}
                <View style={styles.totalContainer}>
                    <Text style={styles.totalText}>Total: ${totalAmount.toFixed(2)}</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Payment Method</Text>

                <TouchableOpacity
                    style={[
                        styles.paymentOption,
                        selectedPayment === 'stripe' && styles.paymentOptionSelected,
                    ]}
                    onPress={() => setSelectedPayment('stripe')}
                >
                    <Text style={styles.paymentOptionText}>Credit/Debit Card (Stripe)</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.paymentOption,
                        selectedPayment === 'mpesa' && styles.paymentOptionSelected,
                    ]}
                    onPress={() => setSelectedPayment('mpesa')}
                >
                    <Text style={styles.paymentOptionText}>M-Pesa</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={[styles.payButton, processing && styles.payButtonDisabled]}
                onPress={handlePayment}
                disabled={processing}
            >
                {processing ? (
                    <LoadingSpinner size="small" color="#fff" />
                ) : (
                    <Text style={styles.payButtonText}>
                        Pay ${totalAmount.toFixed(2)}
                    </Text>
                )}
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    section: {
        backgroundColor: '#fff',
        margin: 16,
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
        color: '#1a1a1a',
    },
    orderItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    itemName: {
        fontSize: 14,
        color: '#333',
    },
    itemPrice: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#e1e1e1',
    },
    totalText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    paymentOption: {
        padding: 16,
        borderWidth: 1,
        borderColor: '#e1e1e1',
        borderRadius: 8,
        marginBottom: 8,
    },
    paymentOptionSelected: {
        borderColor: '#007bff',
        backgroundColor: '#f0f8ff',
    },
    paymentOptionText: {
        fontSize: 16,
        color: '#333',
    },
    payButton: {
        backgroundColor: '#007bff',
        margin: 16,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    payButtonDisabled: {
        backgroundColor: '#ccc',
    },
    payButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default CheckoutScreen;