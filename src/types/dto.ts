export interface UpdateUserDto {
  name?: string;
  username?: string;
  phone?: string;
  headline?: string;
  location?: string;
  summary?: string;
  skills?: string[];
  projects?: ProjectDto[];
  experiences?: ExperienceDto[];
  education?: EducationDto[];
  certifications?: CertificationDto[];
  languages?: LanguageDto[];
  company?: CompanyDto;
  social_media?: {
    linkedin?: string;
    gitHub?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
    youtube?: string;
    blog?: string;
  };
  domain?: {
    subdomain?: string;
    custom_domain?: string;
  };
}

export interface VerifyDomainDto {
  domain: string;
}

export interface DomainVerificationResponse {
  verified: boolean;
  dns_records: {
    type: string;
    name: string;
    value: string;
    status: "pending" | "verified";
  }[];
}

export interface CreatePortfolioDto {
  title: string;
  slug: string;
  tagline: string;
  bio: string;
  template: string;
  theme: {
    primary_color: string;
    secondary_color: string;
    accent_color: string;
    text_color: string;
    background_color: string;
    font_family: string;
    font_size: string;
  };
  seo: {
    meta_title: string;
    meta_description: string;
    meta_keywords: string;
    og_image: string;
  };
  settings: {
    show_projects: boolean;
    show_experiences: boolean;
    show_education: boolean;
    show_skills: boolean;
    show_certifications: boolean;
    show_contact: boolean;
    show_social_links: boolean;
    enable_analytics: boolean;
    enable_comments: boolean;
  };
}

export interface UpdatePortfolioDto {
  title?: string;
  slug?: string;
  tagline?: string;
  bio?: string;
  cover_image?: string;
  logo?: string;
  template?: string;
  theme: {
    primary_color?: string;
    secondary_color?: string;
    accent_color?: string;
    text_color?: string;
    background_color?: string;
    font_family?: string;
    font_size?: string;
  };
  custom_css?: string;
  status?: string;
  is_public: boolean;
  seo?: {
    meta_title?: string;
    meta_description?: string;
    meta_keywords?: string;
    og_image?: string;
  };
  settings?: {
    show_projects?: boolean;
    show_experiences?: boolean;
    show_education?: boolean;
    show_skills?: boolean;
    show_certifications?: boolean;
    show_contact?: boolean;
    show_social_links?: boolean;
    enable_analytics?: boolean;
    enable_comments?: boolean;
  };
}

export interface CreatePortfolioSectionDto {
  title: string;
  type: string;
  content: string;
  settings: string;
  sort_order: number;
  is_visible: boolean;
  id?: string;
}

export interface CompanyDto {
  name: string;
  industry?: string;
  size?: string;
  website?: string;
  logo?: string;
  description?: string;
  location?: string;
}

export interface ProjectDto {
  title: string;
  description: string;
  image?: string;
  url?: string;
  stack?: string[];
  start_date?: string;
  end_date?: string;
  highlights?: string;
}

export interface ExperienceDto {
  company_name: string;
  location?: string;
  role: string;
  description: string;
  start_date: string;
  end_date?: string;
  highlights?: string;
  technologies?: string[];
}

export interface EducationDto {
  institution: string;
  degree: string;
  field: string;
  location?: string;
  start_date: string;
  end_date?: string;
  gpa?: number;
  highlights?: string;
}

export interface CertificationDto {
  name: string;
  issuer: string;
  issue_date: string;
  expiry_date?: string;
  credential_id?: string;
  url?: string;
}

export interface LanguageDto {
  name: string;
  proficiency: string;
}

export interface CreateJobDto {
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  salary?: number;
  deadline?: string;
  is_remote: boolean;
  employment_type: string;
}

export interface UpdateJobDto {
  title: string;
  description: string;
  requirements: string[];
  salary?: number;
  deadline?: string;
  is_remote: boolean;
  employment_type: string;
}

export interface ApplyToJobDto {
  userId: string;
  jobId: string;
  payload: JobApplicationDto;
}

export interface JobApplicationDto {
  resume: string;
  coverLetter?: string;
  status: string;
  submissionDate: string;
  lastUpdated: string;
  notes?: string;
}

export interface JobSearch {
  keywords?: string[];
  location?: string;
  employment_type?: string[];
  salary_min?: number;
  salary_max?: number;
  is_remote?: boolean;
  sortBy?: string;
  page?: number;
  limit?: number;
}
