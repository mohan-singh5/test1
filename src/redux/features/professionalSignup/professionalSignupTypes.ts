export type ProfessionalResponseT = {
  status: boolean;
  message: string;
  data: ProfessioanlResponseDataT;
};

export type ProfessioanlResponseDataT = {
  user_token: string;
  email: string;
  user_id: string;
  otp_token: string;
};

export enum ProfessionalSignupStepsE {
  accountDetails = "Account Details",
  companyDetails = "Company Details",
  additionalDetails = "Additional Details",
  otp = "Otp",
}

export type CompanyDetailsT = {
  company_name: string;
  country_code: string;
  phone_no: string;
  company_type: string;
  company_country: string;
  company_state: string;
  company_city: string;
  address_line_1: string;
  address_line_2: string;
  pin_code: string;
  company_email: string;
  employment_start_date: string;
  owner_name: string;
  entitled_to_practice: string;
  company_formation_type: string;
  license_no: string;
  user_id: string;
};

export type AdditionalDetailsT = {
  incorporation_certification: File;
  license_file: File;
  proof_of_identity: File;
  is_file_upload: string;
};

export type userDataT = {
  user_data: DataT;
  token: string;
};

export type DataT = {
  first_name: string;
  last_name: string;
  email: string;
  unique_id: number;
  profile_image_url: string;
  status: string;
};
