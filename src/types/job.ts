import type { UserProps } from "./user";

export interface SalaryProps {
  min: number;
  max: number;
  currency: string;
}

export interface JobProps {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  salary?: SalaryProps;
  posted_date: Date;
  deadline: Date;
  is_remote: boolean;
  employment_type: string;
  created_by: string;
  created_by_user: UserProps;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
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
  created_at: Date;
  updated_at: Date;
}

export interface ReactionProps {
  id: string;
  type: "dislike" | "like";
  job_id: string;
  job: JobProps;
  created_by: string;
  created_by_user: UserProps;
  created_at: Date;
  updated_at: Date;
}

export interface JobApplicationProps {
  id: string;
  job_id: string;
  job: JobProps;
  applicant_id: string;
  applicant: UserProps;
  resume: string;
  cover_letter?: string;
  status: string;
  submission_date: Date;
  last_updated: Date;
  notes?: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
}
