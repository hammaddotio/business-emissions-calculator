// costFactors.js
export const costFactors = {
    electricity: 0.12, // cost per kWh in dollars
    heat: 0.08, // cost per kWh in dollars
    vehicle: {
        'Natural Gas': (avgMPG, totalMiles) => totalMiles / avgMPG * 2.5, // Example cost formula
        'Oil': (avgMPG, totalMiles) => totalMiles / avgMPG * 3.0, // Example cost formula
        'Propane': (avgMPG, totalMiles) => totalMiles / avgMPG * 2.8 // Example cost formula
    },
    air: 0.15, // cost per passenger-km in dollars
    rail: 0.10, // cost per passenger-km in dollars
    shipping: {
        'Air': (weight, distance) => weight * distance * 0.05, // Example cost formula
        'Truck/Ground': (weight, distance) => weight * distance * 0.03, // Example cost formula
        'Ocean/Water': (weight, distance) => weight * distance * 0.02, // Example cost formula
        'Rail': (weight, distance) => weight * distance * 0.01 // Example cost formula
    },
    events: 100, // fixed cost per event in dollars
    shipmentWeight: 0, // not directly used, combined with shipmentDistance
    shipmentDistance: 0 // not directly used, combined with shipmentWeight
};
