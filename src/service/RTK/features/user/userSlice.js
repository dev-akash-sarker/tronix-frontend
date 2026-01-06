// store/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

// Load from localStorage (on refresh)
if (typeof window !== "undefined") {
  const savedUser = localStorage.getItem("user");
  const savedToken = localStorage.getItem("token");

  if (savedUser && savedToken) {
    initialState.user = JSON.parse(savedUser);
    initialState.token = savedToken;
    initialState.isAuthenticated = true;
  }
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ user: any; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      }
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      // Remove from localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
