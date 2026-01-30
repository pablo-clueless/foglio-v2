export interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  rolloutPercentage?: number;
  targetUsers?: string[];
  targetRoles?: string[];
  environment?: ("development" | "staging" | "production")[];
  expiresAt?: Date;
}
