// ======== All Professionals types ===========

export type ProfessionalsT = {
  records: RecordT[];
  record: RecordT[];
  last_page: number;
  current_page: number;
  total_records: number;
};

export type RecordT = {
  id: number;
  unique_id: number;
  view_profile_url: null | string;
  college_id: string;
  name: string;
  slug: string;
  company: string;
  company_type: string;
  entitled_to_practise: EntitledToPractiseT | null;
  entitled_to_practis_college_id: null | string;
  suspension_revocation_history: null | string;
  employment_company: null | string;
  employment_startdate: Date | EmploymentStartdateEnum;
  employment_country: null | string;
  employment_state: string;
  employment_city: string;
  employment_email: string;
  employment_phone: EmploymentPhone | null;
  agentsinfo: null | string;
  license_historyclass: null | string;
  license_historystartdate: null | string;
  license_historyexpiry_date: null | string;
  license_history_status: null | string;
  type: null | string;
  professional_website_detail: null;
  is_linked: number;
  company_formation_type: null | string;
  address_line_1: null | string;
  address_line_2: null | string;
  pin_code: null | string;
  claim_profile: null;
  professional_address_detail: null;
  created_at: Date;
  updated_at: Date;
  added_by: string;
  assigned_to: string;
  category: null;
  user: User;
  user_details: UserDetails | null;
  professional_services: ProfessionalService[];
  locations: any[];
  professional_other_details: ProfessionalOtherDetail[];
};

export enum EmploymentPhone {
  The119876543210 = "11-9876543210",
  The917983298392 = "91-7983298392",
  The918894652270 = "+91-8894652270",
  The9301234566789 = "+93-01234566789",
}

export enum EmploymentStartdateEnum {
  The09122019 = "09/12/2019",
  The22022022 = "22-02-2022",
}

export enum EntitledToPractiseT {
  No = "No",
  Yes = "yes",
}

export type ProfessionalOtherDetail = {
  unique_id: number;
  meta_key: string;
  meta_value: string;
  created_at: Date;
  updated_at: Date;
};

export type ProfessionalService = {
  unique_id: number;
  parent_service_id: number;
  service_id: number;
  created_at: Date;
  updated_at: Date;
  immigration_services: ImmigrationServices;
};

export type ImmigrationServices = {
  unique_id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
};

export type User = {
  unique_id: number;
  first_name: FirstName;
  last_name: string;
  profile_image: string;
  created_at: Date;
  updated_at: Date;
};

export enum FirstName {
  Alisha = "Alisha",
  Developer = "developer",
  Mital = "Mital",
  Orli = "Orli",
}

export type UserDetails = {
  company_logo: string;
};

// ============= dropdown values types =============

export type DropdownValuesT = {
  company_types: CompanyType[];
  report_subjects: ReportSubject[];
  status: EntitledToPractise[];
  years_of_experiences: EntitledToPractise[];
  services: Language[];
  entitled_to_practise: EntitledToPractise[];
  languages: Language[];
  license_types: Language[];
  locations: Location[];
  quick_tips_off_category: EntitledToPractise[];
};

export type CompanyType = {
  unique_id: number;
  name: string;
  added_by: string;
  user_added: string;
  created_at: string;
  updated_at: string;
};

export type EntitledToPractise = {
  label: string;
  value: string;
};

export type Language = {
  unique_id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
};

export type Location = {
  name: string;
};

export type ReportSubject = {
  unique_id: number;
  name: string;
  added_by: number;
  user_added: string;
  created_at: Date;
  updated_at: Date;
};
