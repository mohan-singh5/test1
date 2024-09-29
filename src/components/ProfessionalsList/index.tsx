"use client";

import React from "react";
import AllProfessionals from "./AllProfessionals";
import styled from "styled-components";

const ProfessionalsList = () => {
  return (
    <Root>
      <AllProfessionals />
    </Root>
  );
};

export default ProfessionalsList;

const Root = styled.div`
  border: 1px solid var(--borderColor);
  max-width: 80rem;
  margin: 1rem auto;
  border-radius: 4px;
`;
