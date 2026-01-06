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
          href="https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&family=Figtree:ital,wght@0,300..900;1,300..900&family=IBM+Plex+Serif:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap"
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
