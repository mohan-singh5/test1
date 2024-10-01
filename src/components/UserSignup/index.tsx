"use client";

import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import UserSignupForm from "./UserSignupForm";
import VerifyOtpForUser from "../VerifyOtpForUser";

const UserSignup = () => {
  const { userResponse } = useSelector((state: RootState) => state.usersignup);
  return <>{userResponse.status ? <VerifyOtpForUser /> : <UserSignupForm />}</>;
};

export default UserSignup;
