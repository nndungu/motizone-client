import React from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Image,
    SafeAreaView,
} from 'react-native';
import { theme } from '../../theme';

const CustomerDashboard = ({ navigation }) => {
    const quickActions = [
        {
            id: 1,
            title: 'Rent a Car',
            subtitle: 'Find your perfect ride',
            icon: '🚗',
            color: '#3b82f6',
            screen: 'VehicleList',
        },
        {
            id: 2,
            title: 'Book Service',
            subtitle: 'Maintenance & repairs',
            icon: '🔧',
            color: '#f59e0b',
            screen: 'Services',
        },
        {
            id: 3,
            title: 'Buy Parts',
            subtitle: 'Genuine auto parts',
            icon: '⚙️',
            color: '#10b981',
            screen: 'Parts',
        },
        {
            id: 4,
            title: 'My Orders',
            subtitle: 'Track your bookings',
            icon: '📦',
            color: '#8b5cf6',
            screen: 'Orders',
        },
    ];

    const featuredVehicles = [
        {
            id: 1,
            name: 'Toyota RAV4',
            type: 'SUV',
            price: '$65/day',
            image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=300',
            rating: 4.8,
        },
        {
            id: 2,
            name: 'BMW 3 Series',
            type: 'Sedan',
            price: '$85/day',
            image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=300',
            rating: 4.9,
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Good morning, John! 👋</Text>
                    <Text style={styles.subtitle}>Ready to drive today?</Text>
                </View>
                <TouchableOpacity style={styles.profileButton}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>JD</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Quick Actions Grid */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <View style={styles.actionsGrid}>
                        {quickActions.map((action) => (
                            <TouchableOpacity
                                key={action.id}
                                style={styles.actionCard}
                                onPress={() => navigation.navigate(action.screen)}
                            >
                                <View style={[styles.iconContainer, { backgroundColor: action.color }]}>
                                    <Text style={styles.icon}>{action.icon}</Text>
                                </View>
                                <Text style={styles.actionTitle}>{action.title}</Text>
                                <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Featured Vehicles */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Featured Vehicles</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAllText}>See all</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {featuredVehicles.map((vehicle) => (
                            <TouchableOpacity
                                key={vehicle.id}
                                style={styles.vehicleCard}
                                onPress={() => navigation.navigate('VehicleDetails', { vehicleId: vehicle.id })}
                            >
                                <Image source={{ uri: vehicle.image }} style={styles.vehicleImage} />
                                <View style={styles.vehicleInfo}>
                                    <View>
                                        <Text style={styles.vehicleName}>{vehicle.name}</Text>
                                        <Text style={styles.vehicleType}>{vehicle.type}</Text>
                                    </View>
                                    <View style={styles.vehicleFooter}>
                                        <Text style={styles.vehiclePrice}>{vehicle.price}</Text>
                                        <View style={styles.rating}>
                                            <Text style={styles.ratingIcon}>⭐</Text>
                                            <Text style={styles.ratingText}>{vehicle.rating}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Recent Activity */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Recent Activity</Text>
                    <View style={styles.activityCard}>
                        <View style={styles.activityIcon}>
                            <Text>🚗</Text>
                        </View>
                        <View style={styles.activityContent}>
                            <Text style={styles.activityTitle}>Toyota Camry Rental</Text>
                            <Text style={styles.activitySubtitle}>Dec 15 - Dec 18, 2024</Text>
                            <Text style={styles.activityStatus}>Active</Text>
                        </View>
                        <Text style={styles.activityPrice}>$210</Text>
                    </View>
                </View>
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
    greeting: {
        ...theme.typography.h2,
        color: theme.colors.text.primary,
    },
    subtitle: {
        ...theme.typography.body,
        color: theme.colors.text.secondary,
        marginTop: 2,
    },
    profileButton: {
        padding: 8,
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: theme.colors.surface,
        fontWeight: '600',
    },
    section: {
        padding: theme.spacing.lg,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
    },
    sectionTitle: {
        ...theme.typography.h3,
        color: theme.colors.text.primary,
    },
    seeAllText: {
        ...theme.typography.caption,
        color: theme.colors.primary,
        fontWeight: '600',
    },
    actionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    actionCard: {
        width: '48%',
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        marginBottom: theme.spacing.md,
        ...theme.shadows.sm,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    icon: {
        fontSize: 20,
    },
    actionTitle: {
        ...theme.typography.body,
        fontWeight: '600',
        color: theme.colors.text.primary,
        marginBottom: 2,
    },
    actionSubtitle: {
        ...theme.typography.caption,
        color: theme.colors.text.secondary,
    },
    vehicleCard: {
        width: 280,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.lg,
        marginRight: theme.spacing.md,
        ...theme.shadows.md,
    },
    vehicleImage: {
        width: '100%',
        height: 160,
        borderTopLeftRadius: theme.borderRadius.lg,
        borderTopRightRadius: theme.borderRadius.lg,
    },
    vehicleInfo: {
        padding: theme.spacing.md,
    },
    vehicleName: {
        ...theme.typography.body,
        fontWeight: '600',
        color: theme.colors.text.primary,
    },
    vehicleType: {
        ...theme.typography.caption,
        color: theme.colors.text.secondary,
        marginTop: 2,
    },
    vehicleFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: theme.spacing.sm,
    },
    vehiclePrice: {
        ...theme.typography.body,
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingIcon: {
        fontSize: 12,
        marginRight: 4,
    },
    ratingText: {
        ...theme.typography.small,
        color: theme.colors.text.secondary,
    },
    activityCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        ...theme.shadows.sm,
    },
    activityIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing.md,
    },
    activityContent: {
        flex: 1,
    },
    activityTitle: {
        ...theme.typography.body,
        fontWeight: '600',
        color: theme.colors.text.primary,
    },
    activitySubtitle: {
        ...theme.typography.caption,
        color: theme.colors.text.secondary,
        marginTop: 2,
    },
    activityStatus: {
        ...theme.typography.small,
        color: theme.colors.success,
        marginTop: 4,
    },
    activityPrice: {
        ...theme.typography.body,
        fontWeight: 'bold',
        color: theme.colors.text.primary,
    },
});

export default CustomerDashboard;