import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import authReducer from "./authSlice"; // Ensure this file exists

const store = configureStore({
  reducer: {
    user: userReducer, 
    auth: authReducer, // Include authReducer to manage authentication state
  },
});

export default store;
