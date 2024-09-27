import React, { useState } from "react";
import Electric from "./Components/Electric";
import Heat from "./Components/Heat";
import Vehicle from "./Components/Vehicle";
import Air from "./Components/Air";
import Rail from "./Components/Rail";
import Shipping from "./Components/Shipping";
import Events from "./Components/Events";
import Total from "./Components/Total";
import { useCalculator } from "./Context/CalculatorContextApi";
import { tabs } from './utils/constants';

function App() {
  const { activeTab, formData, handleTabChange } = useCalculator()


  return (
    <div className="max-w-[90%] mx-auto p-8 transition-all bg-[#F5FCF9]">

      <div className="p-4 flex gap-4 justify-center items-center">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-6 py-4 text-gray-500 text-sm font-bold  hover:bg-white hover:border-green-500 hover:shadow-2xl hover:rounded-full hover:border ${formData.activeTab === tab
              ? "border-green-500 shadow-2xl rounded-full border bg-white"
              : ""
              }`}
            onClick={() => handleTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <hr />

      <div className="flex justify-between rounded-2xl shadow-md p-4">

        <div className="w-[70%]">
          {formData.activeTab === "ELECTRIC" && <Electric />}
          {formData.activeTab === "HEAT" && <Heat />}
          {formData.activeTab === "VEHICLE" && <Vehicle />}
          {formData.activeTab === "AIR" && <Air />}
          {formData.activeTab === "RAIL" && <Rail />}
          {formData.activeTab === "SHIPPING" && <Shipping />}
          {formData.activeTab === "EVENTS" && <Events />}
          {formData.activeTab === "TOTAL" && <Total />}
        </div>

        <div className="p-4 rounded-lg mt-20">
          <h2 className="text-lg font-medium mb-2 text-center">EMISSION TOTALS</h2>
          <div className="flex  text-2xl mt-4 justify-between items-center p-8 font-semibold min-w-80 rounded-full shadow-lg bg-white ">
            <span className="text-gray-700">Total</span>
            <span className="text-black">$
              {formData.emissionTotals.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* <div className="mt-4 flex justify-between">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-full shadow-md"
          onClick={handlePreviousTab}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-full shadow-md"
          onClick={handleNextTab}
        >
          Next
        </button>
      </div> */}
    </div>
  );
}

export default App;
