import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SERVER_URL, getRequest, postRequest } from "../utile/service";

// POST
export const postNote = createAsyncThunk(
  "user/postNote",
  async ({ accToken, thisUser, noteBox }) => {
    await postRequest(
      `${SERVER_URL}/${thisUser}/note`,
      { content: noteBox },
      accToken,
      "application/json"
    );
  }
);

// GET
export const getNote = createAsyncThunk(
  "user/getNote",
  async ({ accToken, thisUser }) => {
    const response = await getRequest(
      `${SERVER_URL}/${thisUser}/notes`,
      accToken
    );
    return response;
  }
);

const noteSlice = createSlice({
  name: "note",
  initialState: [],
  reducers: {
    resetNotes: () => {
      return [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNote.fulfilled, (state, action) => {
      // 받아온 데이터로 새로운 배열을 생성하여 반환
      return [...state, ...action.payload];
    });
  },
});

export const { resetNotes } = noteSlice.actions;
export default noteSlice.reducer;
