"use client";

import React, { useEffect, useState } from "react";
import SingleDropDownList from "./SingleDropDownList";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { setDropdownList } from "@/redux/features/professionals/professionalsSlice";
import DropdownSkeletonLoader from "./DropdownSkeletonLoader";
import { headers } from "@/network";

const Dropdown_List = [
  "company_types",
  "report_subjects",
  "status",
  "years_of_experiences",
  "services",
  "entitled_to_practise",
  "languages",
  "license_types",
  "locations",
  "quick_tips_off_category",
];

const DropDownValues = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { dropdowns } = useSelector((state: RootState) => state.professionals);

  const getAllDropdownValues = async () => {
    const dropdownValues = Dropdown_List.join(",");
    const payload = {
      values: dropdownValues,
    };
    const url = `https://trustvisory.fastzone.ca/api/fetch-dropdown-values`;
    try {
      setLoading(true);
      const res = await axios.post(url, payload, headers);
      // console.log("Signup successful:", res.data);
      dispatch(setDropdownList(res?.data?.data));
      setLoading(false);
    } catch (err) {
      console.error("error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllDropdownValues();
  }, []);

  return (
    <div className="flex flex-col gap-3 max-h-[80vh] overflow-auto">
      {loading ? (
        <DropdownSkeletonLoader count={7} />
      ) : (
        Object.entries(dropdowns).map(([key, value]) => (
          <div key={key} className="">
            <h6 className="text-primary mb-1 font-medium">{key}</h6>
            <SingleDropDownList options={value} key={key} />
          </div>
        ))
      )}
    </div>
  );
};

export default DropDownValues;
