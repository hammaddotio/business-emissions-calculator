import React, { useState } from "react";
import { useCalculator } from "../Context/CalculatorContextApi";
import Buttons from "./Buttons";
import { fuelType } from "../utils/constants";

function Heat() {
    const { formData, handleInputChange } = useCalculator();
    const [type, setType] = useState(fuelType[0]);

    // Handle select change
    const handleFuelTypeChange = (e) => {
        const selectedFuel = fuelType.find((fuel) => fuel.type === e.target.value);
        setType(selectedFuel);
        handleInputChange(e); // Update the context form data
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-medium mb-4">Heat Usage</h1>
            <div className="mb-4 w-5/6 rounded-full text-xl focus:outline-none">
                <div className="flex gap-4">
                    <div>
                        <label className="font-medium text-gray-700 mb-2">Fuel Type</label>
                        <select
                            name="selectedFuelType" // Add name attribute to match context form data key
                            id="fuelTypeSelect"
                            className="w-full p-2 border border-green-500 rounded-md focus:outline-none"
                            onChange={handleFuelTypeChange}
                            value={formData.selectedFuelType || type.type} // Use context state if available
                        >
                            {fuelType.map((fuel) => (
                                <option key={fuel.type} value={fuel.type}>
                                    {fuel.type}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="font-medium text-gray-700 mb-2">{type?.calType}</label>
                        <input
                            type="number"
                            name="heatUsage" // Add name attribute to match context form data key
                            value={formData.heatUsage || 0} // Use context state if available
                            onChange={handleInputChange} // Use context handler
                            className="w-full p-2 border border-green-500 rounded-md focus:outline-none"
                        />
                    </div>
                </div>
            </div>
            <div className="mb-4 text-xl flex flex-col gap-4">
                <p className="text-gray-700">
                    Tonnes CO2: <span className="font-medium">{(formData.heatUsage * 0.0001).toFixed(4)}</span>
                </p>
                <p className="text-gray-700">
                    Total Cost: <span className="font-medium text-black">${formData.emissionTotals.toFixed(2)}</span>
                </p>
            </div>
            <Buttons />
        </div>
    );
}

export default Heat;
