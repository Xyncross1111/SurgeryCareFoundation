export type UserRole =
  | "visitor"
  | "donor"
  | "campaign_creator"
  | "moderator"
  | "finance_manager"
  | "super_admin";

export interface UserAddress {
  street: string;
  city: string;
  district: string;
  postalCode: string;
  state: string;
  country: string;
  nationality: string;
}

export interface UserKyc {
  idProofType: string;
  idProofNumber: string;
  isVerified: boolean;
}

export interface UserFinancial {
  bankName: string;
  accountNumberLast4: string;
  panCardNumber: string;
  beneficiaryDetails: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  alternatePhone?: string;
  dateOfBirth?: string;
  preferredLanguage?: string;
  gender?: string;
  bloodGroup?: string;
  occupation?: string;
  organizationName?: string;
  avatar?: string;
  role: UserRole;
  isVerified: boolean;
  createdAt: string;
  profileCompletion: number;
  address?: UserAddress;
  kyc?: UserKyc;
  financial?: UserFinancial;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}
