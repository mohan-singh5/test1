import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfessionalSignupT, UserSignupT } from "@/types";
import {
  AdditionalDetailsT,
  CompanyDetailsT,
  ProfessionalResponseT,
  ProfessionalSignupStepsE,
  userDataT,
} from "./professionalSignupTypes";

export interface professionalSignupState {
  steps: ProfessionalSignupStepsE;
  professionalResponse: ProfessionalResponseT;
  professionalSignupData: UserSignupT;
  companyDetails: CompanyDetailsT;
  AdditionalDetails: AdditionalDetailsT;
  userData: userDataT;
}

const initialState: professionalSignupState = {
  steps: ProfessionalSignupStepsE.accountDetails,
  professionalResponse: {} as ProfessionalResponseT,
  professionalSignupData: {} as UserSignupT,
  companyDetails: {} as CompanyDetailsT,
  AdditionalDetails: {} as AdditionalDetailsT,
  userData: {} as userDataT,
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
    setComapanyDetails: (state, actions: PayloadAction<CompanyDetailsT>) => {
      state.companyDetails = actions.payload;
    },
    setAdditionalDetails: (
      state,
      actions: PayloadAction<AdditionalDetailsT>
    ) => {
      state.AdditionalDetails = actions.payload;
    },
    setUserData: (state, actions: PayloadAction<userDataT>) => {
      state.userData = actions.payload;
    },
  },
});

export const {
  setProfessionalSignupResponse,
  setProfessionalSignupData,
  setProfessionalSignupSteps,
  setComapanyDetails,
  setAdditionalDetails,
  setUserData,
} = ProfessionalSignupSliceReducers.actions;

export default ProfessionalSignupSliceReducers;
