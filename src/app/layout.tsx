import type { Metadata } from "next";
import "./globals.css";
import {
  Bricolage_Grotesque,
  Figtree,
  Fira_Code,
  Geist,
  Inter,
  JetBrains_Mono,
  Nunito,
  Space_Grotesk,
} from "next/font/google";

import { ErrorBoundary, ReduxProvider } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib";

export const metadata: Metadata = {
  title: "Foglio",
  description: "The next generation customer care agent",
};

const bricolage_grotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage-grotesque",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

const fira_code = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrains_mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={cn(
          "anti-aliased",
          bricolage_grotesque.variable,
          figtree.variable,
          fira_code.variable,
          geist.variable,
          inter.variable,
          jetbrains_mono.variable,
          nunito.variable,
          space_grotesk.variable,
        )}
      >
        <ErrorBoundary>
          <ReduxProvider>
            {children}
            <Toaster position="top-right" richColors toastOptions={{ duration: 5000 }} />
          </ReduxProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
