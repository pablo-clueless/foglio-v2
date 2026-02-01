import { notFound } from "next/navigation";
import { headers } from "next/headers";
import Image from "next/image";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getPortfolio(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.foglio.app";

  try {
    const response = await fetch(`${baseUrl}/portfolios/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.data;
  } catch {
    return null;
  }
}

export default async function PortfolioPage({ params }: PageProps) {
  const { slug } = await params;
  const headersList = await headers();
  const subdomain = headersList.get("x-subdomain");

  const portfolioSlug = subdomain || slug;
  const portfolio = await getPortfolio(portfolioSlug);

  if (!portfolio) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-4xl px-4 py-16">
        {portfolio.cover_image && (
          <div className="mb-8 h-48 w-full overflow-hidden rounded-lg">
            <Image
              alt={portfolio.title}
              className="h-full w-full object-cover"
              fill
              sizes="100%"
              src={portfolio.cover_image}
            />
          </div>
        )}
        <div className="mb-8 text-center">
          {portfolio.logo && (
            <div className="relative size-24">
              <Image
                alt={`${portfolio.title} logo`}
                className="mx-auto rounded-full object-cover"
                fill
                sizes="100%"
                src={portfolio.logo}
              />
            </div>
          )}
          <h1 className="mb-2 text-4xl font-bold">{portfolio.title}</h1>
          {portfolio.tagline && <p className="text-xl text-gray-400">{portfolio.tagline}</p>}
        </div>
        {portfolio.bio && (
          <div className="mb-12">
            <p className="text-lg leading-relaxed text-gray-300">{portfolio.bio}</p>
          </div>
        )}
        {portfolio.sections?.map(
          (section: { id: string; title: string; content?: string; is_visible: boolean }) =>
            section.is_visible && (
              <section key={section.id} className="mb-12">
                <h2 className="mb-4 text-2xl font-semibold">{section.title}</h2>
                {section.content && (
                  <div
                    className="prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                )}
              </section>
            ),
        )}
      </div>
    </main>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const portfolio = await getPortfolio(slug);

  if (!portfolio) {
    return {
      title: "Portfolio Not Found",
    };
  }

  return {
    title: portfolio.seo?.meta_title || portfolio.title,
    description: portfolio.seo?.meta_description || portfolio.tagline || portfolio.bio,
    keywords: portfolio.seo?.meta_keywords,
    openGraph: {
      title: portfolio.seo?.meta_title || portfolio.title,
      description: portfolio.seo?.meta_description || portfolio.tagline,
      images: portfolio.seo?.og_image ? [portfolio.seo.og_image] : portfolio.cover_image ? [portfolio.cover_image] : [],
    },
  };
}
