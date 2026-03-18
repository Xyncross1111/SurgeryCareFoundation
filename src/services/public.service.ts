import { apiClient } from "@/lib/api-client";
import type {
  BlogPost,
  PartnerHospital,
  BoardMember,
  AnnualReport,
  SiteStats,
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
    return apiClient.get<SiteStats>("/public/stats");
  },

  getBlogPosts() {
    return apiClient.get<BlogPost[]>("/public/blog");
  },

  getBlogPost(slug: string) {
    return apiClient.get<BlogPost>(`/public/blog/${slug}`);
  },
};
