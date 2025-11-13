import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
} from 'react-native';
import { theme } from '../../theme';

const ServiceDashboard = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('available');

    const services = [
        {
            id: 1,
            title: 'Oil Change',
            description: 'Full synthetic oil change with filter replacement',
            price: 89,
            duration: '30 min',
            rating: 4.9,
            category: 'Maintenance',
        },
        {
            id: 2,
            title: 'Brake Service',
            description: 'Brake pad replacement and rotor inspection',
            price: 199,
            duration: '2 hours',
            rating: 4.8,
            category: 'Safety',
        },
        {
            id: 3,
            title: 'Tire Rotation',
            description: 'Rotate tires and check pressure',
            price: 49,
            duration: '45 min',
            rating: 4.7,
            category: 'Maintenance',
        },
    ];

    const categories = [
        { id: 'all', name: 'All Services' },
        { id: 'maintenance', name: 'Maintenance' },
        { id: 'safety', name: 'Safety' },
        { id: 'repair', name: 'Repair' },
        { id: 'diagnostic', name: 'Diagnostic' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>Auto Services</Text>
                    <Text style={styles.subtitle}>Professional car maintenance</Text>
                </View>
                <TouchableOpacity style={styles.cartButton}>
                    <Text style={styles.cartIcon}>🛒</Text>
                    <View style={styles.cartBadge}>
                        <Text style={styles.cartBadgeText}>2</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search services..."
                    placeholderTextColor={theme.colors.text.light}
                />
                <TouchableOpacity style={styles.searchButton}>
                    <Text style={styles.searchIcon}>🔍</Text>
                </TouchableOpacity>
            </View>

            {/* Categories */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoriesContainer}
            >
                {categories.map((category) => (
                    <TouchableOpacity
                        key={category.id}
                        style={styles.categoryChip}
                    >
                        <Text style={styles.categoryText}>{category.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Services List */}
            <ScrollView style={styles.servicesList}>
                {services.map((service) => (
                    <TouchableOpacity
                        key={service.id}
                        style={styles.serviceCard}
                        onPress={() => navigation.navigate('ServiceDetails', { service })}
                    >
                        <View style={styles.serviceHeader}>
                            <View>
                                <Text style={styles.serviceTitle}>{service.title}</Text>
                                <Text style={styles.serviceCategory}>{service.category}</Text>
                            </View>
                            <View style={styles.rating}>
                                <Text style={styles.ratingIcon}>⭐</Text>
                                <Text style={styles.ratingText}>{service.rating}</Text>
                            </View>
                        </View>

                        <Text style={styles.serviceDescription}>{service.description}</Text>

                        <View style={styles.serviceFooter}>
                            <View style={styles.serviceMeta}>
                                <Text style={styles.serviceDuration}>⏱ {service.duration}</Text>
                                <Text style={styles.servicePrice}>${service.price}</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.bookButton}
                                onPress={() => navigation.navigate('ServiceBooking', { service })}
                            >
                                <Text style={styles.bookButtonText}>Book Now</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
    },
    title: {
        ...theme.typography.h2,
        color: theme.colors.text.primary,
    },
    subtitle: {
        ...theme.typography.body,
        color: theme.colors.text.secondary,
        marginTop: 2,
    },
    cartButton: {
        padding: 8,
        position: 'relative',
    },
    cartIcon: {
        fontSize: 24,
    },
    cartBadge: {
        position: 'absolute',
        top: 4,
        right: 4,
        backgroundColor: theme.colors.error,
        width: 18,
        height: 18,
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartBadgeText: {
        color: theme.colors.surface,
        fontSize: 10,
        fontWeight: 'bold',
    },
    searchContainer: {
        flexDirection: 'row',
        padding: theme.spacing.lg,
    },
    searchInput: {
        flex: 1,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.lg,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        marginRight: theme.spacing.md,
        ...theme.shadows.sm,
        fontSize: 16,
    },
    searchButton: {
        backgroundColor: theme.colors.primary,
        width: 44,
        height: 44,
        borderRadius: theme.borderRadius.md,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchIcon: {
        fontSize: 18,
        color: theme.colors.surface,
    },
    categoriesContainer: {
        paddingHorizontal: theme.spacing.lg,
        marginBottom: theme.spacing.md,
    },
    categoryChip: {
        backgroundColor: theme.colors.surface,
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.sm,
        borderRadius: 20,
        marginRight: theme.spacing.sm,
        ...theme.shadows.sm,
    },
    categoryText: {
        ...theme.typography.caption,
        fontWeight: '500',
        color: theme.colors.text.primary,
    },
    servicesList: {
        flex: 1,
        padding: theme.spacing.lg,
    },
    serviceCard: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.lg,
        marginBottom: theme.spacing.md,
        ...theme.shadows.md,
    },
    serviceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: theme.spacing.sm,
    },
    serviceTitle: {
        ...theme.typography.h3,
        color: theme.colors.text.primary,
    },
    serviceCategory: {
        ...theme.typography.caption,
        color: theme.colors.primary,
        fontWeight: '500',
        marginTop: 2,
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingIcon: {
        fontSize: 14,
        marginRight: 4,
    },
    ratingText: {
        ...theme.typography.caption,
        fontWeight: '600',
        color: theme.colors.text.primary,
    },
    serviceDescription: {
        ...theme.typography.body,
        color: theme.colors.text.secondary,
        lineHeight: 20,
        marginBottom: theme.spacing.md,
    },
    serviceFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    serviceMeta: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    serviceDuration: {
        ...theme.typography.caption,
        color: theme.colors.text.secondary,
        marginRight: theme.spacing.lg,
    },
    servicePrice: {
        ...theme.typography.body,
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    bookButton: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.borderRadius.md,
    },
    bookButtonText: {
        ...theme.typography.caption,
        color: theme.colors.surface,
        fontWeight: '600',
    },
});

export default ServiceDashboard;