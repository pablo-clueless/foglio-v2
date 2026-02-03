import type { CompanyProps, UserProps } from "./user";

export type EmploymentType = "FULL_TIME" | "PART_TIME" | "CONTRACT" | "TEMPORARY" | "INTERNSHIP";

export interface SalaryProps {
  min: number;
  max: number;
  currency: string;
}

export interface JobProps {
  id: string;
  title: string;
  company_id: string;
  company: CompanyProps;
  location: string;
  description: string;
  requirements: string[];
  salary: SalaryProps;
  posted_date: string;
  deadline: string;
  is_remote: boolean;
  employment_type: EmploymentType;
  created_by: UserProps;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  applications: JobApplicationProps[];
  comments: CommentProps[];
  reactions: ReactionProps[];
}

export interface CommentProps {
  id: string;
  content: string;
  job_id: string;
  job: JobProps;
  created_by: string;
  created_by_user: UserProps;
  created_at: string;
  updated_at: string;
}

export interface ReactionProps {
  id: string;
  type: "dislike" | "like";
  job_id: string;
  job: JobProps;
  created_by: string;
  created_by_user: UserProps;
  created_at: string;
  updated_at: string;
}

export interface JobApplicationProps {
  id: string;
  job_id: string;
  applicant_id: string;
  resume: string;
  cover_letter?: string;
  status: string;
  submission_date: string;
  last_updated: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  notes?: string;
}
