"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// --------------
// USER TYPE
// --------------
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  contact: number;
  country: string;
  city: string;
  emailVerified: boolean;
  role: string;
}

// --------------
// STATE TYPE
// --------------
interface UserState {
  user: User | null;
}

// --------------
// INITIAL STATE
// --------------
const initialState: UserState = {
  user:
    typeof window !== "undefined" && localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : null,
};

// --------------
// SLICE
// --------------
export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;

      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
    },

    logoutUser: (state) => {
      state.user = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
    },
  },
});

// EXPORT ACTIONS
export const { loginSuccess, logoutUser } = UserSlice.actions;

// EXPORT REDUCER
export default UserSlice.reducer;
