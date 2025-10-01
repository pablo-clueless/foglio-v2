export interface UpdateUserDto {
  username?: string;
  phone?: string;
  headline?: string;
  location?: string;
  summary?: string;
  skills?: any[];
  projects?: any[];
  experiences?: any[];
  education?: any[];
  certifications?: any[];
  languages?: any[];
}

export interface CreateJobDto {
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  salary?: any;
  deadline?: Date;
  is_remote: boolean;
  employment_type: string;
}

export interface UpdateJobDto {
  title: string;
  description: string;
  requirements: string[];
  salary?: any;
  deadline?: Date;
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
  submissionDate: Date;
  lastUpdated: Date;
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
