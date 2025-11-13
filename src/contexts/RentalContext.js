import React, { createContext, useState, useContext } from 'react';

const RentalContext = createContext();

export const useRental = () => {
    const context = useContext(RentalContext);
    if (!context) {
        throw new Error('useRental must be used within a RentalProvider');
    }
    return context;
};

export const RentalProvider = ({ children }) => {
    const [rentalData, setRentalData] = useState({
        vehicle: null,
        startDate: null,
        endDate: null,
        pickupLocation: null,
        dropoffLocation: null,
        totalPrice: 0,
    });

    const setRentalVehicle = (vehicle) => {
        setRentalData(prev => ({ ...prev, vehicle }));
    };

    const setRentalDates = (startDate, endDate) => {
        setRentalData(prev => ({ ...prev, startDate, endDate }));
    };

    const setRentalLocations = (pickupLocation, dropoffLocation) => {
        setRentalData(prev => ({ ...prev, pickupLocation, dropoffLocation }));
    };

    const calculateTotalPrice = () => {
        if (!rentalData.vehicle || !rentalData.startDate || !rentalData.endDate) {
            return 0;
        }

        const days = Math.ceil(
            (new Date(rentalData.endDate) - new Date(rentalData.startDate)) / (1000 * 60 * 60 * 24)
        );

        const total = days * rentalData.vehicle.dailyRate;
        setRentalData(prev => ({ ...prev, totalPrice: total }));
        return total;
    };

    const clearRentalData = () => {
        setRentalData({
            vehicle: null,
            startDate: null,
            endDate: null,
            pickupLocation: null,
            dropoffLocation: null,
            totalPrice: 0,
        });
    };

    const value = {
        rentalData,
        setRentalVehicle,
        setRentalDates,
        setRentalLocations,
        calculateTotalPrice,
        clearRentalData,
    };

    return (
        <RentalContext.Provider value={value}>
            {children}
        </RentalContext.Provider>
    );
};