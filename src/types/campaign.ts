export type CampaignStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "approved"
  | "active"
  | "paused"
  | "rejected"
  | "completed"
  | "closed";

export type UrgencyLevel = "critical" | "high" | "medium" | "low";

export interface Campaign {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  category: string;
  urgencyLevel: UrgencyLevel;
  status: CampaignStatus;
  creatorId: string;
  goalAmount: number;
  raisedAmount: number;
  currency: string;
  coverImageUrl: string | null;
  videoUrl: string | null;
  startDate: string | null;
  endDate: string | null;
  publishedAt: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
  creator?: { id: string; firstName: string; lastName: string };
  _count?: { donations: number };
}

export interface CampaignUpdate {
  id: string;
  campaignId: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface CampaignMilestone {
  id: string;
  campaignId: string;
  title: string;
  targetAmount: number;
  description?: string;
  isReached: boolean;
  reachedAt?: string;
}

export interface CreateCampaignRequest {
  title: string;
  summary: string;
  description?: string;
  category: string;
  urgencyLevel: UrgencyLevel;
  goalAmount: number;
  coverImageUrl?: string;
  videoUrl?: string;
  startDate?: string;
  endDate?: string;
}

export interface CampaignFilters {
  category?: string;
  status?: CampaignStatus;
  urgency?: UrgencyLevel;
  search?: string;
  page?: number;
  limit?: number;
  sort?: string;
  order?: "asc" | "desc";
}
