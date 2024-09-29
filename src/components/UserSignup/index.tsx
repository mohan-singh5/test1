"use client";

import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import VerifyOtp from "../VerifyOtp";
import UserSignupForm from "./UserSignupForm";

const UserSignup = () => {
  const { userResponse } = useSelector((state: RootState) => state.usersignup);
  return <>{userResponse.status ? <VerifyOtp /> : <UserSignupForm />}</>;
};

export default UserSignup;
