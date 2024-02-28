import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  SERVER_URL,
  postRequest,
  getRequest,
  patchRequest,
} from "../utile/service";

// POST
export const myProfileImage = createAsyncThunk(
  "user/updateProFileImage",
  async ({ accToken, formData, thisUser }) => {
    await postRequest(
      `${SERVER_URL}/${thisUser}/profileImage`,
      formData,
      accToken,
      "multipart/form-data"
    );
  }
);

// PATCH
export const updateTextBox = createAsyncThunk(
  "user/updateTextBox",
  async ({ accToken, updateText }) => {
    await patchRequest(
      `${SERVER_URL}/update/userInfo/textBox`,
      { textBox: updateText },
      accToken
    );
  }
);

// GET
export const getUserInfo = createAsyncThunk(
  "user/getUserInfo",
  async ({ accToken, thisUser }) => {
    try {
      const response = await getRequest(`${SERVER_URL}/${thisUser}`, accToken);
      return response;
    } catch (error) {
      // 에러 처리 코드
      console.error(error);
      throw error;
    }
  }
);

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: {
    id: null,
    imgURL: null,
    today: 0,
    total: 0,
    textBox: "대화명을 입력해 주세요",
  },
  reducers: {
    resetUserInfo: (state) => {
      state.id = null;
      state.imgURL = null;
      state.today = 0;
      state.total = 0;
      state.textBox = "대화명을 입력해 주세요";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.imgURL = action.payload.imgURL;
      state.today = action.payload.today;
      state.total = action.payload.total;
      state.textBox = action.payload.textBox;
    });
  },
});

export const { resetUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
