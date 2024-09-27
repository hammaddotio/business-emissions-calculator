// redux/reducer.js

import {
    UPDATE_TAB,
    UPDATE_TOTAL_ESTIMATION,
    UPDATE_ELECTRICITY_USAGE,
    UPDATE_HEAT_USAGE,
    UPDATE_VEHICLE_USAGE,
    UPDATE_AIR_USAGE,
    UPDATE_RAIL_USAGE,
    UPDATE_SHIPPING_USAGE,
    UPDATE_EVENTS_USAGE,
} from "./actions";

// Initial State
const initialState = {
    activeTab: "ELECTRIC",
    electricityUsage: 0,
    heatUsage: 0,
    vehicleUsage: 0,
    airUsage: 0,
    railUsage: 0,
    shippingUsage: 0,
    eventsUsage: 0,
    totalEstimation: 0,
};

// Reducer
const calculatorReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_TAB:
            return { ...state, activeTab: action.payload };
        case UPDATE_TOTAL_ESTIMATION:
            return { ...state, totalEstimation: action.payload };
        case UPDATE_ELECTRICITY_USAGE:
            return { ...state, electricityUsage: action.payload };
        case UPDATE_HEAT_USAGE:
            return { ...state, heatUsage: action.payload };
        case UPDATE_VEHICLE_USAGE:
            return { ...state, vehicleUsage: action.payload };
        case UPDATE_AIR_USAGE:
            return { ...state, airUsage: action.payload };
        case UPDATE_RAIL_USAGE:
            return { ...state, railUsage: action.payload };
        case UPDATE_SHIPPING_USAGE:
            return { ...state, shippingUsage: action.payload };
        case UPDATE_EVENTS_USAGE:
            return { ...state, eventsUsage: action.payload };
        default:
            return state;
    }
};

export default calculatorReducer;
