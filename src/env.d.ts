export const requiredEnvs = [
  "NEXT_PUBLIC_APP_URL",
  "NEXT_PUBLIC_OG_IMAGE",
  "NEXT_PUBLIC_SERVER_URI",
  "SERVER_URI",
] as const;

type RequiredEnvs = (typeof requiredEnvs)[number];

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Record<RequiredEnvs, string> {
      readonly NEXT_PUBLIC_APP_URL: string;
      readonly NEXT_PUBLIC_OG_IMAGE: string;
      readonly NEXT_PUBLIC_SERVER_URI: string;
      readonly SERVER_URI: string;
    }
  }
}

export {};
