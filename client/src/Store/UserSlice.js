import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SERVER_URL, postRequest, getRequest } from "../utile/service";

// 로그인
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (isLoginInfo) => {
    const response = await postRequest(
      `${SERVER_URL}/login`,
      JSON.stringify(isLoginInfo),
      null,
      "application/json"
    );
    localStorage.setItem("User", JSON.stringify(response));
    return response;
  }
);

// 새로고침시 복구할 요청
export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (accToken) => {
    try {
      const response = await getRequest(`${SERVER_URL}/getUserData`, accToken);
      return response;
    } catch (error) {
      throw new Error("사용자 정보를 불러오는데 실패했습니다.");
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (isRegisterInfo) => {
    const response = await postRequest(
      `${SERVER_URL}/register`,
      JSON.stringify(isRegisterInfo),
      null,
      "application/json"
    );
    localStorage.setItem("User", JSON.stringify(response));
    return response;
  }
);

// 로그아웃
export const logOutUser = createAsyncThunk("user/logOutUser", async () => {
  try {
    localStorage.removeItem("User");

    await postRequest(`${SERVER_URL}/logout`);
  } catch (error) {
    console.error(error);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
    nick: null,
    email: null,
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true; // 로딩 상태 활성화
        state.error = null; // 에러 초기화
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false; // 로딩 상태 비활성화
        state.id = action.payload.id; // 사용자 ID 설정
        state.nick = action.payload.nick; // 사용자 닉네임 설정
        state.email = action.payload.email; // 사용자 이메일 설정
        state.error = null; // 에러 초기화
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false; // 로딩 상태 비활성화
        state.error = action.error.message; // 에러 설정
      })

      .addCase(registerUser.pending, (state) => {
        state.isLoading = true; // 로딩 상태 활성화
        state.error = null; // 에러 초기화
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false; // 로딩 상태 비활성화
        state.id = action.payload.id; // 사용자 ID 설정
        state.nick = action.payload.nick; // 사용자 닉네임 설정
        state.email = action.payload.email; // 사용자 이메일 설정
        state.error = null; // 에러 초기화
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false; // 로딩 상태 비활성화
        state.error = action.error.message; // 에러 설정
      })
      .addCase(getUserData.pending, (state) => {
        state.isLoading = true; // 로딩 상태 활성화
        state.error = null; // 에러 초기화
      })

      .addCase(getUserData.fulfilled, (state, action) => {
        state.isLoading = false; // 로딩 상태 비활성화
        state.id = action.payload.id; // 사용자 ID 설정
        state.nick = action.payload.nick; // 사용자 닉네임 설정
        state.email = action.payload.email; // 사용자 이메일 설정
        state.error = null; // 에러 초기화
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.isLoading = false; // 로딩 상태 비활성화
        state.error = action.error.message; // 에러 설정
      });
  },
});

export default userSlice.reducer;
