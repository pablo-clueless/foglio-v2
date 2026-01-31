import Link from "next/link";

export default function PortfolioNotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black px-4 text-white">
      <h1 className="mb-4 text-6xl font-bold">404</h1>
      <h2 className="mb-2 text-2xl font-semibold">Portfolio Not Found</h2>
      <p className="mb-8 text-gray-400">
        The portfolio you&apos;re looking for doesn&apos;t exist or has been removed.
      </p>
      <Link
        href="https://foglio.app"
        className="bg-primary-400 hover:bg-primary-500 rounded px-6 py-3 font-medium transition-colors"
      >
        Go to Foglio
      </Link>
    </main>
  );
}
