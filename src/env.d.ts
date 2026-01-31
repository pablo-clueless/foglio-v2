export const requiredEnvs = [
  "NEXT_PUBLIC_APP_URL",
  "NEXT_PUBLIC_BASE_DOMAIN",
  "NEXT_PUBLIC_OG_IMAGE",
  "NEXT_PUBLIC_SERVER_URI",
  "NEXT_PUBLIC_WSS_URI",
  "NODE_ENV",
  "SERVER_URI",
  "WSS_URI",
] as const;

type RequiredEnvs = (typeof requiredEnvs)[number];

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Record<RequiredEnvs, string> {
      readonly NEXT_PUBLIC_APP_URL: string;
      readonly NEXT_PUBLIC_BASE_DOMAIN: string;
      readonly NEXT_PUBLIC_OG_IMAGE: string;
      readonly NEXT_PUBLIC_SERVER_URI: string;
      readonly NEXT_PUBLIC_WSS_URI: string;
      readonly NODE_ENV: "development" | "production" | "testing";
      readonly SERVER_URI: string;
      readonly WSS_URI: string;
    }
  }
}

export {};
