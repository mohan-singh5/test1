"use client";

import { BASE_URL, headers } from "@/network";
import { AppDispatch, RootState } from "@/redux/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import PinInput from "react-pin-input";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import {
  setProfessionalSignupSteps,
  setUserData,
} from "@/redux/features/professionalSignup/professionalSignupSlice";
import { ProfessionalSignupStepsE } from "@/redux/features/professionalSignup/professionalSignupTypes";

const VerifyOtpForProfessional = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const { professionalResponse } = useSelector(
    (state: RootState) => state.professionalSignup
  );
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { professionalSignupData } = useSelector(
    (state: RootState) => state.professionalSignup
  );

  const professionalSignupWithOtp = async () => {
    setLoading(true);
    setError("");
    if (otp.length !== 6) {
      setLoading(false);
      setError("Please enter a 6-digit OTP.");
      return;
    }
    const formData = {
      ...professionalResponse.data,
      otp,
    };

    const url = `${BASE_URL}/api/auth/verify/signup-otp`;
    try {
      const res = await axios.post(url, formData, headers);
      // console.log("Signup successful with OTP:", res.data);
      dispatch(
        setProfessionalSignupSteps(ProfessionalSignupStepsE.companyDetails)
      );
      dispatch(setUserData(res?.data?.data));
      setLoading(false);
    } catch (err: any) {
      setError(err?.response?.data.message);
      console.error("error:", err);
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    setResendLoading(true);
    const url = `${BASE_URL}/api/auth/professional-signup`;
    try {
      const res = await axios.post(url, professionalSignupData, headers);
      if (res.data.status) {
        toast.success("OTP has been sent successfully!");
      } else {
        toast.error("Something Went Wrong! Try again");
      }
      setResendLoading(false);
    } catch (err) {
      console.error("error:", err);
      setResendLoading(false);
      toast.error("Something Went Wrong! Try again");
    }
  };

  return (
    <Container>
      <Card>
        <Title>Verify Email</Title>
        <Subtitle>Please enter OTP received in your email</Subtitle>
        <PinInput
          length={6}
          focus
          type="numeric"
          onComplete={(value) => {
            setOtp(value);
            setError("");
          }}
          onChange={(value) => {
            setOtp(value);
            setError("");
          }}
          inputStyle={{
            borderColor: "lightgray",
            borderWidth: "1px",
            borderRadius: "8px",
            width: "3rem",
            height: "3rem",
            margin: "0.5rem",
            fontSize: "1.5rem",
            backgroundColor: "#F7FAFC",
          }}
          inputFocusStyle={{
            borderColor: "#4299E1",
            outline: "none",
          }}
        />
        <div
          className={`resend ${
            resendLoading ? "opacity-60 pointer-events-none" : ""
          }`}
          onClick={resendOtp}
        >
          Resend Code
        </div>

        {error && <ErrorText>{error}</ErrorText>}

        <VerifyButton
          onClick={professionalSignupWithOtp}
          className={`${loading ? "opacity-60 pointer-events-none" : ""}`}
        >
          {loading ? (
            <ImSpinner2 className="animate-spin text-2xl" />
          ) : (
            "Verify"
          )}
        </VerifyButton>
      </Card>
      <ToastContainer />
    </Container>
  );
};

export default VerifyOtpForProfessional;

// Styled Components
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #ededed;
  .resend {
    color: #1d4ed8;
    margin-top: 0.75rem;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 0.875rem;
    text-align: end;
  }
`;

const Card = styled.div`
  background-color: white;
  padding: 2.5rem;
  border-radius: 0.5rem;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  width: 40rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #718096;
  margin-bottom: 1.5rem;
`;

const VerifyButton = styled.button`
  background-color: #1d4ed8;
  &:hover {
    background-color: #1e3a8a;
  }
  color: white;
  font-weight: bold;
  /* padding: 0.5rem; */
  height: 2.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  margin-top: 1rem;
  width: 100%;
  border: none;
  cursor: pointer;
`;

const ErrorText = styled.p`
  color: #f56565;
  margin-top: 0.5rem;
  font-size: 14px;
`;
