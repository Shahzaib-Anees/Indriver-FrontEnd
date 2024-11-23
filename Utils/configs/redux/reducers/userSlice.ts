const { createSlice } = require("@reduxjs/toolkit");
import { getSingleData } from "../../Methods/Methods";

// User Slice
const userSlice: any = createSlice({
  name: "user",
  initialState: {
    info: {},
    isAuthenticated: false,
    uid: null,
  },
  reducers: {
    setUserData: (state: any, action: any) => {
      state.isAuthenticated = true;
      state.uid = action.payload.uid;
      state.info = action.payload.data;
      console.log(state.info);
    },
    logout: (state: any) => {
      state.info = {};
      state.isAuthenticated = false;
      state.uid = null;
    },
  },
});

// Thunk handles all async operations
export const fetchAndSetUserData = (uid: string) => {
  return async (dispatch: any) => {
    const userData: any = await getSingleData("users", uid);
    const {
      name,
      email,
      password,
      ridesHistory,
      profilePicture,
      driver,
      city,
    } = userData;
    const data = {
      name,
      email,
      password,
      ridesHistory,
      profilePicture,
      driver,
      city,
    };
    dispatch(setUserData({ uid, data }));
    return "data added to global state";
  };
};
export const { setUserData, logout } = userSlice?.actions;
export default userSlice?.reducer;
