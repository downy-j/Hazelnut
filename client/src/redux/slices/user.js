import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  nick: null,
  email: null,
  isLoading: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      return {
        ...state,
        id: action.payload.id,
        nick: action.payload.nick,
        email: action.payload.email,
      };
    },
    logoutUser: (state) => {
      return {
        ...state,
        id: null,
        nick: null,
        email: null,
      };
    },
    setLoading: (state, action) => {
      return {
        ...state,
        isLoading: action.payload,
      };
    },
  },
});

export const { loginUser, logoutUser, setLoading } = userSlice.actions;
