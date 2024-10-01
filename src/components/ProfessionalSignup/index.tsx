"use client";

import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import ProfessionalSignupForm from "./ProfessionalSignupForm";
import VerifyOtpForProfessional from "../VerifyOtpForProfessional";
import { ProfessionalSignupStepsE } from "@/redux/features/professionalSignup/professionalSignupTypes";

const ProfessionalSignup = () => {
  const { professionalResponse, steps } = useSelector(
    (state: RootState) => state.professionalSignup
  );
  return (
    <>
      {professionalResponse.status && steps === ProfessionalSignupStepsE.otp ? (
        <VerifyOtpForProfessional />
      ) : (
        <ProfessionalSignupForm />
      )}
    </>
  );
};

export default ProfessionalSignup;
