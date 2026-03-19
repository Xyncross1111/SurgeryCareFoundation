import { apiClient } from "@/lib/api-client";
import type { User } from "@/types/auth";
import type { PaginatedData, PaginationParams } from "@/types/api";
import type { Donation } from "@/types/donation";

export const userService = {
  updateProfile(data: Partial<Pick<User, "firstName" | "lastName" | "phone" | "avatarUrl">>) {
    return apiClient.patch<User>("/users/me", data);
  },

  getDonations(params?: PaginationParams & { status?: string; campaignId?: string }) {
    return apiClient.get<PaginatedData<Donation>>("/donations/me", {
      params: params as Record<string, string | number | boolean | undefined>,
    });
  },
};
