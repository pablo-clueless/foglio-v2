export type PortfolioStatus = "draft" | "published" | "archived";

export interface PortfolioThemeProps {
  primary_color?: string;
  secondary_color?: string;
  accent_color?: string;
  text_color?: string;
  background_color?: string;
  font_family?: string;
  font_size?: string;
}

export interface PortfolioSEO {
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  og_image?: string;
  canonical?: string;
}

export interface PortfolioSettingsProps {
  show_projects?: boolean;
  show_experiences?: boolean;
  show_education?: boolean;
  show_skills?: boolean;
  show_certifications?: boolean;
  show_contact?: boolean;
  show_social_links?: boolean;
  enable_analytics?: boolean;
  enable_comments?: boolean;
}

export interface PortfolioSectionProps {
  id: string;
  portfolio_id: string;
  title: string;
  type: string;
  content?: string;
  settings?: string;
  sort_order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface PortfolioProps {
  id: string;
  user_id: string;
  title: string;
  slug: string;
  tagline?: string;
  bio?: string;
  cover_image?: string;
  logo?: string;
  template: string;
  theme?: PortfolioThemeProps;
  custom_css?: string;
  status: PortfolioStatus;
  is_public: boolean;
  view_count?: number;
  sections?: PortfolioSectionProps[];
  seo?: PortfolioSEO;
  settings?: PortfolioSettingsProps;
  created_at: string;
  updated_at: string;
}
