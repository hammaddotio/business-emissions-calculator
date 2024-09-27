// redux/store.js

import { createStore } from "redux";
import calculatorReducer from "./reducer";

// Create Redux Store
const store = createStore(calculatorReducer);

export default store;
