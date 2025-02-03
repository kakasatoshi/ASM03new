// OK
import { createSlice } from "@reduxjs/toolkit";

// Create a slice of state: "productSlice"
const productSlice = createSlice({
  name: "productSlice",
  initialState: { productFilterByID: null, isShowPopup: false },
  reducers: {
    SHOW_POPUP(state, actions) {
      state.isShowPopup = true;
      state.productFilterByID = actions.payload;
    },

    HIDE_POPUP(state) {
      state.isShowPopup = false;
    },
  },
});

// Create a slice of state: "authSlice"
const authSlice = createSlice({
  name: "authSlice",
  initialState: { currentUser: null },
  reducers: {
    ON_LOGIN(state, actions) {
      state.currentUser = actions.payload;
    },
    ON_LOGOUT(state, actions) {
      state.currentUser = actions.payload;
    },
  },
});

// Create a slice of state: "cart"
const cart = createSlice({
  name: "cart",
  initialState: { listCart: [] },
  reducers: {
    LOAD_CART(state, actions) {
      state.listCart = actions.payload;
    },

    DELETE_CART(state, actions) {
      const indexUser = actions.payload.position.indexUser;
      const indexProduct = actions.payload.position.indexProduct;

      // Delete item in cart of current user
      state.listCart[indexUser].cartData.splice(indexProduct, 1);

      // Update to "listCart" array in localstorage (backend)
      localStorage.setItem("listCart", JSON.stringify(state.listCart));
    },
  },
});

export const productReducer = productSlice.reducer;
export const productActions = productSlice.actions;
export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
export const cartReducer = cart.reducer;
export const cartActions = cart.actions;
