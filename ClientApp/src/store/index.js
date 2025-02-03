// OK
import { configureStore } from "@reduxjs/toolkit";
import { authReducer, cartReducer, productReducer } from "./redux";

// Create store for redux and combine all slices of state into single state of redux
const store = configureStore({
  reducer: {
    productSlice: productReducer,
    authSlice: authReducer,
    cart: cartReducer,
  },
});
export default store;
