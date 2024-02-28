import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SERVER_URL, postRequest, getRequest } from "../utile/service";

// GET
export const getAllPosts = createAsyncThunk(
  "user/getAllPosts",
  async ({ accToken, thisUser }) => {
    const response = await getRequest(
      `${SERVER_URL}/${thisUser}/posts/img`,
      accToken
    );
    console.log("getAllPosts >> ", response);
    return response;
  }
);

// POST
export const uploadPost = createAsyncThunk(
  "user/uploadPost",
  async ({ accToken, formData, thisUser }) => {
    await postRequest(
      `${SERVER_URL}/${thisUser}/post/img`,
      formData,
      accToken,
      "multipart/form-data"
    );
  }
);
// Slice
const postSlice = createSlice({
  name: "post",
  initialState: [],
  reducers: {
    resetPosts_Photo: () => {
      return [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      return [...state, ...action.payload];
    });
  },
});

export const { resetPosts_Photo } = postSlice.actions;
export default postSlice.reducer;
