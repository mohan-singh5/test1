import { createSlice } from "@reduxjs/toolkit";
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
  name: "uploadDesign",
  initialState,
  reducers: {
    setUserSignupResponse: (
      state,
      actions: {
        payload: UserResponseT;
        type: string;
      }
    ) => {
      state.userResponse = actions.payload;
    },
    setUserSignupData: (
      state,
      actions: {
        payload: UserSignupT;
        type: string;
      }
    ) => {
      state.userSignupData = actions.payload;
    },
    setUserSignupOtpResData: (
      state,
      actions: {
        payload: UserSignupOtpResponseT;
        type: string;
      }
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
