import React from "react";
import { useCalculator } from "../Context/CalculatorContextApi";
import Buttons from "./Buttons";
import { TypeOfFuel } from "../utils/constants";

function Vehicle() {
    const { formData, handleInputChange } = useCalculator();

    return (
        <div className="p-8">
            <h1 className="text-3xl font-medium mb-4">Annual Vehicle Fleet Usage</h1>
            <div className="mb-4 w-2/4 rounded-full text-lg font-light">
                <div className="flex gap-4 flex-wrap">
                    {/* Type of Fuel Dropdown */}
                    <div className="flex flex-row justify-between gap-4">
                        <div>
                            <label className="font-medium text-gray-700 mb-2">Type Of Fuel</label>
                            <select
                                name="vehicleFuelType" // Name attribute for context state management
                                id="fuelTypeSelect"
                                className="w-full p-2 border border-green-500 rounded-md focus:outline-none"
                                onChange={handleInputChange} // Use context handler
                                value={formData.vehicleFuelType || ""} // Use context state value
                            >
                                {TypeOfFuel.map((fuel) => (
                                    <option key={fuel} value={fuel}>
                                        {fuel}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Average MPG Input */}
                        <div>
                            <label className="font-medium text-gray-700 mb-2">Average MPG</label>
                            <input
                                type="number"
                                name="averageMPG" // Name attribute for context state management
                                value={formData.averageMPG || ""} // Use context state value
                                onChange={handleInputChange} // Use context handler
                                className="w-full p-2 border border-green-500 rounded-md focus:outline-none"
                                placeholder="Enter average MPG" // Placeholder text for clarity
                            />
                        </div>
                    </div>

                    {/* Total Miles Driven Input */}
                    <div>
                        <label className="font-medium text-gray-700 mb-2">Total Miles Driven per Year</label>
                        <input
                            type="number"
                            name="totalMilesDriven" // Name attribute for context state management
                            value={formData.totalMilesDriven || ""} // Use context state value
                            onChange={handleInputChange} // Use context handler
                            className="w-full p-2 border border-green-500 rounded-md focus:outline-none"
                            placeholder="Enter total miles driven" // Placeholder text for clarity
                        />
                    </div>
                </div>
            </div>

            {/* Emission and Cost Details */}
            <div className="mb-4 text-xl flex flex-col gap-4">
                <p className="text-gray-700">
                    Tonnes CO2:{" "}
                    <span className="font-medium">
                        {(formData.totalMilesDriven * 0.0001).toFixed(4)}
                    </span>
                </p>
                <p className="text-gray-700">
                    Total Cost:{" "}
                    <span className="font-medium text-black">
                        ${formData.emissionTotals.toFixed(2)}
                    </span>
                </p>
            </div>

            {/* Navigation Buttons */}
            <Buttons />
        </div>
    );
}

export default Vehicle;
