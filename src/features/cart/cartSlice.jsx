import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

function getCartFromLocalStorage() {
  return JSON.parse(localStorage.getItem("cart"));
}

const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage() || defaultState,
  reducers: {
    addItems: (state, action) => {
      const { products } = action.payload;
      const item = state.cartItems.find((i) => i.cartID === products.cartID);

      if (item) {
        item.amount += products.amount;
      } else {
        state.cartItems.push(products);
      }
      state.numItemsInCart += products.amount;
      state.cartTotal += products.price * products.amount;

      cartSlice.caseReducers.calculateTotals(state);

      toast.success("Item added to cart");
    },

    clearCart: (state, action) => {
      localStorage.setItem("cart", JSON.stringify(defaultState));
      return defaultState;
    },

    removeItem: (state, action) => {
      const { cartID } = action.payload;
      const products = state.cartItems.find((i) => i.cartID === cartID);
      state.cartItems = state.cartItems.filter((i) => i.cartID !== cartID);
      //console.log("RemoveItem in CartItems ,", state.cartItems);

      state.numItemsInCart -= products.amount;
      state.cartTotal -= products.price * products.amount;

      cartSlice.caseReducers.calculateTotals(state);

      toast.error("Item removed from cart");
    },

    editItem: (state, action) => {
      const { amount, cartID } = action.payload;
      const item = state.cartItems.find((i) => i.cartID === cartID);
      state.numItemsInCart += amount - item.amount;
      state.cartTotal += item.price * (amount - item.amount);
      item.amount = amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast.success("Cart updated");
    },

    calculateTotals: (state) => {
      state.tax = 0.1 * state.cartTotal;
      state.orderTotal = state.cartTotal + state.shipping + state.tax;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addItems, clearCart, removeItem, editItem } = cartSlice.actions;
export default cartSlice.reducer;
