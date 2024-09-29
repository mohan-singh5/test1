"use client";

import React from "react";

type Option = {
  unique_id?: number;
  label?: string;
  value?: string;
  name?: string;
};

type Props = {
  options: Option[];
};

const SingleDropDownList: React.FC<Props> = ({ options }) => {
  return (
    <div className="flex flex-col gap-1">
      {options.map((option: Option, index: number) => (
        <div key={option.unique_id}>
          <input type="checkbox" id={`checkbox-${index}`} />
          <label className="ml-2" htmlFor={`checkbox-${index}`}>
            {option.name || option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default SingleDropDownList;
