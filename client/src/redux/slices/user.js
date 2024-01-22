import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nick: null,
  token: null,
  isLoading: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.nick = action.payload.nick;
      state.token = action.payload.token;
    },
    logoutUser: (state) => {
      state.nick = null;
      state.token = null;
      localStorage.removeItem("User");
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { loginUser, logoutUser, setLoading } = userSlice.actions;
