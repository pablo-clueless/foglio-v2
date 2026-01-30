import type { FeatureFlag } from "@/types/feature-flags";
import { createPersistMiddleware } from "./middleware";

export interface FeatureFlagsState {
  flags: Record<string, FeatureFlag>;
  userContext: {
    userId?: string;
    email?: string;
    role?: string;
    environment: "development" | "staging" | "production";
  };
  setUserContext: (context: Partial<FeatureFlagsState["userContext"]>) => void;
  initializeFlags: (flags: FeatureFlag[]) => void;
  updateFlag: (id: string, updates: Partial<FeatureFlag>) => void;
  isEnabled: (flagId: string) => boolean;
  getFlag: (flagId: string) => FeatureFlag | undefined;
  refreshFlags: () => Promise<void>;
}

const getEnvironment = (): "development" | "staging" | "production" => {
  if (typeof window === "undefined") return "production";

  const hostname = window.location.hostname;
  if (hostname === "localhost" || hostname === "127.0.0.1") return "development";
  if (hostname.includes("staging")) return "staging";
  return "production";
};

const hashString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

const isInRolloutPercentage = (userId: string, percentage: number): boolean => {
  const hash = hashString(userId);
  return hash % 100 < percentage;
};

export const useFeatureFlags = createPersistMiddleware<FeatureFlagsState>("", (set, get) => ({
  flags: {},
  userContext: {
    environment: getEnvironment(),
  },

  setUserContext: (context) =>
    set((state) => ({
      userContext: { ...state.userContext, ...context },
    })),

  initializeFlags: (flags) =>
    set({
      flags: flags.reduce(
        (acc, flag) => {
          acc[flag.id] = flag;
          return acc;
        },
        {} as Record<string, FeatureFlag>,
      ),
    }),

  updateFlag: (id, updates) =>
    set((state) => ({
      flags: {
        ...state.flags,
        [id]: { ...state.flags[id], ...updates },
      },
    })),

  getFlag: (flagId) => get().flags[flagId],

  isEnabled: (flagId) => {
    const { flags, userContext } = get();
    const flag = flags[flagId];

    if (!flag) return false;
    if (!flag.enabled) return false;

    if (flag.expiresAt && new Date(flag.expiresAt) < new Date()) {
      return false;
    }

    if (flag.environment && !flag.environment.includes(userContext.environment)) {
      return false;
    }

    if (flag.targetUsers && userContext.userId) {
      if (flag.targetUsers.includes(userContext.userId)) return true;
    }

    if (flag.targetRoles && userContext.role) {
      if (flag.targetRoles.includes(userContext.role)) return true;
    }

    if (flag.rolloutPercentage !== undefined && userContext.userId) {
      return isInRolloutPercentage(userContext.userId, flag.rolloutPercentage);
    }

    return true;
  },

  refreshFlags: async () => {
    try {
      const response = await fetch("/api/feature-flags");
      const data = await response.json();
      get().initializeFlags(data.flags);
    } catch (error) {
      console.error("Failed to refresh feature flags:", error);
    }
  },
}));

export const FeatureFlagProvider = ({
  flag,
  children,
  fallback = null,
}: {
  flag: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) => {
  const isEnabled = useFeatureFlags((state) => state.isEnabled(flag));

  return isEnabled ? children : fallback;
};

export const useFeature = (flagId: string): boolean => {
  return useFeatureFlags((state) => state.isEnabled(flagId));
};

export const initializeFeatureFlags = (flags: FeatureFlag[]) => {
  useFeatureFlags.getState().initializeFlags(flags);
};

export const DEFAULT_FLAGS: FeatureFlag[] = [
  {
    id: "new_signup",
    name: "New Signup",
    description: "Enable the user to create an account",
    enabled: true,
    environment: ["development", "staging"],
  },
  {
    id: "oauth_login",
    name: "OAuth Login",
    description: "Enable login with Google and Github",
    enabled: true,
    environment: ["development", "staging", "production"],
  },
  {
    id: "notifications",
    name: "Real-time Notifications",
    description: "Enable WebSocket notifications",
    enabled: true,
    environment: ["staging", "production"],
  },
  {
    id: "ai_assistant",
    name: "AI Assistant",
    description: "Enable AI-powered assistance features",
    enabled: true,
    rolloutPercentage: 10,
  },
  {
    id: "premium_features",
    name: "Premium Features",
    description: "Enable premium tier features",
    enabled: true,
    targetRoles: ["premium", "admin"],
  },
];
