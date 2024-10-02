"use client";

import React, { useEffect, useState } from "react";
import styles from "./accountDetails.module.css";
import { BASE_URL, headers } from "@/network";
import { ProfessionalSignupT } from "@/types";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { ImSpinner2 } from "react-icons/im";
import Link from "next/link";
import InputField from "@/components/InputField";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  setProfessionalSignupData,
  setProfessionalSignupResponse,
  setProfessionalSignupSteps,
} from "@/redux/features/professionalSignup/professionalSignupSlice";
import { ProfessionalSignupStepsE } from "@/redux/features/professionalSignup/professionalSignupTypes";

const AccountDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm<ProfessionalSignupT>();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { userData } = useSelector(
    (state: RootState) => state.professionalSignup
  );

  const professionalSignup: SubmitHandler<ProfessionalSignupT> = async (
    professionalData
  ) => {
    const url = `${BASE_URL}/api/auth/professional-signup`;
    try {
      setLoading(true);
      const res = await axios.post(url, professionalData, headers);
      // console.log("Signup successful:", res.data);
      if (res.data.status) {
        dispatch(setProfessionalSignupResponse(res.data));
        dispatch(setProfessionalSignupData(professionalData));
        dispatch(setProfessionalSignupSteps(ProfessionalSignupStepsE.otp));
      } else {
        const errors = res.data.errors;
        Object.keys(errors).forEach((field) => {
          setError(field as keyof ProfessionalSignupT, {
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

  useEffect(() => {
    register("country_code", { required: "Country code is required" });
    register("phone_no", { required: "Phone number is required" });
  }, [register]);

  const handleNextStep = () => {
    dispatch(
      setProfessionalSignupSteps(ProfessionalSignupStepsE.companyDetails)
    );
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(professionalSignup)}
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

        <div className={styles.formRow}>
          <div className="flex-1">
            <label className={styles.label}>Phone</label>
            <PhoneInput
              country={"in"}
              inputStyle={{
                width: "100%",
                height: "40px",
                border: "1px solid var(--borderColor)",
                borderRadius: "10px",
              }}
              onChange={(value, country: any) => {
                setValue("phone_no", value.slice(country.dialCode.length), {
                  shouldValidate: true,
                });
                setValue("country_code", `+${country.dialCode}`, {
                  shouldValidate: true,
                });
              }}
            />
            {errors.phone_no && (
              <p className="text-red-500 text-xs mt-1">
                {errors.phone_no.message}
              </p>
            )}
          </div>
          <div className="flex-1">
            <h6 className="font-medium mt-1 mb-2.5">Gender:</h6>
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

      <div className="flex items-center justify-end gap-5 mt-5">
        <button
          className={`w-24 h-10 flex items-center justify-center bg-primary text-white rounded-md ${
            userData.token ? "" : "pointer-events-none opacity-60"
          }`}
          onClick={handleNextStep}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default AccountDetails;
