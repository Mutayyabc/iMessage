import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import chatReducer from "./messageSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    message: chatReducer,
  },
});
