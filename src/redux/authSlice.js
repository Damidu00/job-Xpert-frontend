import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Holds user data when logged in
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    updateUser: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, updateUser, logout } = authSlice.actions;
export default authSlice.reducer;
