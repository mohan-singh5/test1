import React from "react";
import styled from "styled-components";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { RecordT } from "@/redux/features/professionals/professionalsType";
import Image from "next/image";

const ProfessionalCard = ({ professional }: { professional: RecordT }) => {
  const { company, name, user, employment_city } = professional;
  return (
    <Card>
      <div className="flex items-center gap-3 justify-between">
        <div className="flex items-center gap-3">
          {user?.profile_image ? (
            <div className="border border-gray-400 w-14 h-14 flex items-center justify-center rounded-full">
              <Image src={user.profile_image} alt="" width={40} height={40} />
            </div>
          ) : (
            <div className="w-14 h-14 rounded-full bg-gray-300"></div>
          )}

          <div className="flex flex-col gap-3">
            <div className="font-medium text-lg">
              {name} <span className="text-primary text-sm">({company})</span>
            </div>
            <div className="flex items-center text-sm gap-5 opacity-60">
              <div>Immigration Lawyer</div>
              <div>{employment_city}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 justify-between">
          <ViewProfileButton>View Profile</ViewProfileButton>
          <div className="flex items-center gap-1">
            <span>⭐</span>
            <span className="font-medium">4.5/5 Rating</span>
          </div>
        </div>
      </div>
      <hr className="my-3" />
      <div className="flex items-center gap-5 justify-between">
        <div className="flex items-center gap-3">
          <span className="text-primary">Visa Applications</span>
          <span className="text-primary">Legal Advice</span>
        </div>
        <div className="flex items-center gap-3 opacity-60">
          <FaPhoneAlt />
          <FaEnvelope />
        </div>
      </div>
    </Card>
  );
};

export default ProfessionalCard;

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--borderColor);
`;

const ViewProfileButton = styled.button`
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 8px 14px;
  cursor: pointer;
  font-size: 14px;
`;
