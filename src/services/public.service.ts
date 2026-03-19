import { apiClient } from "@/lib/api-client";
import type {
  PartnerHospital,
  BoardMember,
  AnnualReport,
} from "@/types/content";

export const publicService = {
  getPartnerHospitals() {
    return apiClient.get<PartnerHospital[]>("/public/trust/partner-hospitals");
  },

  getBoardMembers() {
    return apiClient.get<BoardMember[]>("/public/trust/board-members");
  },

  getAnnualReports() {
    return apiClient.get<AnnualReport[]>("/public/reports/annual");
  },

  getContent(slug: string) {
    return apiClient.get<{ content: string }>(`/public/content/${slug}`);
  },

  getStats() {
    return apiClient.get<{ totalRaised: number; totalDonors: number; totalCampaigns: number }>("/public/stats");
  },
};
