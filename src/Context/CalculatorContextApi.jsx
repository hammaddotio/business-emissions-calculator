import { createContext, useContext, useState, useEffect } from "react";
import React from "react";

// Define the tabs for easy navigation
const tabs = [
    "ELECTRIC",
    "HEAT",
    "VEHICLE",
    "AIR",
    "RAIL",
    "SHIPPING",
    "EVENTS",
];

// Create Context
const CalculatorContext = createContext({});

// Emission factors for different shipping methods
const emissionFactors = {
    "Diesel": 0.001, // Example value for Diesel fuel
    "Petrol": 0.0009, // Example value for Petrol
    "Electric": 0.0005, // Example value for Electric vehicles
    "Hybrid": 0.0007, // Example value for Hybrid vehicles
    // Add more options as needed
};

// Context Provider Component
const CalculatorContextProvider = ({ children }) => {
    // State to manage form data dynamically
    const [formData, setFormData] = useState({
        activeTab: "ELECTRIC",
        electricityUsage: 0,
        heatUsage: 0,
        vehicleUsage: 0,
        airUsage: 0,
        railUsage: 0,
        shippingUsage: 0,
        eventsUsage: 0,
        emissionTotals: 0,
        selectedMethod: "", // Default to the first shipping method
        averageMPG: 0,
        shipmentWeight: 0,
        shipmentDistance: 0,
        costPerKwh: 0.12, // Example cost per KWH
        costPerGallon: 3.5, // Example cost per gallon
    });

    // Calculate Emission Totals (Example Formula, replace with actual)
    const calculateEmissionTotals = () => {
        const {
            electricityUsage,
            heatUsage,
            vehicleUsage,
            airUsage,
            railUsage,
            shippingUsage,
            eventsUsage,
            selectedMethod,
            shipmentWeight,
            shipmentDistance,
        } = formData;

        // Example: Total CO2 emissions based on individual usage
        const shippingEmissions =
            shipmentWeight * shipmentDistance * (emissionFactors[selectedMethod] || 0);

        return (
            electricityUsage * 0.0001 +
            heatUsage * 0.0001 +
            vehicleUsage * 0.0002 +
            airUsage * 0.0003 +
            railUsage * 0.0001 +
            shippingEmissions + // Use calculated shipping emissions
            eventsUsage * 0.0002
        );
    };

    const calculateTotalCost = () => {
        const { electricityUsage,
            heatUsage,
            vehicleUsage,
            airUsage,
            railUsage,
            shippingUsage,
            eventsUsage, } = formData;
        return electricityUsage + heatUsage + vehicleUsage + airUsage + railUsage + shippingUsage + eventsUsage;
    };

    useEffect(() => {
        const emissionTotals = calculateEmissionTotals();
        const totalCost = calculateTotalCost();

        setFormData((prev) => ({
            ...prev,
            emissionTotals,
            estimatedCost: totalCost, // Update with the calculated total cost
        }));
    }, [
        formData.electricityUsage,
        formData.heatUsage,
        formData.vehicleUsage,
        formData.airUsage,
        formData.railUsage,
        formData.shippingUsage,
        formData.eventsUsage,
        formData.selectedMethod,
        formData.shipmentWeight,
        formData.shipmentDistance,
    ]);

    // Handler to update form data dynamically
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: parseFloat(value) || value, // Parse numbers, keep strings as is
        }));
    };

    // Handlers for tab navigation
    const handleTabChange = (tab) => {
        setFormData((prev) => ({ ...prev, activeTab: tab }));
    };

    const handleNextTab = () => {
        const currentIndex = tabs.indexOf(formData.activeTab);
        const nextIndex = (currentIndex + 1) % tabs.length;
        setFormData((prev) => ({ ...prev, activeTab: tabs[nextIndex] }));
    };

    const handlePreviousTab = () => {
        const currentIndex = tabs.indexOf(formData.activeTab);
        const previousIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        setFormData((prev) => ({ ...prev, activeTab: tabs[previousIndex] }));
    };

    const contextValue = {
        // Form data and its state update
        formData,
        setFormData,
        // Handlers
        handleInputChange,
        handleTabChange,
        handleNextTab,
        handlePreviousTab,
        emissionFactors, // Include emission factors in context
    };

    return (
        <CalculatorContext.Provider value={contextValue}>
            {children}
        </CalculatorContext.Provider>
    );
};

export default CalculatorContextProvider;
export const useCalculator = () => useContext(CalculatorContext);
