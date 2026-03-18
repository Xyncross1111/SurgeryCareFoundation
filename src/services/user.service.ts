import { apiClient } from "@/lib/api-client";
import type { User } from "@/types/auth";
import type { PaginatedData, PaginationParams } from "@/types/api";
import type { Donation, SavedCause } from "@/types/donation";

export const userService = {
  updateProfile(data: Partial<User>) {
    return apiClient.patch<User>("/users/me", data);
  },

  getDonations(params?: PaginationParams) {
    return apiClient.get<PaginatedData<Donation>>("/users/me/donations", {
      params: params as Record<string, string | number | boolean | undefined>,
    });
  },

  getSavedCauses() {
    return apiClient.get<SavedCause[]>("/users/me/saved-causes");
  },

  saveCause(campaignId: string) {
    return apiClient.post<SavedCause>("/users/me/saved-causes", { campaignId });
  },

  removeSavedCause(campaignId: string) {
    return apiClient.delete<void>(`/users/me/saved-causes/${campaignId}`);
  },
};
