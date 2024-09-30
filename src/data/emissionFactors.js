// export const emissionFactors = {
//     electricity: 0.233, // kg CO2 per kWh
//     heat: 2.1, // kg CO2 per kWh (example)
//     vehicle: 2.3, // kg CO2 per liter of petrol/diesel
//     air: 0.255, // kg CO2 per passenger-kilometer
//     rail: 0.041, // kg CO2 per passenger-kilometer
//     shipping: 0.016, // kg CO2 per ton-kilometer
//     events: 50, // kg CO2 per event (example value)
//     shipmentWeight: 0.02, // kg CO2 per kg of shipment
//     shipmentDistance: 0.012, // kg CO2 per km of shipment
//     // Adjust these factors as per your data source
// };

// data/emissionFactors.js
export const emissionFactors = {
    vehicle: {
        'Natural Gas': (avgMPG, totalMiles) => avgMPG * totalMiles * 0.054,
        'Oil': (avgMPG, totalMiles) => avgMPG * totalMiles * 0.024,
        'Propane': (avgMPG, totalMiles) => avgMPG * totalMiles * 0.063
    },
    shipping: {
        'Air': (weight, distance) => weight * distance * 1.9,
        'Truck/Ground': (weight, distance) => weight * distance * 0.82,
        'Ocean/Water': (weight, distance) => weight * distance * 0.03,
        'Rail': (weight, distance) => weight * distance * 0.045
    }
};
