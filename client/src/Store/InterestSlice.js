import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  SERVER_URL,
  deleteRequest,
  getRequest,
  postRequest,
} from "../utile/service";

// GET
export const getInterests = createAsyncThunk(
  "user/getInterest",
  async ({ accToken, thisUser }) => {
    console.log("thisUser >> ", thisUser);
    const response = await getRequest(
      `${SERVER_URL}/${thisUser}/interest`,
      accToken
    );
    console.log("getInterests_response >> ", response);
    return response;
  }
);

//POST
export const addUserInterest = createAsyncThunk(
  "user/addInterest",
  async ({ accToken, addInterest }) => {
    await postRequest(
      `${SERVER_URL}/interest`,
      { interest: addInterest },
      accToken,
      "application/json"
    );
  }
);

// DELETE
export const deleteInterest = createAsyncThunk(
  "user/deleteInterest",
  async ({ accToken, interestId }) => {
    deleteRequest(`${SERVER_URL}/interest/${interestId}`, accToken);
  }
);

//Slice
const interestSlice = createSlice({
  name: "interest",
  initialState: [],
  reducers: {
    resetInterest: () => {
      return [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getInterests.fulfilled, (state, action) => {
      return [...state, ...action.payload];
    });
  },
});

export const { resetInterest } = interestSlice.actions;
export default interestSlice.reducer;
