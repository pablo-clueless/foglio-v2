import type { TypeNode } from "./app";

export interface UserProps extends TypeNode {
  name: string;
  email: string;
  phone?: string;
  headline?: string;
  location?: string;
  image?: string;
  summary: string;
  skills: string[];
  projects: ProjectProps[];
  experiences: ExperienceProps[];
  education: EducationProps[];
  certifications?: CertificationProps[];
  languages?: LanguageProps[];
}

export interface ProjectProps extends TypeNode {
  title: string;
  description: string;
  image?: string;
  url?: string;
  stack: string[];
  startDate?: Date;
  endDate?: Date;
  highlights?: string[];
}

export interface ExperienceProps extends TypeNode {
  companyName: string;
  location?: string;
  role: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  highlights?: string[];
  technologies?: string[];
}

export interface EducationProps extends TypeNode {
  institution: string;
  degree: string;
  field: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  gpa?: number;
  highlights?: string[];
}

export interface CertificationProps extends TypeNode {
  name: string;
  issuer: string;
  issueDate: Date;
  expiryDate?: Date;
  credentialId?: string;
  url?: string;
}

export interface LanguageProps {
  name: string;
  proficiency: "Basic" | "Intermediate" | "Advanced" | "Native";
}
