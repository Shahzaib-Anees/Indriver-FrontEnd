import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "../reducers/userSlice";
const store: any = configureStore({
  reducer: {
    user: userSliceReducer,
  },
});

export default store;
