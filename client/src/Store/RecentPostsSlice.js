import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SERVER_URL, getRequest } from "../utile/service";

// GET
export const getRecentPosts = createAsyncThunk(
  "user/RecentPosts",
  async ({ accToken, userNick }) => {
    const response = await getRequest(
      `${SERVER_URL}/${userNick}/recentPost`,
      accToken
    );
    return response;
  }
);

const RecentPostsSlice = createSlice({
  name: "recentPosts",
  initialState: [],
  reducers: {
    resetRecentPosts: () => {
      return [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRecentPosts.fulfilled, (state, action) => {
      return [...state, ...action.payload];
    });
  },
});

export const { resetRecentPosts } = RecentPostsSlice.actions;
export default RecentPostsSlice.reducer;
