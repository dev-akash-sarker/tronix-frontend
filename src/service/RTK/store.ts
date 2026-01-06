import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/service/RTK/features/add-cart/addcart_slice";
import userReducer from "@/service/RTK/features/user/user_slice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer
  },
});

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
