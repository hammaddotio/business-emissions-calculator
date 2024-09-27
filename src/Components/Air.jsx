import React from 'react';
import { useCalculator } from '../Context/CalculatorContextApi';
import Buttons from './Buttons';

const Air = () => {
    const {
        formData,
        handleInputChange,
    } = useCalculator();

    return (
        <div className="p-8">
            <h1 className="text-3xl font-medium mb-4">Annual Air Travel</h1>
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
            <div className="mb-4 text-xl flex flex-col gap-4">
                <p className="text-gray-700">
                    Tonnes CO2: <span className="font-medium">{(formData.airUsage * 0.0001).toFixed(4)}</span>
                </p>
                <p className="text-gray-700">
                    Total Estimation Cost: <span className="font-medium text-black">${formData.airUsage.toFixed(2)}</span>
                </p>
            </div>
            <Buttons />
        </div>
    );
};

export default Air;
