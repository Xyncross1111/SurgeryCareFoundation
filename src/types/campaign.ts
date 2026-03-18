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
  patientName: string;
  age: number;
  condition: string;
  category: string;
  description: string;
  detailedDescription?: string;
  hospitalName?: string;
  urgencyLevel: UrgencyLevel;
  status: CampaignStatus;
  creatorId: string;
  raised: number;
  goal: number;
  backers: number;
  image: string;
  images?: string[];
  documents?: string[];
  createdAt: string;
  updatedAt: string;
  approvedAt?: string;
  completedAt?: string;
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
  isReached: boolean;
  reachedAt?: string;
}

export interface CreateCampaignRequest {
  title: string;
  patientName: string;
  age: number;
  condition: string;
  category: string;
  description: string;
  detailedDescription?: string;
  hospitalName?: string;
  urgencyLevel: UrgencyLevel;
  goal: number;
  relationship: string;
  phone: string;
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
