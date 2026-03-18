export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  image: string;
  author?: string;
}

export interface PartnerHospital {
  id: string;
  name: string;
  city: string;
  specializations: string[];
  logo?: string;
}

export interface BoardMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
}

export interface AnnualReport {
  year: number;
  title: string;
  downloadUrl: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SiteStats {
  totalRaised: number;
  totalDonors: number;
  totalCampaigns: number;
  totalVolunteers: number;
}
