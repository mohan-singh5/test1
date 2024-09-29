"use client";

import React, { InputHTMLAttributes, useState } from "react";
import styled from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputFieldProps {
  label: string;
  placeholder: string;
  type: "text" | "email" | "password" | "tel";
  register: any;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  type = "text",
  register,
  error,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const isPasswordType = type === "password";

  return (
    <div className="flex-1">
      <Label>{label}</Label>
      <InputWrapper>
        <input
          className={`input ${error ? "border-red-500" : ""}`}
          type={isPasswordType && passwordVisible ? "text" : type}
          placeholder={placeholder}
          {...register}
        />
        {isPasswordType && (
          <VisibilityToggle onClick={togglePasswordVisibility}>
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </VisibilityToggle>
        )}
      </InputWrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

export default InputField;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #333;
  font-weight: 500;
`;

const InputWrapper = styled.div`
  position: relative;

  .input {
    width: 100%;
    padding: 8px;
    border: 1px solid var(--borderColor);
    border-radius: 10px;
    padding-right: 40px;
    outline: none;
    transition: border-color 0.2s ease;
    &::placeholder {
      font-size: 14px;
      color: #aaa;
    }
    &:focus {
      border-color: var(--primary);
    }
  }
`;

const VisibilityToggle = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #888;

  &:hover {
    color: #333;
  }
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 12px;
  margin-top: 5px;
`;
