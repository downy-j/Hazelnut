import { createSlice } from "@reduxjs/toolkit";

// 유저 슬라이스의 초기 상태
const initialState = {
  nick: null,
  token: null,
  isLoading: true,
};

// createSlice를 사용하여 Redux 슬라이스 생성
export const userSlice = createSlice({
  name: "user", // 슬라이스의 이름
  initialState, // 위에서 정의한 초기 상태
  reducers: {
    // loginUser 액션을 처리하는 리듀서 함수
    loginUser: (state, action) => {
      // 페이로드를 기반으로 상태에서 user와 token을 업데이트
      state.nick = action.payload.nick;
      state.token = action.payload.token;
    },
    // logoutUser 액션을 처리하는 리듀서 함수
    logoutUser: (state) => {
      // 로그아웃 시 user와 token을 null로 초기화
      state.nick = null;
      state.token = null;
    },
    // setLoading 액션을 처리하는 리듀서 함수
    setLoading: (state, action) => {
      // 페이로드를 기반으로 상태에서 isLoading을 업데이트
      state.isLoading = action.payload;
      localStorage.removeItem("User");
    },
  },
});
// createSlice에서 생성된 액션 생성자들을 추출
export const { loginUser, logoutUser, setLoading } = userSlice.actions;
