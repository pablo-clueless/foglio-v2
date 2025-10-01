export interface UserProps {
  id: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  provider: "local" | "google" | "github";
  provider_id?: string;
  phone?: string;
  headline?: string;
  location?: string;
  image?: string;
  summary: string;
  company_id?: string;
  skills?: SkillProps[];
  projects?: ProjectProps[];
  experiences?: ExperienceProps[];
  education?: EducationProps[];
  certifications?: CertificationProps[];
  languages?: LanguageProps[];
  is_recruiter: boolean;
  is_premium: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
  verified: boolean;
  otp: string;
  company?: CompanyProps;
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
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export interface ProjectProps {
  id: string;
  user_id: string;
  title: string;
  description: string;
  image?: string;
  url?: string;
  stack?: ProjectStackProps[];
  start_date?: Date;
  end_date?: Date;
  highlights?: ProjectHighlightProps[];
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export interface ExperienceProps {
  id: string;
  user_id: string;
  company_name: string;
  location?: string;
  role: string;
  description: string;
  start_date: Date;
  end_date?: Date;
  highlights?: ExperienceHighlightProps[];
  technologies?: ExperienceTechProps[];
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export interface EducationProps {
  id: string;
  user_id: string;
  institution: string;
  degree: string;
  field: string;
  location?: string;
  start_date: Date;
  end_date?: Date;
  gpa?: number;
  highlights?: EducationHighlightProps[];
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export interface CertificationProps {
  id: string;
  user_id: string;
  name: string;
  issuer: string;
  issue_date: Date;
  expiry_date?: Date;
  credential_id?: string;
  url?: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export interface LanguageProps {
  id: string;
  user_id: string;
  name: string;
  proficiency: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export interface SkillProps {
  id: string;
  user_id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export interface ProjectStackProps {
  id: string;
  project_id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export interface ProjectHighlightProps {
  id: string;
  project_id: string;
  text: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export interface ExperienceHighlightProps {
  id: string;
  experience_id: string;
  text: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export interface ExperienceTechProps {
  id: string;
  experience_id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}

export interface EducationHighlightProps {
  id: string;
  education_id: string;
  text: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}
