import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts:
    typeof window !== "undefined" && localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [],
};

export const Cart_Slicer = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addcarts: (state, action) => {
  const newItem = action.payload;
  const existingItem = state.carts.find(item => item.id === newItem.id);

  if (existingItem) {
    existingItem.quantity += newItem.quantity || 1;
  } else {
    state.carts.push({ ...newItem, quantity: newItem.quantity || 1 });
  }
    },
    removecarts: (state, action) => {
      // Remove item from cart based on ID
      state.carts = state.carts.filter((item) => item.id !== action.payload.id);
      // Update localStorage after removing
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.carts));
      }
    },

    increaseQuantity: (state, action) => {
      const item = state.carts.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
        
      } else {
        state.carts.push({ ...action.payload, quantity: 1});
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.carts.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity -= 1;
      } else {
        state.carts.push({ ...action.payload, quantity: 1  });
      }
    },
  },
});

export const { addcarts, removecarts, increaseQuantity, decreaseQuantity } =
  Cart_Slicer.actions;
export const cartReducer = Cart_Slicer.reducer;
export default Cart_Slicer.reducer;
