"use client";

import Error from "next/error";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body>
        <div className="flex min-h-screen items-center justify-center bg-black px-4">
          <div className="w-full max-w-md rounded-lg border border-gray-200 bg-black p-8 text-center shadow-lg">
            {/* Error Icon */}
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="mb-2 text-2xl font-bold text-gray-900">Application Error</h2>
            <p className="mb-6 text-gray-400">
              A critical error occurred. Please reload the page or contact support if the issue persists.
            </p>
            {error.digest && (
              <p className="mb-4 rounded bg-gray-100 px-3 py-2 font-mono text-xs text-gray-400">
                Error ID: {error.digest}
              </p>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => (window.location.href = "/")}
                className="flex-1 rounded-md bg-gray-200 px-4 py-2 font-medium text-gray-900 transition-colors hover:bg-gray-300"
              >
                Go Home
              </button>
              <button
                onClick={() => reset()}
                className="bg-primary-600 hover:bg-primary-700 flex-1 rounded-md px-4 py-2 font-medium text-white transition-colors"
              >
                Try Again
              </button>
            </div>

            <div className="mt-6 rounded-md border border-yellow-200 bg-yellow-50 p-3">
              <p className="text-xs text-yellow-800">
                <strong>Critical Error:</strong> This error affected the root of the application. If reloading
                doesn&apos;t help, please clear your browser cache.
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
