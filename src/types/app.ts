import type { Icon } from "@phosphor-icons/react";

export type Maybe<T> = T | null;

export type Nullable<T> = T | null | undefined;

export type MaybePromise<T> = T | PromiseLike<T>;

export type MaybePromiseOrNull<T> = MaybePromise<Nullable<T>>;

export interface HttpResponse<T> {
  data: T;
  message: string;
  status: number;
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
  totalElements: number;
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

export interface FeaturesProps {
  icon: Icon;
  title: string;
  subtitle: string;
}

export interface TemplateThemeProps {
  id: string;
  name: string;
  colors: {
    background: string;
    surface: string;
    primary: string;
    secondary: string;
    text: string;
    textSecondary: string;
    border: string;
  };
}

export interface ReviewProps {
  comment: string;
  user: {
    name: string;
    role: string;
    image: string;
  };
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
