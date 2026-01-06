import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "@/service/RTK/features/add-cart/add_cart_Slice";
import userReducer from "@/store/userSlice";

// Save to localStorage
const saveToLocalStorage = (state) => {
  try {
    // Save cart
    const cartData = JSON.stringify(state.cart.carts);
    localStorage.setItem("cart", cartData);

    // Save user (optional: only if authenticated)
    if (state.user.isAuthenticated) {
      localStorage.setItem("user", JSON.stringify(state.user.user));
      localStorage.setItem("token", state.user.token);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }

  } catch (e) {
    console.warn("Could not save to localStorage", e);
  }
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
});

// Save anytime Redux state changes
store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

// TypeScript support (optional)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
