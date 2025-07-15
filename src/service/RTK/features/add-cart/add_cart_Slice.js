import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts:typeof window !== "undefined" && localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
};

export const Cart_Slicer = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addcarts: (state, action) => {
      const existingItem = state.carts.find(item => item.id === action.payload.id)
          if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.carts.push({ ...action.payload, quantity: 1 });
      }

    },
  },
});

export const { addcarts } = Cart_Slicer.actions;
export const cartReducer = Cart_Slicer.reducer;
export default Cart_Slicer.reducer;
