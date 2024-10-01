"use client";

import React, { useEffect, useState } from "react";
import styles from "./companyDetails.module.css";
import { BASE_URL, headers } from "@/network";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { ImSpinner2 } from "react-icons/im";
import InputField from "@/components/InputField";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  setProfessionalSignupResponse,
  setProfessionalSignupSteps,
} from "@/redux/features/professionalSignup/professionalSignupSlice";
import {
  CompanyDetailsT,
  ProfessionalSignupStepsE,
} from "@/redux/features/professionalSignup/professionalSignupTypes";
import axios from "axios";
import TextAreaField from "@/components/TextAreaField";

const CompanyDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm<CompanyDetailsT>();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const professionalSignup: SubmitHandler<CompanyDetailsT> = async (
    professionalData
  ) => {
    console.log(professionalData, "hello");
    return;
    const url = `${BASE_URL}/api/auth/professional-signup`;
    try {
      setLoading(true);
      const res = await axios.post(url, professionalData, headers);
      if (res.data.status) {
        dispatch(setProfessionalSignupResponse(res.data));
        dispatch(
          setProfessionalSignupSteps(ProfessionalSignupStepsE.additionalDetails)
        );
      } else {
        const errors = res.data.errors;
        Object.keys(errors).forEach((field) => {
          setError(field as keyof CompanyDetailsT, {
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

  return (
    <div className={styles.formWrapper}>
      <div className={styles.formRow}>
        <InputField
          label="Company Name"
          placeholder="Enter company name"
          type="text"
          register={register("company_name", {
            required: "Company name is required",
          })}
          error={errors.company_name?.message}
        />
        <InputField
          label="Company Email"
          placeholder="Enter company email"
          type="email"
          register={register("company_email", {
            required: "Company email is required",
          })}
          error={errors.company_email?.message}
        />
      </div>

      <div className={styles.formRow}>
        <InputField
          label="License No"
          placeholder="Enter License No"
          type="text"
          register={register("license_no", {
            required: "License No is required",
          })}
          error={errors.license_no?.message}
        />
        <InputField
          label="Owner Name"
          placeholder="Enter Owner Name"
          type="text"
          register={register("owner_name", {
            required: "Owner Name is required",
          })}
          error={errors.owner_name?.message}
        />
      </div>

      <div className={styles.formRow}>
        <InputField
          label="Country"
          placeholder="Enter Country"
          type="text"
          register={register("company_country", {
            required: "Country is required",
          })}
          error={errors.company_country?.message}
        />
        <InputField
          label="State"
          placeholder="Enter State"
          type="text"
          register={register("company_state", {
            required: "State is required",
          })}
          error={errors.company_state?.message}
        />
      </div>

      <div className={styles.formRow}>
        <InputField
          label="City"
          placeholder="Enter City"
          type="text"
          register={register("company_city", {
            required: "City is required",
          })}
          error={errors.company_city?.message}
        />
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
      </div>

      <div className={styles.formRow}>
        <InputField
          label="Employment Start Date"
          placeholder="dd-mm-yyyy"
          type="date"
          register={register("employment_start_date", {
            required: "Employment Start Date is required",
          })}
          error={errors.employment_start_date?.message}
        />
        <InputField
          label="Pincode"
          placeholder="Enter Pincode"
          type="text"
          register={register("pin_code", {
            required: "Pincode is required",
          })}
          error={errors.pin_code?.message}
        />
      </div>

      <div className={styles.formRow}>
        <TextAreaField
          label="Address Line 1"
          placeholder="Enter your Address"
          register={register("address_line_1", {
            required: "Address Line 1 is required",
          })}
          error={errors.address_line_1?.message}
        />
        <TextAreaField
          label="Address Line 2"
          placeholder="Enter your Address"
          register={register("address_line_2")}
          error={errors.address_line_2?.message}
        />
      </div>

      <div className={styles.formRow}>
        <InputField
          label="Company Type"
          placeholder="Enter Company Type"
          type="text"
          register={register("company_type", {
            required: "Company Type is required",
          })}
          error={errors.company_type?.message}
        />
        <InputField
          label="Company Formation Type"
          placeholder="Enter Company Formation Type"
          type="text"
          register={register("company_formation_type", {
            required: "Company Formation Type is required",
          })}
          error={errors.company_formation_type?.message}
        />
      </div>

      <div className={styles.formRow}>
        <div className="flex-1">
          <h6 className="font-medium mb-1">Entitled to Practice:</h6>
          <div className="flex items-center gap-3">
            <label>
              <input
                type="radio"
                {...register("entitled_to_practice", {
                  required: "This field is required",
                })}
                value="yes"
              />{" "}
              Yes
            </label>
            <label>
              <input
                type="radio"
                {...register("entitled_to_practice", {
                  required: "This field is required",
                })}
                value="no"
              />{" "}
              No
            </label>
          </div>
          {errors.entitled_to_practice && (
            <p className="text-red-500 text-xs">
              {errors.entitled_to_practice.message}
            </p>
          )}
        </div>
      </div>
      <button onClick={handleSubmit(professionalSignup)}>hello</button>
    </div>
  );
};

export default CompanyDetails;
