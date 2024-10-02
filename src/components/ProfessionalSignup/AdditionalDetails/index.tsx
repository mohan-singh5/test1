"use client";

import React, { useState } from "react";
import { BASE_URL } from "@/network";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { setProfessionalSignupSteps } from "@/redux/features/professionalSignup/professionalSignupSlice";
import {
  AdditionalDetailsT,
  ProfessionalSignupStepsE,
} from "@/redux/features/professionalSignup/professionalSignupTypes";
import axios from "axios";
import { FileUploader } from "react-drag-drop-files";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { setCookie } from "cookies-next";
import { ImSpinner2 } from "react-icons/im";

const AdditionalDetails = () => {
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
  } = useForm<AdditionalDetailsT>();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { companyDetails, userData } = useSelector(
    (state: RootState) => state.professionalSignup
  );

  const fileTypes = ["jpeg", "png", "jpg", "gif", "bmp", "svg", "webp", "pdf"];

  const handleFileChange = (file: File, field: keyof AdditionalDetailsT) => {
    setValue(field, file, { shouldValidate: true });
    clearErrors(field);
  };

  const saveCompany: SubmitHandler<AdditionalDetailsT> = async (
    AdditionalDetails
  ) => {
    const formData = new FormData();
    Object.entries(companyDetails).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    Object.entries(AdditionalDetails).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      }
    });
    formData.append("is_file_upload", "true");
    const url = `${BASE_URL}/api/professional/save-company`;
    try {
      setLoading(true);
      const res = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.status) {
        const expires = new Date();
        expires.setFullYear(expires.getFullYear() + 5);
        setCookie("authToken", userData.token, {
          expires,
        });
        router.push("/");
      } else {
        const errors = res.data.errors;
        // Object.keys(errors).forEach((field) => {
        //   setError(field as keyof AdditionalDetailsT, {
        //     type: "server",
        //     message: errors[field],
        //   });
        // });
      }
      setLoading(false);
    } catch (err) {
      console.error("error:", err);
      setLoading(false);
    }
  };

  return (
    <Root>
      <div className="grid grid-cols-2 gap-5 justify-between mt-12">
        <div>
          <label className="mb-2 inline-block text-lg font-medium">
            Incorporation Certification
          </label>
          <FileUploader
            classes="file-upload"
            handleChange={(file: File) =>
              handleFileChange(file, "incorporation_certification")
            }
            name="incorporation_certification"
            types={fileTypes}
          ></FileUploader>
          {errors.incorporation_certification && (
            <p className="text-red-500 text-xs mt-1">
              {errors.incorporation_certification.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 inline-block text-lg font-medium">
            License
          </label>
          <FileUploader
            classes="file-upload"
            handleChange={(file: File) =>
              handleFileChange(file, "license_file")
            }
            name="license_file"
            types={fileTypes}
          ></FileUploader>
          {errors.license_file && (
            <p className="text-red-500 text-xs mt-1">
              {errors.license_file.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 inline-block text-lg font-medium">Photo</label>
          <FileUploader
            classes="file-upload"
            handleChange={(file: File) =>
              handleFileChange(file, "proof_of_identity")
            }
            name="proof_of_identity"
            types={fileTypes}
          ></FileUploader>
          {errors.proof_of_identity && (
            <p className="text-red-500 text-xs mt-1">
              {errors.proof_of_identity.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between gap-5 mt-5">
        <button
          className="px-4 py-1.5 bg-primary text-white rounded-md"
          onClick={() =>
            dispatch(
              setProfessionalSignupSteps(
                ProfessionalSignupStepsE.companyDetails
              )
            )
          }
        >
          Back
        </button>

        <button
          type="submit"
          className={`w-36 h-10 flex items-center justify-center bg-primary text-white rounded-md ${
            loading ? "opacity-60 pointer-events-none" : ""
          }`}
          onClick={handleSubmit(saveCompany)}
        >
          {loading ? (
            <ImSpinner2 className="animate-spin text-2xl" />
          ) : (
            "Complete Profile"
          )}
        </button>
      </div>
    </Root>
  );
};

export default AdditionalDetails;

const Root = styled.div`
  .file-upload {
    height: 5rem;
    border: 2px dotted var(--borderColor);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    cursor: pointer;
  }
`;
