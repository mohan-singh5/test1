export interface UserSignupT {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
  gender: string;
  terms_condition: string;
}

export interface VeryOtpT {
  user_token: string;
  otp_token: string;
  email: string;
  otp: string;
}
