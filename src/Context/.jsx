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
