import React from "react";

import { Button } from "../ui/button";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null, hasError: false };
  }

  static getDerivedStateFromError(_error: Error): ErrorBoundaryState {
    return { error: _error, hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("Error caught by boundary:", error);
    console.error("Error info:", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="fixed top-0 left-0 grid h-screen w-screen place-items-center">
            <div
              role="alert"
              className="flex aspect-square w-[400px] flex-col items-center justify-center rounded-lg border border-neutral-300"
            >
              <h2 className="text-xl font-medium lg:text-2xl">Something went wrong</h2>
              <p className="text-sm text-neutral-500 lg:text-base">
                {this.state.error?.message || "Please try again later."}
              </p>
              <Button
                onClick={() => {
                  this.setState({ hasError: false });
                  window.location.reload();
                }}
              >
                Try again
              </Button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
