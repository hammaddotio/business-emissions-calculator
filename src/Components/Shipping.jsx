import React from "react";
import { useCalculator } from "../Context/CalculatorContextApi";
import Buttons from "./Buttons";
import { shippingMethod } from "../utils/constants";

const Shipping = () => {
    // Import shared states and functions from the context
    const {
        formData,
        handleInputChange,
    } = useCalculator();

    // Calculate emissions based on inputs (adjust calculation as needed)
    const tonnesCO2 = formData.averageMPG * formData.shipmentWeight * formData.shipmentDistance * 0.0001 || 0;

    // This useEffect can be added in the Context provider to handle calculation updates.
    // useEffect(() => {
    //     calculateEmissionsAndCost('shipping', tonnesCO2);
    // }, [formData.averageMPG, formData.shipmentWeight, formData.shipmentDistance]);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-medium mb-4">Annual Shipping</h1>

            {/* Shipping Form Fields */}
            <div className="mb-4 w-full rounded-full text-lg font-light">
                <div className="flex gap-4 flex-wrap">

                    {/* Type Of Fuel */}
                    <div className="flex flex-col mb-4 w-full md:w-1/2">
                        <label className="font-medium text-gray-700 mb-2">Type Of Fuel</label>
                        <select
                            name="selectedMethod"
                            value={formData.selectedMethod || ''}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-green-500 rounded-md focus:outline-none"
                        >
                            <option value="">Select Fuel Type</option>
                            {shippingMethod.map((method) => (
                                <option key={method} value={method}>{method}</option>
                            ))}
                        </select>
                    </div>

                    {/* Average MPG */}
                    <div className="flex flex-col mb-4 w-full md:w-1/2">
                        <label className="font-medium text-gray-700 mb-2">Average MPG</label>
                        <input
                            type="number"
                            name="averageMPG"
                            value={formData.averageMPG || ''}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-green-500 rounded-md focus:outline-none"
                            placeholder="Enter MPG"
                            min="0"
                        />
                    </div>

                    {/* Average Shipment Weight */}
                    <div className="flex flex-col mb-4 w-full md:w-1/2">
                        <label className="font-medium text-gray-700 mb-2">Average Shipment Weight (lbs)</label>
                        <input
                            type="number"
                            name="shipmentWeight"
                            value={formData.shipmentWeight || ''}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-green-500 rounded-md focus:outline-none"
                            placeholder="Enter weight in lbs"
                            min="0"
                        />
                    </div>

                    {/* Average Shipment Distance */}
                    <div className="flex flex-col mb-4 w-full md:w-1/2">
                        <label className="font-medium text-gray-700 mb-2">Average Shipment Distance (miles)</label>
                        <input
                            type="number"
                            name="shipmentDistance"
                            value={formData.shipmentDistance || ''}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-green-500 rounded-md focus:outline-none"
                            placeholder="Enter distance in miles"
                            min="0"
                        />
                    </div>
                </div>
            </div>

            {/* Display Emission and Cost Results */}
            <div className="mb-4 text-xl flex flex-col gap-4">
                <p className="text-gray-700">
                    Tonnes CO2: <span className="font-medium">{tonnesCO2.toFixed(2)}</span>
                </p>
                <p className="text-gray-700">
                    Total Cost: <span className="font-medium text-black">${formData.emissionTotals.toFixed(2)}</span>
                </p>
            </div>

            {/* Navigation Buttons */}
            <Buttons />
        </div>
    );
};

export default Shipping;
