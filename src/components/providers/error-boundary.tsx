"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  resetOnPropsChange?: boolean;
}

interface ErrorBoundaryState {
  error: Error | null;
  hasError: boolean;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    error: null,
    hasError: false,
    errorInfo: null,
  };

  static defaultProps = {
    resetOnPropsChange: false,
  };

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { error, hasError: true };
  }

  static getDerivedStateFromProps(props: ErrorBoundaryProps, state: ErrorBoundaryState) {
    if (props.resetOnPropsChange && state.hasError) {
      return { error: null, hasError: false, errorInfo: null };
    }
    return null;
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("Error caught by boundary:", error);
    console.error("Error info:", errorInfo);
    console.error("Component stack:", errorInfo.componentStack);

    this.setState({ errorInfo });
    this.props.onError?.(error, errorInfo);

    // Log to error reporting service in production (e.g., Sentry, LogRocket)
    if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
      // Example: Send to error tracking service
      // Sentry.captureException(error, {
      //   contexts: { react: { componentStack: errorInfo.componentStack } }
      // });
    }
  }

  resetErrorBoundary = (): void => {
    this.setState({ error: null, hasError: false, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return <ErrorFallback error={this.state.error} reset={this.resetErrorBoundary} />;
    }

    return this.props.children;
  }
}

// Separate ErrorFallback component for cleaner code and to use hooks
function ErrorFallback({ error, reset }: { error: Error | null; reset: () => void }) {
  const router = useRouter();
  const [showDetails, setShowDetails] = React.useState(false);

  const handleReset = () => {
    reset();
    router.refresh();
  };

  // Detect error types
  const isServerError =
    error?.message?.includes("fetch") ||
    error?.message?.includes("ECONNREFUSED") ||
    error?.message?.includes("NetworkError");
  const is404 = error?.message?.includes("404") || error?.message?.includes("Not Found");
  const isAuthError = error?.message?.includes("Unauthorized") || error?.message?.includes("Authentication");

  return (
    <div className="fixed top-0 left-0 z-50 grid h-screen w-screen place-items-center bg-black backdrop-blur-sm">
      <div
        role="alert"
        className="flex w-full max-w-lg flex-col items-center justify-center gap-4 rounded-lg border border-neutral-300 bg-black p-8 shadow-2xl"
      >
        {/* Error Icon */}
        <div className="rounded-full bg-red-100 p-3">
          <svg
            className="h-12 w-12 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="text-center text-2xl font-semibold text-white">
          {is404
            ? "Page Not Found"
            : isServerError
              ? "Server Error"
              : isAuthError
                ? "Authentication Error"
                : "Something Went Wrong"}
        </h2>
        <p className="text-center text-sm text-gray-400">
          {is404
            ? "The page you're looking for doesn't exist or has been moved."
            : isServerError
              ? "We're having trouble connecting to the server. Please check your connection and try again."
              : isAuthError
                ? "Your session has expired. Please sign in again."
                : "An unexpected error occurred. Our team has been notified and is working on a fix."}
        </p>

        {/* Error Message (Collapsible) */}
        {error?.message && (
          <div className="w-full">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex w-full items-center justify-between rounded-md bg-gray-950 px-4 py-2 text-left text-sm text-gray-500 transition-colors hover:bg-gray-800"
            >
              <span className="font-medium">{showDetails ? "Hide" : "Show"} error details</span>
              <svg
                className={`h-5 w-5 transition-transform ${showDetails ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showDetails && (
              <div className="mt-2 max-h-32 overflow-y-auto rounded-md bg-gray-500 p-3">
                <code className="block text-xs wrap-break-word whitespace-pre-wrap text-red-600">{error.message}</code>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-4 flex w-full gap-3">
          <button
            className="flex-1 rounded-md bg-gray-200 px-4 py-2.5 font-medium text-gray-900 transition-colors hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none"
            onClick={() => router.push("/")}
          >
            Go Home
          </button>
          <button
            className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 flex-1 rounded-md px-4 py-2.5 font-medium text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
            onClick={handleReset}
          >
            Try Again
          </button>
        </div>

        {/* Additional Help */}
        <p className="mt-2 text-xs text-gray-500">If this problem persists, please contact support.</p>
      </div>
    </div>
  );
}

export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps: Omit<ErrorBoundaryProps, "children"> = {},
): React.FC<P> => {
  const WithErrorBoundary: React.FC<P> = (props) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WithErrorBoundary.displayName = `WithErrorBoundary(${Component.displayName || Component.name || "Component"})`;
  return WithErrorBoundary;
};
