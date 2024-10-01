import React from "react";
import AccountDetails from "./AccountDetails";
import styled from "styled-components";
import CompanyDetails from "./CompanyDetails";

const ProfessionalSignupForm = () => {
  return (
    <Root>
      <div className="mb-3">
        <h2 className="text-3xl font-semibold text-center">
          Create Your Account
        </h2>
        <p className="text-base text-center mt-1">
          Enter your details below to get started
        </p>
      </div>
      <FormWrapper>
        <div className="flex gap-5 justify-between">
          <div>
            <div>STEP 1</div>
            <div>Account Details</div>
          </div>
          <div>
            <div>STEP 2</div>
            <div>Company Details</div>
          </div>
          <div>
            <div>STEP 3</div>
            <div>Additional Details</div>
          </div>
        </div>
        {/* <AccountDetails /> */}
        <CompanyDetails />
      </FormWrapper>
    </Root>
  );
};

export default ProfessionalSignupForm;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #ededed;
  padding: 1rem;
`;
const FormWrapper = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 50rem;
`;
