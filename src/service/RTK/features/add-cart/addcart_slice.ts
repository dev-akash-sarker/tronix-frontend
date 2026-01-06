import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 1️⃣ Cart Item Type
export interface CartItem {
  id: string | number;
  title: string;
  price: number;
  quantity: number;
  selected: boolean;
  [key: string]: unknown; // allows extra fields safely
}

// 2️⃣ State Type
export interface CartState {
  carts: CartItem[];
}

// 3️⃣ Load from LocalStorage Safely
const loadCartFromStorage = (): CartItem[] => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("cart");
    if (saved) return JSON.parse(saved);
  }
  return [];
};

// 4️⃣ Initial State
const initialState: CartState = {
  carts: loadCartFromStorage(),
};

// Helper to save cart
const saveCartToStorage = (carts: CartItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(carts));
  }
};

// 5️⃣ Slice
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addcarts: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existing = state.carts.find(item => item.id === newItem.id);

      if (existing) {
        existing.quantity += newItem.quantity || 1;
      } else {
        state.carts.push({
          ...newItem,
          quantity: newItem.quantity || 1,
          selected: false,
        });
      }

      saveCartToStorage(state.carts);
    },

    removecarts: (state, action: PayloadAction<{ id: string | number }>) => {
      state.carts = state.carts.filter(item => item.id !== action.payload.id);
      saveCartToStorage(state.carts);
    },

    increaseQuantity: (state, action: PayloadAction<{ id: string | number }>) => {
      const item = state.carts.find(item => item.id === action.payload.id);
      if (item) item.quantity += 1;

      saveCartToStorage(state.carts);
    },

    decreaseQuantity: (state, action: PayloadAction<{ id: string | number }>) => {
      const item = state.carts.find(item => item.id === action.payload.id);
      if (item && item.quantity > 1) item.quantity -= 1;

      saveCartToStorage(state.carts);
    },

    toggleSelected: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      state.carts[index].selected = !state.carts[index].selected;

      saveCartToStorage(state.carts);
    },

    setAllSelected: (state, action: PayloadAction<boolean>) => {
      const isSelected = action.payload;
      state.carts = state.carts.map(item => ({
        ...item,
        selected: isSelected,
      }));

      saveCartToStorage(state.carts);
    },
  },
});

export const {
  addcarts,
  removecarts,
  increaseQuantity,
  decreaseQuantity,
  toggleSelected,
  setAllSelected,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
export default cartSlice.reducer;
