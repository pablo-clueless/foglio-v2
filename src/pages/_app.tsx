import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { ErrorBoundary, ReduxProvider, SSRProvider } from "@/components/providers";
import { GlobalLoader } from "@/components/shared";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <SSRProvider>
        <ReduxProvider>
          <Component {...pageProps} />
          <GlobalLoader />
        </ReduxProvider>
      </SSRProvider>
    </ErrorBoundary>
  );
}
