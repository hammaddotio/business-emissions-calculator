
import React, { useState } from 'react';
import { emissionFactors } from './data/emissionFactors'; // Ensure this includes CO2 factors in tonnes

const EmissionCalculator = () => {
    const [step, setStep] = useState(0);
    const [totalEmissions, setTotalEmissions] = useState(0);

    // State for inputs
    const [inputs, setInputs] = useState({
        electricity: '',
        oil: '',
        propane: '',
        vehicle: { mpg: '', miles: '' },
        air: '',
        rail: '',
        shipping: { shipments: '', weight: '', distance: '' },
        events: '',
    });

    const [currentStepEmissions, setCurrentStepEmissions] = useState(0); // To hold emissions for the current step

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('vehicle') || name.startsWith('shipping')) {
            const category = name.split('.')[0]; // 'vehicle' or 'shipping'
            setInputs((prev) => {
                const newInputs = {
                    ...prev,
                    [category]: { ...prev[category], [name.split('.')[1]]: value },
                };
                // Calculate emissions whenever input changes
                calculateStepEmissions(newInputs);
                return newInputs;
            });
        } else {
            setInputs((prev) => {
                const newInputs = { ...prev, [name]: value };
                // Calculate emissions whenever input changes
                calculateStepEmissions(newInputs);
                return newInputs;
            });
        }
    };

    // Calculate emissions for current step
    const calculateStepEmissions = (inputs) => {
        let emissions = 0;

        switch (step) {
            case 0:
                const electricityValue = parseFloat(inputs.electricity) || 0;
                emissions = electricityValue * emissionFactors.electricity / 1000; // Convert to tonnes
                break;
            case 1:
                if (inputs.fuelType === "Oil") {
                    const oilValue = parseFloat(inputs.oil) || 0;
                    emissions = oilValue * emissionFactors.oil / 1000; // Convert to tonnes
                } else if (inputs.fuelType === "Propane") {
                    const propaneValue = parseFloat(inputs.propane) || 0;
                    emissions = propaneValue * emissionFactors.propane / 1000; // Convert to tonnes
                }
                break;
            case 2:
                const miles = parseFloat(inputs.vehicle.miles) || 0;
                const mpg = parseFloat(inputs.vehicle.mpg) || 1; // Avoid division by zero
                emissions = (miles / mpg * emissionFactors.vehicle) / 1000; // Convert to tonnes
                break;
            case 3:
                const airValue = parseFloat(inputs.air) || 0;
                emissions = airValue * emissionFactors.air / 1000; // Convert to tonnes
                break;
            case 4:
                const railValue = parseFloat(inputs.rail) || 0;
                emissions = railValue * emissionFactors.rail / 1000; // Convert to tonnes
                break;
            case 5:
                const weight = parseFloat(inputs.shipping.weight) || 0;
                const shipments = parseFloat(inputs.shipping.shipments) || 0;
                emissions = (weight * shipments * emissionFactors.shipping) / 1000; // Convert to tonnes
                break;
            case 6:
                const eventsValue = parseFloat(inputs.events) || 0;
                emissions = eventsValue * emissionFactors.events / 1000; // Convert to tonnes
                break;
            default:
                break;
        }

        // Update the current step emissions and total emissions
        if (!isNaN(emissions)) {
            setCurrentStepEmissions(emissions);
            setTotalEmissions((prev) => prev - currentStepEmissions + emissions);
        } else {
            setCurrentStepEmissions(0);
        }
    };

    // Handle next step
    const nextStep = () => {
        if (step < 6) {
            calculateStepEmissions(inputs); // Calculate emissions on the last step
            setStep(step + 1);
        }
    };

    // Handle previous step
    const prevStep = () => {
        if (step > 0) {
            setStep(step - 1);
            calculateStepEmissions(inputs); // Recalculate emissions for the previous step
        }
    };

    // Render form steps based on the current step
    const renderStep = () => {
        switch (step) {
            case 0:
                return (
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-2">Electricity Usage (KWH)</h2>
                        <input
                            type="number"
                            name="electricity"
                            value={inputs.electricity}
                            onChange={handleChange}
                            placeholder="Enter KWH"
                            className="border border-gray-300 p-2 rounded w-full"
                        />
                        <p className="mt-2 text-green-700">Tonnes CO₂ for this step: {currentStepEmissions.toFixed(2)}</p>
                    </div>
                );
            case 1:
                return (
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-2">Fuel Type</h2>
                        <select name="fuelType" value={inputs.fuelType} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full mb-2">
                            <option value="">Select Fuel Type</option>
                            <option value="Natural Gas">Natural Gas (CCF)</option>
                            <option value="Oil">Oil (Gallons)</option>
                            <option value="Propane">Propane (Gallons)</option>
                        </select>
                        {inputs.fuelType === "Oil" && (
                            <input type="number" name="oil" value={inputs.oil} onChange={handleChange} placeholder="Enter Gallons" className="border border-gray-300 p-2 rounded w-full" />
                        )}
                        {inputs.fuelType === "Propane" && (
                            <input type="number" name="propane" value={inputs.propane} onChange={handleChange} placeholder="Enter Gallons" className="border border-gray-300 p-2 rounded w-full" />
                        )}
                        <p className="mt-2 text-green-700">Tonnes CO₂ for this step: {currentStepEmissions.toFixed(2)}</p>
                    </div>
                );
            case 2:
                return (
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-2">Vehicle Usage</h2>
                        <input type="number" name="vehicle.mpg" placeholder="Average MPG" value={inputs.vehicle.mpg} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full mb-2" />
                        <input type="number" name="vehicle.miles" placeholder="Total Miles Driven" value={inputs.vehicle.miles} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" />
                        <p className="mt-2 text-green-700">Tonnes CO₂ for this step: {currentStepEmissions.toFixed(2)}</p>
                    </div>
                );
            case 3:
                return (
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-2">Air Travel</h2>
                        <input
                            type="number"
                            name="air"
                            value={inputs.air}
                            onChange={handleChange}
                            placeholder="Total Miles"
                            className="border border-gray-300 p-2 rounded w-full"
                        />
                        <p className="mt-2 text-green-700">Tonnes CO₂ for this step: {currentStepEmissions.toFixed(2)}</p>
                    </div>
                );
            case 4:
                return (
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-2">Rail Travel</h2>
                        <input
                            type="number"
                            name="rail"
                            value={inputs.rail}
                            onChange={handleChange}
                            placeholder="Total Miles"
                            className="border border-gray-300 p-2 rounded w-full"
                        />
                        <p className="mt-2 text-green-700">Tonnes CO₂ for this step: {currentStepEmissions.toFixed(2)}</p>
                    </div>
                );
            case 5:
                return (
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-2">Shipping Usage</h2>
                        <input
                            type="number"
                            name="shipping.shipments"
                            value={inputs.shipping.shipments}
                            onChange={handleChange}
                            placeholder="Number of Shipments"
                            className="border border-gray-300 p-2 rounded w-full mb-2"
                        />
                        <input
                            type="number"
                            name="shipping.weight"
                            value={inputs.shipping.weight}
                            onChange={handleChange}
                            placeholder="Weight per Shipment (kg)"
                            className="border border-gray-300 p-2 rounded w-full mb-2"
                        />
                        <input
                            type="number"
                            name="shipping.distance"
                            value={inputs.shipping.distance}
                            onChange={handleChange}
                            placeholder="Distance (km)"
                            className="border border-gray-300 p-2 rounded w-full"
                        />
                        <p className="mt-2 text-green-700">Tonnes CO₂ for this step: {currentStepEmissions.toFixed(2)}</p>
                    </div>
                );
            case 6:
                return (
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-2">Event Emissions</h2>
                        <input
                            type="number"
                            name="events"
                            value={inputs.events}
                            onChange={handleChange}
                            placeholder="Number of Attendees"
                            className="border border-gray-300 p-2 rounded w-full"
                        />
                        <p className="mt-2 text-green-700">Tonnes CO₂ for this step: {currentStepEmissions.toFixed(2)}</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Business Emission Calculator</h1>
            {renderStep()}
            <div className="flex justify-between mt-4">
                <button onClick={prevStep} disabled={step === 0} className="bg-gray-500 text-white px-4 py-2 rounded" >
                    Previous
                </button>
                <button onClick={nextStep} disabled={step === 6} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Next
                </button>
            </div>
            <h2 className="mt-4 text-xl font-semibold">Total CO₂ Emissions: {totalEmissions.toFixed(2)} tonnes</h2>
        </div>
    );
};

export default EmissionCalculator;
