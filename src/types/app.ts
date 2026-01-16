import type { RemixiconComponentType } from "@remixicon/react";

export type Maybe<T> = T | null;

export type Nullable<T> = T | null | undefined;

export type MaybePromise<T> = T | PromiseLike<T>;

export type MaybePromiseOrNull<T> = MaybePromise<Nullable<T>>;

export interface HttpResponse<T> {
  data: T;
  message: string;
  success: boolean;
  timestamp: string;
}

export interface HttpError {
  data: {
    message: string;
    status: number;
    timestamp: string;
  };
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  limit: number;
  page: number;
  total_items: number;
  total_pages: number;
}

export interface PaginatedParams {
  page?: number;
  size?: number;
}

export interface TypeNode {
  id: string;
  created_at: Date;
  modified_at: Date;
}

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export interface FeaturesProps {
  icon: RemixiconComponentType;
  image: string;
  title: string;
  subtitle: string;
}

export interface TemplateThemeProps {
  id: string;
  name: string;
  colors: {
    surfaceColor: string;
    primaryColor: string;
    secondaryColor: string;
    textPrimary: string;
    textSecondary: string;
    borderColor: string;
  };
}

export interface ReviewUserProps {
  id: string;
  name: string;
  role: string;
  image: string;
}

export interface ReviewProps {
  id: string;
  rating: number; // 1–5
  comment: string;
  reviewer: ReviewUserProps;
  createdAt: Date | string;
}

export interface PricingProps {
  tier: string;
  price: number;
  currency: string;
  interval: string;
  description: string;
  features: string[];
  cta: string;
  link: string;
  popular: boolean;
}
