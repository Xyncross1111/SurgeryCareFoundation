import { apiClient } from "@/lib/api-client";
import type { PaginatedData } from "@/types/api";
import type {
  Campaign,
  CampaignUpdate,
  CreateCampaignRequest,
  CampaignFilters,
} from "@/types/campaign";

export const campaignService = {
  list(filters?: CampaignFilters) {
    return apiClient.get<PaginatedData<Campaign>>("/public/campaigns", {
      params: filters as Record<string, string | number | boolean | undefined>,
    });
  },

  getBySlug(slug: string) {
    return apiClient.get<Campaign>(`/public/campaigns/${slug}`);
  },

  getUpdates(slug: string) {
    return apiClient.get<CampaignUpdate[]>(`/public/campaigns/${slug}/updates`);
  },

  create(data: CreateCampaignRequest) {
    return apiClient.post<Campaign>("/campaigns", data);
  },

  getMyCampaigns() {
    return apiClient.get<Campaign[]>("/campaigns/me");
  },

  getById(id: string) {
    return apiClient.get<Campaign>(`/campaigns/${id}`);
  },

  update(id: string, data: Partial<CreateCampaignRequest>) {
    return apiClient.patch<Campaign>(`/campaigns/${id}`, data);
  },

  submit(id: string) {
    return apiClient.post<void>(`/campaigns/${id}/submit`);
  },

  getUploadUrl(id: string, data: { fileName: string; fileType: string }) {
    return apiClient.post<{ uploadUrl: string; fileKey: string }>(
      `/campaigns/${id}/documents/upload-url`,
      data,
    );
  },

  addUpdate(id: string, data: { title: string; content: string }) {
    return apiClient.post<CampaignUpdate>(`/campaigns/${id}/updates`, data);
  },

  requestWithdrawal(id: string, data: { amount: number; bankDetails: string }) {
    return apiClient.post<void>(`/campaigns/${id}/withdrawals`, data);
  },
};
