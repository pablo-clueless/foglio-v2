import type { TemplateThemeProps, UserProps } from "@/types";

export interface ResumeProps {
  fontFamily: string;
  ref: React.RefObject<HTMLDivElement | null>;
  theme: TemplateThemeProps;
  user: UserProps;
}
