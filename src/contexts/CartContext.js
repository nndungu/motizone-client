import React, { createContext, useState, useContext, useEffect } from 'react';
import { getStorageItem, setStorageItem } from '../util/storage';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        loadCartFromStorage();
    }, []);

    useEffect(() => {
        saveCartToStorage();
    }, [cartItems]);

    const loadCartFromStorage = async () => {
        try {
            const savedCart = await getStorageItem('cart_items');
            if (savedCart) {
                setCartItems(JSON.parse(savedCart));
            }
        } catch (error) {
            console.error('Error loading cart from storage:', error);
        }
    };

    const saveCartToStorage = async () => {
        try {
            await setStorageItem('cart_items', JSON.stringify(cartItems));
        } catch (error) {
            console.error('Error saving cart to storage:', error);
        }
    };

    const addToCart = (item) => {
        setCartItems(prev => {
            const existingItem = prev.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                return prev.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (itemId) => {
        setCartItems(prev => prev.filter(item => item.id !== itemId));
    };

    const updateQuantity = (itemId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(itemId);
            return;
        }
        setCartItems(prev =>
            prev.map(item =>
                item.id === itemId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getCartItemCount = () => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemCount,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};