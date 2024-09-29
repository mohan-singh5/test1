export type UserResponseT = {
  status: boolean;
  message: string;
  data: UserResponseDataT;
};

export type UserResponseDataT = {
  user_token: string;
  email: string;
  user_id: string;
  otp_token: string;
  limit: number;
};

export type UserSignupOtpResponseT = {
  user_data: UserSignupOtpDataT;
  token: string;
};

export type UserSignupOtpDataT = {
  first_name: string;
  last_name: string;
  email: string;
  unique_id: number;
  profile_image_url: string;
  status: string;
};
