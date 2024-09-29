"use client";

import React, { useState } from "react";
import styles from "./userSignup.module.css";
import { BASE_URL, headers } from "@/network";
import { UserSignupT } from "@/types";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import InputField from "../InputField";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { ImSpinner2 } from "react-icons/im";
import {
  setUserSignupData,
  setUserSignupResponse,
} from "@/redux/features/userSignup/userSignupSlice";
import Link from "next/link";

const UserSignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<UserSignupT>();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const userSignup: SubmitHandler<UserSignupT> = async (userData) => {
    const url = `${BASE_URL}/api/auth/user-signup`;
    try {
      setLoading(true);
      const res = await axios.post(url, userData, headers);
      console.log("Signup successful:", res.data);
      if (res.data.status) {
        dispatch(setUserSignupResponse(res.data));
        dispatch(setUserSignupData(userData));
      } else {
        const errors = res.data.errors;
        Object.keys(errors).forEach((field) => {
          setError(field as keyof UserSignupT, {
            type: "server",
            message: errors[field],
          });
        });
      }
      setLoading(false);
    } catch (err) {
      console.error("error:", err);
      setLoading(false);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupForm}>
        <h2 className="text-3xl font-semibold text-center">
          Create Your Account
        </h2>
        <p className="text-lg text-center mt-1">
          Enter your details below to get started
        </p>

        <form
          onSubmit={handleSubmit(userSignup)}
          className={styles.formWrapper}
        >
          <div className={styles.formRow}>
            <InputField
              label="First Name"
              placeholder="Enter First Name"
              type="text"
              register={register("first_name", {
                required: "First Name is required",
              })}
              error={errors.first_name?.message}
            />
            <InputField
              label="Last Name"
              placeholder="Enter Last Name"
              type="text"
              register={register("last_name", {
                required: "Last Name is required",
              })}
              error={errors.last_name?.message}
            />
          </div>

          <div className={styles.formRow}>
            <InputField
              label="Username"
              placeholder="Enter User Name"
              type="text"
              register={register("username", {
                required: "Username is required",
              })}
              error={errors.username?.message}
            />
            <InputField
              label="Email Address"
              placeholder="Enter your Email Address"
              type="email"
              register={register("email", {
                required: "Email is required",
              })}
              error={errors.email?.message}
            />
          </div>

          <div className={styles.formRow}>
            <InputField
              label="Password"
              placeholder="Enter password"
              type="password"
              register={register("password", {
                required: "Password is required",
              })}
              error={errors.password?.message}
            />
            <InputField
              label="Confirm Password"
              placeholder="Confirm password"
              type="password"
              register={register("password_confirmation", {
                required: "Confirm Password is required",
              })}
              error={errors.password_confirmation?.message}
            />
          </div>

          <div className="">
            <h6 className="font-medium mb-1">Gender:</h6>
            <div className="flex items-center gap-3">
              <label>
                <input
                  type="radio"
                  {...register("gender", { required: "Gender is required" })}
                  value="male"
                />{" "}
                Male
              </label>
              <label>
                <input
                  type="radio"
                  {...register("gender", { required: "Gender is required" })}
                  value="female"
                />{" "}
                Female
              </label>
            </div>
            {errors.gender && (
              <p className="text-red-500 text-xs">{errors.gender.message}</p>
            )}
          </div>

          <div>
            <label>
              <input
                type="checkbox"
                {...register("terms_condition", {
                  required: "You must accept the terms and conditions",
                })}
                className="mr-2"
              />
              By submitting this form, you accept our{" "}
              <span className="text-primary">Terms of Service</span> and{" "}
              <span className="text-primary">Privacy Policy</span>
            </label>
            {errors.terms_condition && (
              <p className="text-red-500 text-xs">
                {errors.terms_condition.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={`${styles.signupButton} ${
              loading ? "opacity-60 pointer-events-none" : ""
            }`}
          >
            {loading ? (
              <ImSpinner2 className="animate-spin text-2xl" />
            ) : (
              "Signup"
            )}
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <Link href="/login" className="text-primary">
            Sign in now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserSignupForm;
