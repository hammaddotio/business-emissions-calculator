// redux/actions.js

// Action Types
export const UPDATE_TAB = "UPDATE_TAB";
export const UPDATE_TOTAL_ESTIMATION = "UPDATE_TOTAL_ESTIMATION";
export const UPDATE_ELECTRICITY_USAGE = "UPDATE_ELECTRICITY_USAGE";
export const UPDATE_HEAT_USAGE = "UPDATE_HEAT_USAGE";
export const UPDATE_VEHICLE_USAGE = "UPDATE_VEHICLE_USAGE";
export const UPDATE_AIR_USAGE = "UPDATE_AIR_USAGE";
export const UPDATE_RAIL_USAGE = "UPDATE_RAIL_USAGE";
export const UPDATE_SHIPPING_USAGE = "UPDATE_SHIPPING_USAGE";
export const UPDATE_EVENTS_USAGE = "UPDATE_EVENTS_USAGE";

// Action Creators

// Tab Change Action
export const updateTab = (tab) => ({
    type: UPDATE_TAB,
    payload: tab,
});

// Update Estimation Action
export const updateTotalEstimation = (value) => ({
    type: UPDATE_TOTAL_ESTIMATION,
    payload: value,
});

// Individual Update Actions
export const updateElectricityUsage = (value) => ({
    type: UPDATE_ELECTRICITY_USAGE,
    payload: value,
});

export const updateHeatUsage = (value) => ({
    type: UPDATE_HEAT_USAGE,
    payload: value,
});

export const updateVehicleUsage = (value) => ({
    type: UPDATE_VEHICLE_USAGE,
    payload: value,
});

export const updateAirUsage = (value) => ({
    type: UPDATE_AIR_USAGE,
    payload: value,
});

export const updateRailUsage = (value) => ({
    type: UPDATE_RAIL_USAGE,
    payload: value,
});

export const updateShippingUsage = (value) => ({
    type: UPDATE_SHIPPING_USAGE,
    payload: value,
});

export const updateEventsUsage = (value) => ({
    type: UPDATE_EVENTS_USAGE,
    payload: value,
});
