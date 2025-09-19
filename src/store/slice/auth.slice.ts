import type { IUser } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  isloggedIn: boolean;
  user: IUser | null;
}

const intialState: AuthState = {
  isloggedIn: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: intialState,
  reducers: {
    login: (state, action) => {
      state.isloggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isloggedIn = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
