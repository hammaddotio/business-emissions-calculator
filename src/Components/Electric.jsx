import React from 'react';
import { useCalculator } from '../Context/CalculatorContextApi';
import Buttons from './Buttons';

const Electric = () => {
    const {
        formData,
        handleInputChange,
    } = useCalculator();

    return (
        <div className="p-8">
            <h1 className="text-3xl font-medium mb-4">Annual Office Electricity Usage</h1>
            <div className="mb-4 w-2/4 rounded-full">
                <label className="font-medium text-gray-700 mb-2">KWH</label>
                <input
                    type="number"
                    name="electricityUsage"
                    value={formData.electricityUsage || ''}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-green-500 rounded-md focus:outline-none"
                    placeholder="Enter annual KWH usage"
                    min="0"
                />
            </div>
            <div className="mb-4 text-xl flex flex-col gap-4">
                <p className="text-gray-700">
                    Tonnes CO2: <span className="font-medium">{formData.emissions}</span>
                </p>
                <p className="text-gray-700">
                    Total Estimation Cost: <span className="font-medium text-black">${formData.emissionTotals.toFixed(2)}</span>
                </p>
            </div>
            <Buttons />
        </div>
    );
};

export default Electric;
