import React, { useState, useEffect } from 'react';
import { emissionFactors } from './data/emissionFactors';
import { costFactors } from './data/costFactors'; // Import the cost factors

// Define vehicle and shipping options
const vehicleTypes = [
    { type: 'Natural Gas', calType: 'CCF' },
    { type: 'Oil', calType: 'Gallons' },
    { type: 'Propane', calType: 'Gallons' }
];

const shippingTypes = [
    'Air',
    'Truck/Ground',
    'Ocean/Water',
    'Rail'
];

// Steps for the form
const steps = [
    { label: "ELECTRIC", fields: ["electricity"] },
    { label: "HEAT", fields: ["heat"] },
    { label: "VEHICLE", fields: ["vehicleType", "avgMPG", "totalMiles"] },
    { label: "AIR", fields: ["air"] },
    { label: "RAIL", fields: ["rail"] },
    { label: "SHIPPING", fields: ["shippingType", "avgShipmentWeight", "shipmentDistance"] },
    { label: "EVENTS", fields: [] }, // No input fields, only description
    { label: "TOTAL", fields: [] } // Summary of all steps
];

const EmissionForm = () => {
    const [step, setStep] = useState(0);
    const [total, setTotal] = useState(0);
    const [inputs, setInputs] = useState({
        electricity: '',
        heat: '',
        vehicleType: '',
        avgMPG: '',
        totalMiles: '',
        air: '',
        rail: '',
        shippingType: '',
        avgShipmentWeight: '',
        shipmentDistance: ''
    });
    const [stepCosts, setStepCosts] = useState(Array(steps.length).fill(0));

    // Calculate the cost for the current step
    const calculateStepCost = () => {
        let stepCost = 0;
        steps[step].fields.forEach(field => {
            const value = parseFloat(inputs[field]) || 0;

            if (field === 'vehicleType' && inputs.vehicleType) {
                const calcFunc = costFactors.vehicle[inputs.vehicleType];
                if (calcFunc && inputs.avgMPG && inputs.totalMiles) {
                    const avgMPG = parseFloat(inputs.avgMPG) || 0;
                    const totalMiles = parseFloat(inputs.totalMiles) || 0;
                    stepCost += calcFunc(avgMPG, totalMiles) || 0;
                }
            } else if (field === 'shippingType' && inputs.shippingType) {
                const calcFunc = costFactors.shipping[inputs.shippingType];
                if (calcFunc && inputs.avgShipmentWeight && inputs.shipmentDistance) {
                    const avgShipmentWeight = parseFloat(inputs.avgShipmentWeight) || 0;
                    const shipmentDistance = parseFloat(inputs.shipmentDistance) || 0;
                    stepCost += calcFunc(avgShipmentWeight, shipmentDistance) || 0;
                }
            } else if (typeof costFactors[field] === 'number') {
                stepCost += value * costFactors[field];
            }
        });

        return stepCost;
    };

    // Update cost when inputs or step change
    useEffect(() => {
        const currentStepCost = calculateStepCost();
        setStepCosts(prevCosts => {
            const updatedCosts = [...prevCosts];
            updatedCosts[step] = currentStepCost;
            return updatedCosts;
        });
    }, [inputs, step]);

    // Update total cost when step costs change
    useEffect(() => {
        setTotal(stepCosts.reduce((acc, cost) => acc + cost, 0));
    }, [stepCosts]);

    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const nextStep = () => {
        if (step < steps.length - 1) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 0) setStep(step - 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Total Cost: $${total.toFixed(2)}`);
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Business Emission Calculator</h1>
                <span className="text-sm text-gray-500">{steps[step].label}</span>
            </div>

            {/* Total Cost Display */}
            {step === 7 && ( // Display total report on the "TOTAL" step
                <div className="mb-4 p-4 border border-green-500 bg-green-100 rounded text-green-700">
                    <h2 className="font-bold">Total Report</h2>
                    {steps.slice(0, -1).map((stepInfo, index) => (
                        <p key={index}>
                            {stepInfo.label}: ${(stepCosts[index] || 0).toFixed(2)}
                        </p>
                    ))}
                    <hr className="my-2" />
                    <strong>Grand Total: ${total.toFixed(2)}</strong>
                </div>
            )}

            {/* Step Indicator */}
            <div className="flex items-center mb-6">
                {steps.map((_, index) => (
                    <div
                        key={index}
                        className={`w-2/12 h-2 rounded-full mx-1 ${index <= step ? 'bg-blue-500' : 'bg-gray-300'
                            }`}
                    ></div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Form Fields for Current Step */}
                {step === 0 && (
                    <div>
                        <label>Electricity Usage (kWh): </label>
                        <input
                            type="number"
                            name="electricity"
                            value={inputs.electricity}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded"
                        />
                        <p className="text-green-500">Cost: ${(inputs.electricity * costFactors.electricity || 0).toFixed(2)}</p>
                    </div>
                )}

                {step === 1 && (
                    <div>
                        <label>Heat Usage (kWh): </label>
                        <input
                            type="number"
                            name="heat"
                            value={inputs.heat}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded"
                        />
                        <p className="text-green-500">Cost: ${(inputs.heat * costFactors.heat || 0).toFixed(2)}</p>
                    </div>
                )}

                {step === 2 && (
                    <>
                        {/* Vehicle Section */}
                        <div>
                            <label>Vehicle Type: </label>
                            <select
                                name="vehicleType"
                                value={inputs.vehicleType}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-2 rounded"
                            >
                                <option value="">Select Type</option>
                                {vehicleTypes.map((vehicle) => (
                                    <option key={vehicle.type} value={vehicle.type}>
                                        {vehicle.type} ({vehicle.calType})
                                    </option>
                                ))}
                            </select>
                        </div>
                        {inputs.vehicleType && (
                            <>
                                <div>
                                    <label>Average MPG: </label>
                                    <input
                                        type="number"
                                        name="avgMPG"
                                        value={inputs.avgMPG}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 p-2 rounded"
                                    />
                                </div>
                                <div>
                                    <label>Total Miles Driven per Year: </label>
                                    <input
                                        type="number"
                                        name="totalMiles"
                                        value={inputs.totalMiles}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 p-2 rounded"
                                    />
                                </div>
                                <p className="text-green-500">Cost: {(inputs.avgMPG && inputs.totalMiles ? costFactors.vehicle[inputs.vehicleType](parseFloat(inputs.avgMPG), parseFloat(inputs.totalMiles)) || 0 : 0).toFixed(2)}</p>
                            </>
                        )}
                    </>
                )}

                {step === 3 && (
                    <div>
                        <label>Air Travel (passenger-km): </label>
                        <input
                            type="number"
                            name="air"
                            value={inputs.air}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded"
                        />
                        <p className="text-green-500">Cost: ${(inputs.air * costFactors.air || 0).toFixed(2)}</p>
                    </div>
                )}

                {step === 4 && (
                    <div>
                        <label>Rail Travel (passenger-km): </label>
                        <input
                            type="number"
                            name="rail"
                            value={inputs.rail}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded"
                        />
                        <p className="text-green-500">Cost: ${(inputs.rail * costFactors.rail || 0).toFixed(2)}</p>
                    </div>
                )}

                {step === 5 && (
                    <>
                        {/* Shipping Section */}
                        <div>
                            <label>Shipping Type: </label>
                            <select
                                name="shippingType"
                                value={inputs.shippingType}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-2 rounded"
                            >
                                <option value="">Select Shipping Type</option>
                                {shippingTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {inputs.shippingType && (
                            <>
                                <div>
                                    <label>Average Shipment Weight (tons): </label>
                                    <input
                                        type="number"
                                        name="avgShipmentWeight"
                                        value={inputs.avgShipmentWeight}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 p-2 rounded"
                                    />
                                </div>
                                <div>
                                    <label>Shipment Distance (km): </label>
                                    <input
                                        type="number"
                                        name="shipmentDistance"
                                        value={inputs.shipmentDistance}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 p-2 rounded"
                                    />
                                </div>
                                <p className="text-green-500">Cost: {(inputs.avgShipmentWeight && inputs.shipmentDistance ? costFactors.shipping[inputs.shippingType](parseFloat(inputs.avgShipmentWeight), parseFloat(inputs.shipmentDistance)) || 0 : 0).toFixed(2)}</p>
                            </>
                        )}
                    </>
                )}

                {step === 6 && (
                    <div className="text-gray-700 text-center">
                        <p>Events step is for informational purposes only.</p>
                        <p>No calculations are required for this step.</p>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-4">
                    <button
                        type="button"
                        onClick={prevStep}
                        disabled={step === 0}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:bg-gray-100"
                    >
                        Previous
                    </button>
                    {step < steps.length - 1 ? (
                        <button
                            type="button"
                            onClick={nextStep}
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            Next
                        </button>
                    ) : (
                        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
                            Submit
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default EmissionForm;
