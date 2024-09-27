import React from "react";
import { useCalculator } from "../Context/CalculatorContextApi";
import Buttons from "./Buttons";

const Rail = () => {
    const { formData, handleInputChange } = useCalculator();

    // Fallback values to handle undefined values from context
    const railEmissions = formData.railEmissions || 0; // Assuming railEmissions is calculated in the context
    const railCost = formData.railCost || 0; // Assuming railCost is calculated in the context

    return (
        <div className="p-8">
            <h1 className="text-3xl font-medium mb-4">Annual Rail Usage</h1>

            {/* Input for Total Rail Miles Traveled */}
            <div className="mb-4 w-2/4 rounded-full">
                <label className="font-medium text-gray-700 mb-2">Total Miles</label>
                <input
                    type="number"
                    name="railUsage" // Ensure this matches the key in formData
                    value={formData.railUsage || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-green-500 rounded-md focus:outline-none"
                    placeholder="Enter total rail miles traveled"
                    min="0"
                />
            </div>

            {/* Displaying Calculated CO2 Emissions and Cost */}
            <div className="mb-4 text-xl flex flex-col gap-4">
                <p className="text-gray-700">
                    Tonnes CO₂: <span className="font-medium">{railEmissions.toFixed(2)}</span>
                </p>
                <p className="text-gray-700">
                    Total Estimation Cost: <span className="font-medium text-black">${railCost.toFixed(2)}</span>
                </p>
            </div>

            {/* Navigation Buttons */}
            <Buttons />
        </div>
    );
};

export default Rail;
