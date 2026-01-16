import type { Metadata } from "next";
import "./globals.css";

import { ErrorBoundary, ReduxProvider } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Foglio",
  description: "The next generation customer care agent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Figtree:ital,wght@0,300..900;1,300..900&family=Fira+Code:wght@300..700&family=Geist:wght@100..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Space+Grotesk:wght@300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`anti-aliased`}>
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
