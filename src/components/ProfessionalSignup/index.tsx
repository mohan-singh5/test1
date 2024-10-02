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
  const isOtp =
    professionalResponse.status && steps === ProfessionalSignupStepsE.otp;
  return (
    <>
      <div className={`${isOtp ? "" : "hidden"}`}>
        <VerifyOtpForProfessional />
      </div>
      <div className={`${isOtp ? "hidden" : ""}`}>
        <ProfessionalSignupForm />
      </div>
    </>
  );
};

export default ProfessionalSignup;
