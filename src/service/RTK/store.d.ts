// src/store.d.ts
import { Store } from "@reduxjs/toolkit";

export interface CartItem {
  _id: string;
  id: number;
  thumbnail: string;
  title: string;
  price: number;
  quantity: number;
  selected: boolean;
}

export interface RootState {
  cart: {
    carts: CartItem[];
  };
}

export const store: Store<RootState>;

export type AppDispatch = typeof store.dispatch;