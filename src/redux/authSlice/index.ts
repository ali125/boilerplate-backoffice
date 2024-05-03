import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  accessToken: string | null;
  user: any;
}

const initialState: AuthState = {
  accessToken: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthToken: (state, action: PayloadAction<{ accessToken: string }>) => {
      state.accessToken = action.payload.accessToken;
    },
    logOut: (state) => {
      state.accessToken = null;
    },
  },
});

export const { setAuthToken, logOut } = authSlice.actions;

export default authSlice.reducer;
