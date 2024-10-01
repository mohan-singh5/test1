import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfessionalSignupT, UserSignupT } from "@/types";
import {
  ProfessionalResponseT,
  ProfessionalSignupStepsE,
  // UserSignupOtpResponseT,
} from "./professionalSignupTypes";

export interface professionalSignupState {
  steps: ProfessionalSignupStepsE;
  professionalResponse: ProfessionalResponseT;
  professionalSignupData: UserSignupT;
  // userSignupOtpResponse: UserSignupOtpResponseT;
}

const initialState: professionalSignupState = {
  steps: ProfessionalSignupStepsE.accountDetails,
  professionalResponse: {} as ProfessionalResponseT,
  professionalSignupData: {} as UserSignupT,
  // userSignupOtpResponse: {} as UserSignupOtpResponseT,
};

const ProfessionalSignupSliceReducers = createSlice({
  name: "professionalSignup",
  initialState,
  reducers: {
    setProfessionalSignupResponse: (
      state,
      actions: PayloadAction<ProfessionalResponseT>
    ) => {
      state.professionalResponse = actions.payload;
    },
    setProfessionalSignupData: (
      state,
      actions: PayloadAction<ProfessionalSignupT>
    ) => {
      state.professionalSignupData = actions.payload;
    },
    setProfessionalSignupSteps: (
      state,
      actions: PayloadAction<ProfessionalSignupStepsE>
    ) => {
      state.steps = actions.payload;
    },
    // setUserSignupOtpResData: (
    //   state,
    //   actions: PayloadAction<UserSignupOtpResponseT>
    // ) => {
    //   state.userSignupOtpResponse = actions.payload;
    // },
  },
});

export const {
  setProfessionalSignupResponse,
  setProfessionalSignupData,
  setProfessionalSignupSteps,
  // setUserSignupOtpResData,
} = ProfessionalSignupSliceReducers.actions;

export default ProfessionalSignupSliceReducers;
