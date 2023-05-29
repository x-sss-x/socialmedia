import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: 0,
  reducers: {
    incrementCart(state) {
      return state + 1;
    },
  },
});

export const { incrementCart } = cartSlice.actions;
