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
