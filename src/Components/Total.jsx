import React from "react";
import { useCalculator } from "../Context/CalculatorContextApi";

function Total() {
    const { formData } = useCalculator()
    return (
        <div>
            <h2 className="text-lg font-medium mb-4">Total Emissions</h2>
            <p>Total Emissions: {formData.emissionTotals.toFixed(2)} kg CO2</p>
        </div>
    );
}

export default Total;
