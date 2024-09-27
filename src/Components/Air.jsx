import React from 'react';
import { useCalculator } from '../Context/CalculatorContextApi';
import Buttons from './Buttons';

const Air = () => {
    const {
        formData,
        handleInputChange,
    } = useCalculator();

    // Fallback values to avoid issues if the context values are not yet initialized
    const airEmissions = formData.airEmissions || 0;
    const airCost = formData.airCost || 0;

    return (
        <div className="p-8">
            <h1 className="text-3xl font-medium mb-4">Annual Air Travel</h1>

            {/* Input for Total Air Miles Traveled */}
            <div className="mb-4 w-2/4 rounded-full">
                <label className="font-medium text-gray-700 mb-2">Total Miles</label>
                <input
                    type="number"
                    name="airUsage"
                    value={formData.airUsage || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-green-500 rounded-md focus:outline-none"
                    placeholder="Enter total air miles traveled"
                    min="0"
                />
            </div>

            {/* Displaying Calculated CO2 Emissions and Cost */}
            <div className="mb-4 text-xl flex flex-col gap-4">
                <p className="text-gray-700">
                    Tonnes CO₂: <span className="font-medium">{airEmissions.toFixed(2)}</span>
                </p>
                <p className="text-gray-700">
                    Total Estimation Cost: <span className="font-medium text-black">${airCost.toFixed(2)}</span>
                </p>
            </div>

            {/* Navigation Buttons */}
            <Buttons />
        </div>
    );
};

export default Air;
