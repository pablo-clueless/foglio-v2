import type { Metadata } from "next";
import "./globals.css";
import {
  Bricolage_Grotesque,
  Courier_Prime,
  Figtree,
  Fira_Code,
  Geist,
  IBM_Plex_Serif,
  Inter,
  JetBrains_Mono,
  Montserrat,
  Nunito,
  Space_Grotesk,
} from "next/font/google";

import { ErrorBoundary, ReduxProvider, WebSocketProvider } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib";

export const metadata: Metadata = {
  title: "Foglio",
  description: "The next generation portfolio builder",
  creator: "Samson Okunola",
  authors: [{ name: "Samson Okunola", url: "https://opensause.vercel.app" }],
  twitter: {
    card: "summary_large_image",
    title: "Foglio",
    description: "The next generation portfolio builder",
    creator: "@pablo_clueless",
    images: ["https://res.cloudinary.com/pabloclueless/image/upload/v1769641447/1_lxdshb.png"],
  },
  openGraph: {
    title: "Foglio",
    description: "The next generation portfolio builder",
    url: "https://foglio-v2.vercel.app",
    siteName: "Foglio",
    images: [
      {
        url: "https://res.cloudinary.com/pabloclueless/image/upload/v1769641447/1_lxdshb.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: [
    { rel: "icon", url: "/meta/favicon.ico" },
    { rel: "apple-touch-icon", url: "/meta/apple-touch-icon.png" },
    { rel: "favicon-16x16", url: "/meta/favicon-16x16.png" },
    { rel: "favicon-32x32", url: "/meta/favicon-32x32.png" },
    { rel: "192x192", url: "/meta/192x192.png" },
    { rel: "512x512", url: "/meta/512x512.png" },
  ],
};

const bricolage_grotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage-grotesque",
});

const courier_prime = Courier_Prime({
  subsets: ["latin"],
  variable: "--font-courier-prime",
  weight: "400",
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

const ibm_plex_serif = IBM_Plex_Serif({
  subsets: ["latin"],
  variable: "--font-ibm-plex-serif",
  weight: "400",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrains_mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
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
          courier_prime,
          figtree.variable,
          fira_code.variable,
          geist.variable,
          ibm_plex_serif.variable,
          inter.variable,
          jetbrains_mono.variable,
          montserrat.variable,
          nunito.variable,
          space_grotesk.variable,
        )}
      >
        <ErrorBoundary>
          <ReduxProvider>
            <WebSocketProvider autoConnect>
              {children}
              <Toaster position="top-right" richColors toastOptions={{ duration: 5000 }} />
            </WebSocketProvider>
          </ReduxProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
