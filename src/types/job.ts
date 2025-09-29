export interface JobProps {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  postedDate: Date;
  deadline?: Date;
  isRemote: boolean;
  employmentType: "full-time" | "part-time" | "contract" | "internship";
}

export interface JobSearchProps {
  keywords?: string[];
  location?: string;
  employmentType?: JobProps["employmentType"][];
  salaryMin?: number;
  salaryMax?: number;
  isRemote?: boolean;
  sortBy?: "relevance" | "date" | "salary";
  page?: number;
  limit?: number;
}

export interface JobApplicationProps {
  id: string;
  jobId: string;
  applicantId: string;
  resume: string;
  coverLetter?: string;
  status: "draft" | "submitted" | "reviewed" | "interviewed" | "rejected" | "accepted";
  submissionDate: Date;
  lastUpdated: Date;
  notes?: string;
}
