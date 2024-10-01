"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProfessionalCard from "./ProfessionalCard";
import { BASE_URL, headers } from "@/network";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { setAllProfessionals } from "@/redux/features/professionals/professionalsSlice";
import SkeletonCard from "./SkeletonCard";
import DropDownValues from "../DropDownValues";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const AllProfessionals = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { professionals } = useSelector(
    (state: RootState) => state.professionals
  );

  const getAllProfessionals = async () => {
    const url = `${BASE_URL}/api/professional-list`;
    try {
      setLoading(true);
      const res = await axios.post(url, null, headers);
      dispatch(setAllProfessionals(res?.data?.data));
      setLoading(false);
    } catch (err) {
      console.error("error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProfessionals();
  }, []);

  const Logout = () => {
    deleteCookie("authToken");
    router.push("/login");
  };

  return (
    <Root className="">
      <div className="flex items-center gap-5 justify-between">
        <h1 className="text-3xl font-semibold">All Professionals</h1>
        <button
          className="px-4 py-1.5 bg-primary text-white rounded-md"
          onClick={Logout}
        >
          Logout
        </button>
      </div>
      <div className="mb-8 mt-5 flex items-center gap-5 justify-between">
        <div className="opacity-60">
          Showing {professionals.total_records || 0} Results
        </div>
        <div className="">
          <label htmlFor="" className="mr-2 opacity-60">
            Sort By:
          </label>
          <select className="outline-none border-none bg-transparent">
            <option value="">Most Relevent</option>
          </select>
        </div>
      </div>
      <div className="flex gap-5 justify-between">
        <div className="flex-[0.3] max-w-xs flex flex-col gap-5">
          <DropDownValues />
        </div>
        <div className="flex-[0.7] flex flex-col gap-5">
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : professionals?.record?.map((i) => {
                return <ProfessionalCard key={i.unique_id} professional={i} />;
              })}
        </div>
      </div>
    </Root>
  );
};

export default AllProfessionals;

const Root = styled.div`
  background-color: #bbbbbb18;
  padding: 3rem;
`;
