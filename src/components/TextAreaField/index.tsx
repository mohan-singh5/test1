"use client";

import React from "react";
import styled from "styled-components";

interface TextAreaFieldProps {
  label: string;
  placeholder: string;
  register: any;
  error?: string;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  placeholder,
  register,
  error,
}) => {
  return (
    <div className="flex-1">
      <Label>{label}</Label>
      <TextAreaWrapper>
        <textarea
          className={`textarea ${error ? "border-red-500" : ""}`}
          placeholder={placeholder}
          {...register}
        />
      </TextAreaWrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

export default TextAreaField;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #333;
  font-weight: 500;
`;

const TextAreaWrapper = styled.div`
  position: relative;

  .textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid var(--borderColor);
    border-radius: 10px;
    height: 80px;
    outline: none;
    resize: none;
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

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 12px;
  margin-top: 5px;
`;
