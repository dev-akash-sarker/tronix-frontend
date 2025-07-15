import { configureStore } from "@reduxjs/toolkit";
import {cartReducer} from "@/service/RTK/features/add-cart/add_cart_Slice"

const saveToLocalStorage = (state) => {
  try {
    const serialized = JSON.stringify(state.cart.carts);
    localStorage.setItem("cart", serialized);
  } catch (e) {
    console.warn("Could not save cart to localStorage", e);
  }
};
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});
