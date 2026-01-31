import type { PortfolioProps } from "./portfolio";

export type { PortfolioProps };

export type ProviderType = "EMAIL" | "GITHUB" | "GOOGLE";

export type DomainStatus = "pending" | "active" | "failed" | "expired";

export interface DomainProps {
  subdomain?: string;
  custom_domain?: string;
  custom_domain_status?: DomainStatus;
  custom_domain_verified_at?: string;
  dns_records?: {
    type: string;
    name: string;
    value: string;
    status: "pending" | "verified";
  }[];
}

export interface SubdomainAvailabilityProps {
  available: boolean;
  subdomain: string;
}

export interface UserProps {
  created_at: string;
  email: string;
  id: string;
  headline: string;
  is_two_factor_enabled: boolean;
  two_factor_secret: string;
  two_factor_backup_codes: string[];
  is_admin: boolean;
  is_premium: boolean;
  is_recruiter: boolean;
  name: string;
  provider: ProviderType;
  role: string; //job role e.g Frontend Developer
  summary: string;
  updated_at: string;
  username: string;
  verified: boolean;
  certifications?: CertificationProps[];
  company?: CompanyProps;
  company_id?: string;
  deleted_at?: string;
  domain?: DomainProps;
  portfolio?: PortfolioProps;
  education?: EducationProps[];
  experiences?: ExperienceProps[];
  image?: string;
  languages?: LanguageProps[];
  location?: string;
  phone?: string;
  projects?: ProjectProps[];
  provider_id?: string;
  skills?: string[];
  social_media?: {
    linkedin?: string;
    gitHub?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
    medium?: string;
    youtube?: string;
    blog?: string;
  };
  otp?: string;
}

export interface CompanyProps {
  id: string;
  name: string;
  industry?: string;
  size?: string;
  website?: string;
  logo?: string;
  description?: string;
  location?: string;
  users?: UserProps[];
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface ProjectProps {
  id: string;
  user_id: string;
  title: string;
  description: string;
  image?: string;
  url?: string;
  stack?: string[];
  start_date?: string;
  end_date?: string;
  highlights?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface ExperienceProps {
  id: string;
  user_id: string;
  company_name: string;
  location?: string;
  role: string;
  description: string;
  start_date: string;
  end_date?: string;
  highlights?: string;
  technologies?: string[];
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface EducationProps {
  id: string;
  user_id: string;
  institution: string;
  degree: string;
  field: string;
  location?: string;
  start_date: string;
  end_date?: string;
  gpa?: number;
  highlights?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface CertificationProps {
  id: string;
  user_id: string;
  name: string;
  issuer: string;
  issue_date: string;
  expiry_date?: string;
  credential_id?: string;
  url?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface LanguageProps {
  id: string;
  user_id: string;
  name: string;
  proficiency: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}
