import React, { useState } from 'react';
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

const steps = [
    { label: "Step 1", fields: ["electricity", "heat"] },
    { label: "Step 2", fields: ["vehicle", "air", "rail"] },
    { label: "Step 3", fields: ["shipping", "events"] },
    { label: "Step 4", fields: ["shipmentWeight", "shipmentDistance"] }
];

const EmissionForm = () => {
    const [step, setStep] = useState(0);
    const [total, setTotal] = useState(0);
    const [inputs, setInputs] = useState({
        electricity: '',
        heat: '',
        vehicle: '',
        air: '',
        rail: '',
        shipping: '',
        events: '',
        shipmentWeight: '',
        shipmentDistance: '',
        vehicleType: '',
        avgMPG: '',
        totalMiles: '',
        shippingType: '',
        avgShipmentWeight: '',
        shipmentDistance: ''
    });

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
        let totalCost = 0;

        Object.keys(inputs).forEach((key) => {
            const value = parseFloat(inputs[key]) || 0;

            // Vehicle-specific cost calculation
            if (key === 'vehicle' && inputs.vehicleType) {
                const calcFunc = costFactors.vehicle[inputs.vehicleType];
                if (calcFunc && inputs.avgMPG && inputs.totalMiles) {
                    const avgMPG = parseFloat(inputs.avgMPG) || 0;
                    const totalMiles = parseFloat(inputs.totalMiles) || 0;
                    totalCost += calcFunc(avgMPG, totalMiles) || 0;
                }
            }

            // Shipping-specific cost calculation
            if (key === 'shipping' && inputs.shippingType) {
                const calcFunc = costFactors.shipping[inputs.shippingType];
                if (calcFunc && inputs.avgShipmentWeight && inputs.shipmentDistance) {
                    const avgShipmentWeight = parseFloat(inputs.avgShipmentWeight) || 0;
                    const shipmentDistance = parseFloat(inputs.shipmentDistance) || 0;
                    totalCost += calcFunc(avgShipmentWeight, shipmentDistance) || 0;
                }
            }

            // General cost calculation
            if (typeof costFactors[key] === 'number') {
                totalCost += value * costFactors[key];
            }
        });

        setTotal(totalCost); // Set the total cost
    };



    return (
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Business Emission Calculator</h1>
                <span className="text-sm text-gray-500">{steps[step].label}</span>
            </div>

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
                    <>
                        <div>
                            <label>Electricity Usage (kWh): </label>
                            <input
                                type="number"
                                name="electricity"
                                value={inputs.electricity}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-2 rounded"
                            />
                        </div>
                        <div>
                            <label>Heat Usage (kWh): </label>
                            <input
                                type="number"
                                name="heat"
                                value={inputs.heat}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-2 rounded"
                            />
                        </div>
                    </>
                )}

                {step === 1 && (
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
                            </>
                        )}
                        <div>
                            <label>Air Travel (passenger-km): </label>
                            <input
                                type="number"
                                name="air"
                                value={inputs.air}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-2 rounded"
                            />
                        </div>
                        <div>
                            <label>Rail Travel (passenger-km): </label>
                            <input
                                type="number"
                                name="rail"
                                value={inputs.rail}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-2 rounded"
                            />
                        </div>
                    </>
                )}

                {step === 2 && (
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
                                <option value="">Select Type</option>
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
                                    <label>Average Shipment Weight (lbs): </label>
                                    <input
                                        type="number"
                                        name="avgShipmentWeight"
                                        value={inputs.avgShipmentWeight}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 p-2 rounded"
                                    />
                                </div>
                                <div>
                                    <label>Average Shipment Distance (miles): </label>
                                    <input
                                        type="number"
                                        name="shipmentDistance"
                                        value={inputs.shipmentDistance}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 p-2 rounded"
                                    />
                                </div>
                            </>
                        )}
                        <div>
                            <label>Events Organized (count): </label>
                            <input
                                type="number"
                                name="events"
                                value={inputs.events}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-2 rounded"
                            />
                        </div>
                    </>
                )}

                {step === 3 && (
                    <>
                        <div>
                            <label>Shipment Weight (kg): </label>
                            <input
                                type="number"
                                name="shipmentWeight"
                                value={inputs.shipmentWeight}
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
                    </>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                    <button
                        type="button"
                        onClick={prevStep}
                        disabled={step === 0}
                        className={`px-4 py-2 rounded ${step === 0 ? 'bg-gray-300' : 'bg-blue-500 text-white'
                            }`}
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
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-500 text-white rounded"
                        >
                            Calculate
                        </button>
                    )}
                </div>

                {/* Display total emissions */}
                {total && (
                    <div className="mt-6 p-4 border border-green-500 bg-green-100 rounded text-green-700">
                        Total Cost: ${total.toFixed(2)}
                    </div>
                )}

            </form>
        </div>
    );
};

export default EmissionForm;
