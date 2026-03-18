import { apiClient } from "@/lib/api-client";
import type {
  AuthTokens,
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  User,
} from "@/types/auth";

export const authService = {
  login(data: LoginRequest) {
    return apiClient.post<AuthTokens>("/auth/login", data);
  },

  register(data: RegisterRequest) {
    return apiClient.post<AuthTokens>("/auth/register", data);
  },

  logout() {
    return apiClient.post<void>("/auth/logout");
  },

  refreshToken() {
    return apiClient.post<AuthTokens>("/auth/refresh");
  },

  getMe() {
    return apiClient.get<{ user: User; accessToken?: string }>("/auth/me");
  },

  forgotPassword(data: ForgotPasswordRequest) {
    return apiClient.post<void>("/auth/forgot-password", data);
  },

  resetPassword(data: ResetPasswordRequest) {
    return apiClient.post<void>("/auth/reset-password", data);
  },

  verifyEmail(token: string) {
    return apiClient.post<void>("/auth/verify-email", { token });
  },

  changePassword(data: ChangePasswordRequest) {
    return apiClient.post<void>("/auth/change-password", data);
  },
};
