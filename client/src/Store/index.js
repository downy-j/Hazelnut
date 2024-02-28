import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import userInfoReducer from "./UserInfoSlice";
import noteReducer from "./NoteSlice";
import recentPostsReducer from "./RecentPostsSlice";
import interestReducer from "./InterestSlice";
import postReducer from "./PostSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    userInfo: userInfoReducer,
    note: noteReducer,
    recent: recentPostsReducer,
    interest: interestReducer,
    post: postReducer,
  },
});

export default store;
