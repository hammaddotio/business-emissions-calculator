// import { createContext, useContext, useState } from "react"

// const CalculatorContext = createContext({})

// import React from 'react'

// const CalculatorContextProvider = ({ children }) => {

//     const [activeTab, setActiveTab] = useState("ELECTRIC");
//     const [electricityUsage, setElectricityUsage] = useState(0);
//     const [heatUsage, setHeatUsage] = useState(0);
//     const [vehicleUsage, setVehicleUsage] = useState(0);
//     const [airUsage, setAirUsage] = useState(0);
//     const [railUsage, setRailUsage] = useState(0);
//     const [shippingUsage, setShippingUsage] = useState(0);
//     const [eventsUsage, setEventsUsage] = useState(0);
//     const [emissionTotals, setEmissionTotals] = useState(0);

//     const [selectedMethod, setSelectedMethod] = useState(''); // Default to the first shipping method
//     const [averageMPG, setAverageMPG] = useState('');
//     const [shipmentWeight, setShipmentWeight] = useState('');
//     const [shipmentDistance, setShipmentDistance] = useState('');


//     const tabs = [
//         "ELECTRIC",
//         "HEAT",
//         "VEHICLE",
//         "AIR",
//         "RAIL",
//         "SHIPPING",
//         "EVENTS",
//         "TOTAL"
//     ];

//     const handleTabChange = (tab) => {
//         setActiveTab(tab);
//     };

//     const handleElectricityUsageChange = (e) => {
//         const newUsage = parseFloat(e.target.value);
//         setElectricityUsage(newUsage);
//         setEmissionTotals(newUsage * 0.0001); // Assuming 0.01 kg CO2 per kWh
//     };

//     const handleHeatUsageChange = (e) => {
//         const newUsage = parseFloat(e.target.value);
//         setHeatUsage(newUsage);
//         setEmissionTotals(newUsage * 0.0002); // Example emission factor for heat
//     };

//     const handleVehicleUsageChange = (e) => {
//         const newUsage = parseFloat(e.target.value);
//         setVehicleUsage(newUsage);
//         setEmissionTotals(newUsage * 0.0005); // Example emission factor for vehicle
//     };

//     const handleAirUsageChange = (e) => {
//         const newUsage = parseFloat(e.target.value);
//         setAirUsage(newUsage);
//         setEmissionTotals(newUsage * 0.002); // Example emission factor for air
//     };

//     const handleRailUsageChange = (e) => {
//         const newUsage = parseFloat(e.target.value);
//         setRailUsage(newUsage);
//         setEmissionTotals(newUsage * 0.001); // Example emission factor for rail
//     };

//     const handleShippingUsageChange = (e) => {
//         const newUsage = parseFloat(e.target.value);
//         setShippingUsage(newUsage);
//         setEmissionTotals(newUsage * 0.0015); // Example emission factor for shipping
//     };

//     const handleEventsUsageChange = (e) => {
//         const newUsage = parseFloat(e.target.value);
//         setEventsUsage(newUsage);
//         setEmissionTotals(newUsage * 0.003); // Example emission factor for events
//     };

//     const handleNextTab = () => {
//         const currentIndex = tabs.indexOf(activeTab);
//         const nextIndex = (currentIndex + 1) % tabs.length;
//         setActiveTab(tabs[nextIndex]);
//     };

//     const handlePreviousTab = () => {
//         const currentIndex = tabs.indexOf(activeTab);
//         const previousIndex = (currentIndex - 1 + tabs.length) % tabs.length;
//         setActiveTab(tabs[previousIndex]);
//     };
//     const obj = {
//         // status
//         activeTab,
//         setActiveTab,
//         electricityUsage,
//         setElectricityUsage,
//         heatUsage,
//         setHeatUsage,
//         vehicleUsage,
//         setVehicleUsage,
//         airUsage,
//         setAirUsage,
//         railUsage,
//         setRailUsage,
//         shippingUsage,
//         setShippingUsage,
//         eventsUsage,
//         setEventsUsage,
//         emissionTotals,
//         setEmissionTotals,
//         selectedMethod,
//         averageMPG,
//         shipmentWeight,
//         shipmentDistance,
//         setSelectedMethod,
//         setAverageMPG,
//         setShipmentWeight,
//         setShipmentDistance,
//         // functions
//         handleTabChange,
//         handleElectricityUsageChange,
//         handleHeatUsageChange,
//         handleVehicleUsageChange,
//         handleAirUsageChange,
//         handleRailUsageChange,
//         handleShippingUsageChange,
//         handleEventsUsageChange,
//         // buttons next,previous
//         handleNextTab,
//         handlePreviousTab,
//         //
//         tabs
//     }
//     return (
//         <CalculatorContext.Provider value={obj}>
//             {children}
//         </CalculatorContext.Provider >
//     )
// }

// export default CalculatorContextProvider
// export const useCalculator = () => useContext(CalculatorContext)










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

    // Function to calculate total costs based on emissions
    // const calculateEmissionTotals = (emissions) => {
    //     // Example: Assume each tonne of CO2 has a cost of $50
    //     const costPerTonne = 50;
    //     return emissions * costPerTonne;
    // };


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
        } = formData;

        // Example: Total CO2 emissions based on individual usage
        return (
            electricityUsage * 0.0001 +
            heatUsage * 0.0001 +
            vehicleUsage * 0.0002 +
            airUsage * 0.0003 +
            railUsage * 0.0001 +
            shippingUsage * 0.0004 +
            eventsUsage * 0.0002
        );
    };

    // Calculate Estimated Costs (Example Formula, replace with actual)
    const calculateEstimatedCost = () => {
        const { electricityUsage, costPerKwh, vehicleUsage, costPerGallon, averageMPG } = formData;

        // Example: Estimated cost based on usage
        const electricityCost = electricityUsage * costPerKwh;
        const vehicleCost = vehicleUsage * costPerGallon;

        // Returning sum of all costs
        return electricityCost + vehicleCost;
    };

    // Update emissions and costs whenever formData changes
    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            emissionTotals: calculateEmissionTotals(),
            estimatedCost: calculateEstimatedCost(),
        }));
    }, [formData.electricityUsage, formData.heatUsage, formData.vehicleUsage]);

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
    };

    return (
        <CalculatorContext.Provider value={contextValue}>
            {children}
        </CalculatorContext.Provider>
    );
};

export default CalculatorContextProvider;
export const useCalculator = () => useContext(CalculatorContext);
