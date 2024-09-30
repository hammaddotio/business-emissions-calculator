import React, { useState } from 'react';

// Replace with your actual emission factors
const emissionFactors = {
    electricity: 0.0005,
    oil: 0.0025,
    propane: 0.0015,
    vehicle: 0.002,
    air: 0.01,
    rail: 0.001,
    shipping: 0.005,
    events: 0.0002,
};

const EmissionCalculator = () => {
    const [step, setStep] = useState(0);
    const [totalEmissions, setTotalEmissions] = useState(0);
    const [stepEmissions, setStepEmissions] = useState(0);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('vehicle') || name.startsWith('shipping')) {
            const category = name.split('.')[0]; // 'vehicle' or 'shipping'
            setInputs((prev) => ({
                ...prev,
                [category]: { ...prev[category], [name.split('.')[1]]: value },
            }));
        } else {
            setInputs({ ...inputs, [name]: value });
        }
    };

    const calculateEmissions = () => {
        let currentEmissions = 0;

        switch (step) {
            case 0:
                const electricityValue = parseFloat(inputs.electricity) || 0;
                currentEmissions = (electricityValue * emissionFactors.electricity) / 1000;
                break;
            case 1:
                const oilValue = parseFloat(inputs.oil) || 0;
                currentEmissions = (oilValue * emissionFactors.oil) / 1000;
                break;
            case 2:
                const miles = parseFloat(inputs.vehicle.miles) || 0;
                const mpg = parseFloat(inputs.vehicle.mpg) || 1;
                currentEmissions = (miles / mpg * emissionFactors.vehicle) / 1000;
                break;
            case 3:
                const airValue = parseFloat(inputs.air) || 0;
                currentEmissions = (airValue * emissionFactors.air) / 1000;
                break;
            case 4:
                const railValue = parseFloat(inputs.rail) || 0;
                currentEmissions = (railValue * emissionFactors.rail) / 1000;
                break;
            case 5:
                const weight = parseFloat(inputs.shipping.weight) || 0;
                const shipments = parseFloat(inputs.shipping.shipments) || 0;
                currentEmissions = (weight * shipments * emissionFactors.shipping) / 1000;
                break;
            case 6:
                const eventsValue = parseFloat(inputs.events) || 0;
                currentEmissions = (eventsValue * emissionFactors.events) / 1000;
                break;
            default:
                break;
        }

        // Update step emissions and total emissions if current emissions is a valid number
        if (!isNaN(currentEmissions)) {
            setStepEmissions(currentEmissions);
            setTotalEmissions((prev) => prev + currentEmissions);
        }
    };

    const nextStep = () => {
        if (step < 6) {
            calculateEmissions();
            setStep(step + 1);
        }
    };

    const prevStep = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

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
                        <p className="mt-2 text-green-700">Tonnes CO₂: {stepEmissions.toFixed(4)}</p>
                    </div>
                );
            case 1:
                return (
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-2">Fuel Type</h2>
                        <select
                            name="fuelType"
                            value={inputs.fuelType}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 rounded w-full mb-2"
                        >
                            <option value="">Select Fuel Type</option>
                            <option value="Oil">Oil (Gallons)</option>
                            <option value="Propane">Propane (Gallons)</option>
                        </select>
                        {inputs.fuelType === "Oil" && (
                            <input
                                type="number"
                                name="oil"
                                value={inputs.oil}
                                onChange={handleChange}
                                placeholder="Enter Gallons"
                                className="border border-gray-300 p-2 rounded w-full"
                            />
                        )}
                        {inputs.fuelType === "Propane" && (
                            <input
                                type="number"
                                name="propane"
                                value={inputs.propane}
                                onChange={handleChange}
                                placeholder="Enter Gallons"
                                className="border border-gray-300 p-2 rounded w-full"
                            />
                        )}
                        <p className="mt-2 text-green-700">Tonnes CO₂: {stepEmissions.toFixed(4)}</p>
                    </div>
                );
            case 2:
                return (
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-2">Vehicle Usage</h2>
                        <input
                            type="number"
                            name="vehicle.mpg"
                            placeholder="Average MPG"
                            value={inputs.vehicle.mpg}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 rounded w-full mb-2"
                        />
                        <input
                            type="number"
                            name="vehicle.miles"
                            placeholder="Total Miles Driven"
                            value={inputs.vehicle.miles}
                            onChange={handleChange}
                            className="border border-gray-300 p-2 rounded w-full"
                        />
                        <p className="mt-2 text-green-700">Tonnes CO₂: {stepEmissions.toFixed(4)}</p>
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
                        <p className="mt-2 text-green-700">Tonnes CO₂: {stepEmissions.toFixed(4)}</p>
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
                        <p className="mt-2 text-green-700">Tonnes CO₂: {stepEmissions.toFixed(4)}</p>
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
                            placeholder="Average Shipment Weight (lbs)"
                            className="border border-gray-300 p-2 rounded w-full mb-2"
                        />
                        <input
                            type="number"
                            name="shipping.distance"
                            value={inputs.shipping.distance}
                            onChange={handleChange}
                            placeholder="Average Shipment Distance (miles)"
                            className="border border-gray-300 p-2 rounded w-full"
                        />
                        <p className="mt-2 text-green-700">Tonnes CO₂: {stepEmissions.toFixed(4)}</p>
                    </div>
                );
            case 6:
                return (
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-2">Events Usage</h2>
                        <input
                            type="number"
                            name="events"
                            value={inputs.events}
                            onChange={handleChange}
                            placeholder="Number of Events"
                            className="border border-gray-300 p-2 rounded w-full"
                        />
                        <p className="mt-2 text-green-700">Tonnes CO₂: {stepEmissions.toFixed(4)}</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Emission Calculator</h1>
            {renderStep()}
            <div className="flex justify-between mt-6">
                <button
                    onClick={prevStep}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:bg-gray-300"
                    disabled={step === 0}
                >
                    Previous
                </button>
                <button
                    onClick={nextStep}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Next
                </button>
            </div>
            <div className="mt-4">
                <h2 className="text-xl font-semibold">Total Emissions: {totalEmissions.toFixed(4)} Tonnes CO₂</h2>
            </div>
        </div>
    );
};

export default EmissionCalculator;
