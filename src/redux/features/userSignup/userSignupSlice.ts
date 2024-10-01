import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserSignupT } from "@/types";
import { UserResponseT, UserSignupOtpResponseT } from "./userSignupTypes";

export interface userSignupState {
  userResponse: UserResponseT;
  userSignupData: UserSignupT;
  userSignupOtpResponse: UserSignupOtpResponseT;
}

const initialState: userSignupState = {
  userResponse: {} as UserResponseT,
  userSignupData: {} as UserSignupT,
  userSignupOtpResponse: {} as UserSignupOtpResponseT,
};

const userSignupSliceReducers = createSlice({
  name: "userSignup",
  initialState,
  reducers: {
    setUserSignupResponse: (state, actions: PayloadAction<UserResponseT>) => {
      state.userResponse = actions.payload;
    },
    setUserSignupData: (state, actions: PayloadAction<UserSignupT>) => {
      state.userSignupData = actions.payload;
    },
    setUserSignupOtpResData: (
      state,
      actions: PayloadAction<UserSignupOtpResponseT>
    ) => {
      state.userSignupOtpResponse = actions.payload;
    },
  },
});

export const {
  setUserSignupResponse,
  setUserSignupData,
  setUserSignupOtpResData,
} = userSignupSliceReducers.actions;

export default userSignupSliceReducers;
