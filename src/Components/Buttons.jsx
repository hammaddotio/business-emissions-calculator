import React from 'react'
import { useCalculator } from '../Context/CalculatorContextApi'

const Buttons = () => {
    const { handlePreviousTab, handleNextTab } = useCalculator()
    return (
        <div className="flex space-x-4 my-10">
            <button
                className="px-10 py-4 text-xl border border-gray-500 text-gray-500 rounded-full w-1/4"
                onClick={handlePreviousTab}
            >
                Previous
            </button>
            <button
                onClick={handleNextTab}
                className="px-10 py-4 text-xl bg-black text-white rounded-full hover:bg-green-500 w-1/4"
            >
                Next
            </button>
        </div>
    )
}

export default Buttons
