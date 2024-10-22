// src/redux/loginSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
  userType: null,
  token: null,
  userImage: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action) => {
      state.username = action.payload.username;
      state.userType = action.payload.userType;
      state.token = action.payload.token;
      state.userImage = action.payload.userImage;
    },
    logout: (state) => {
      state.username = null;
      state.userType = null;
      state.token = null;
      state.userImage = null;
    },
    updateImage: (state, action) => {
      // Update only the image URL
      state.userImage = action.payload.userImage;
    },
  },
});

// Export actions
export const { login, logout, updateImage } = loginSlice.actions;

// Export the reducer
export default loginSlice.reducer;
