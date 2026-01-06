"use client";

import { RiAiAgentLine, RiFlashlightLine, RiPaletteLine, RiRocketLine, RiSettings2Line } from "@remixicon/react";

import type { FeaturesProps, PricingProps } from "@/types";

export const FEATURES: FeaturesProps[] = [
  {
    icon: RiFlashlightLine,
    image: "/assets/isocons/abc-4.svg",
    title: "Build ATS friendly, keyword rich resume",
    subtitle:
      "Craft a perfectly optimized resume that sails through Applicant Tracking Systems with ease. Our intelligent builder automatically injects industry-specific keywords, formats your content to meet recruiter expectations, and ensures every section is parsed correctly so your application lands in front of human eyes instead of disappearing into the digital void. From semantic keyword clustering to whitespace normalization, we handle the microscopic details that triple your interview callback rate.",
  },
  {
    icon: RiAiAgentLine,
    image: "/assets/isocons/credit-score-11.svg",
    title: "Get scored by AI-powered tools",
    subtitle:
      "Receive an in-depth, line-by-line critique from our proprietary ensemble of large-language-model evaluators trained on millions of successful hires. The engine benchmarks your phrasing, quantifies your impact statements, predicts recruiter sentiment, and assigns a dynamic 0-100 score that updates in real time as you refine each bullet. Color-coded heat-maps highlight weak spots, while personalized suggestions teach you the persuasive vocabulary that turns mundane duties into measurable achievements that recruiters can’t ignore.",
  },
  {
    icon: RiPaletteLine,
    image: "/assets/isocons/stack-star-7.svg",
    title: "Easy Customization",
    subtitle:
      "Personalize your portfolio with our intuitive drag-and-drop interface and pre-built templates. Mix and match over 200 professionally designed content blocks—hero banners, timeline carousels, skill radars, project galleries, testimonial sliders—without ever touching a line of code. Fine-tune typography, spacing, color palettes, scroll animations, hover effects, and dark-mode toggles down to the pixel. Every change syncs instantly across desktop, tablet, and mobile previews, ensuring your brand feels cohesive everywhere.",
  },
  {
    icon: RiRocketLine,
    image: "/assets/isocons/deploy-code-upload-9.svg",
    title: "Instant Deploy",
    subtitle:
      "Publish your portfolio instantly with one click and share it with the world. Behind the scenes we provision a global CDN, generate SSL certificates, compress assets, lazy-load images, prefetch critical CSS, and submit your URL to search-engine indices before you can finish your coffee. Receive a secure HTTPS link, customizable QR code, and optional custom domain in under ten seconds. Roll back to any previous version with a single hover, or password-protect drafts while you gather feedback from mentors.",
  },
  {
    icon: RiSettings2Line,
    image: "/assets/isocons/rule-settings-8.svg",
    title: "Advanced Features",
    subtitle:
      "Access powerful tools like analytics, SEO optimization, and custom domains to enhance your portfolio. Track visitor geography, traffic sources, scroll depth, click heat-maps, and download events through a GDPR-compliant dashboard. Auto-generate JSON-LD schema, Open-Graph tags, XML sitemaps, and accessibility statements to climb search rankings. Connect your own domain, set up e-mail capture forms, inject Google Tag Manager, or white-label the entire platform for client hand-offs—no plugins required.",
  },
];

export const HOW_IT_WORKS = [
  {
    step: 1,
    image: "/assets/isocons/download-1.svg",
    title: "Import Your Story",
    description:
      "Drag-and-drop an existing résumé or let our smart form guide you through a 60-second setup—AI auto-fills the blanks and surfaces hidden skills you forgot to mention.",
  },
  {
    step: 2,
    image: "/assets/isocons/sync-2.svg",
    title: "Polish With AI",
    description:
      "Watch our engine rewrite bullets into recruiter magnets, rank every line for impact, and suggest quantified wins. Approve changes in real time until your score hits 100.",
  },
  {
    step: 3,
    image: "/assets/isocons/stack-star-7.svg",
    title: "Style It Your Way",
    description:
      "Pick from 50+ ATS-approved templates, then fine-tune palettes, fonts, section order, and micro-animations. Dark mode, print-ready margins, and mobile breakpoints adjust automatically.",
  },
  {
    step: 4,
    image: "/assets/isocons/publish-3.svg",
    title: "Publish & Track",
    description:
      "Export a pixel-perfect PDF, generate a secure share link, or launch a personal site with instant indexing. Built-in analytics reveal who opened it, when, and what they clicked—so you can follow up while you’re still top of mind.",
  },
];

export const PRICING_PLANS: PricingProps[] = [
  {
    tier: "Starter",
    price: 0,
    currency: "$",
    interval: "month",
    description: "Perfect for trying out the basics",
    features: ["1 published portfolio", "Basic templates", "FOG branding"],
    cta: "Get Started",
    link: "/signup",
    popular: false,
  },
  {
    tier: "Pro",
    price: 9,
    currency: "$",
    interval: "month",
    description: "For professionals ready to grow",
    features: [
      "Unlimited portfolios",
      "All premium templates",
      "Custom domain",
      "Advanced analytics",
      "Remove FOG branding",
    ],
    cta: "Upgrade to Pro",
    link: "/",
    popular: true,
  },
  {
    tier: "Enterprise",
    price: 29,
    currency: "$",
    interval: "month",
    description: "Built for teams and agencies",
    features: ["Everything in Pro", "Team collaboration", "White-label options", "Priority support", "API access"],
    cta: "Contact Sales",
    link: "/",
    popular: false,
  },
];

export const FREQUENTLY_ASKED_QUESTIONS = [
  {
    question: "What is Foglio?",
    answer:
      "Foglio is a fast, no-code portfolio builder that lets you create and publish a professional online portfolio in minutes.",
  },
  {
    question: "Do I need coding skills to use Foglio?",
    answer:
      "No coding is required. Our drag-and-drop editor and pre-built templates make it easy for anyone to build a portfolio.",
  },
  {
    question: "Can I use my own domain?",
    answer: "Yes, custom domains are available on the Pro and Enterprise plans.",
  },
  {
    question: "Is there a free plan?",
    answer: "Absolutely. The Starter plan is free forever and includes one published portfolio with basic templates.",
  },
  {
    question: "How do I export my portfolio?",
    answer: "You can download your portfolio as a PDF or generate a shareable link with one click.",
  },
  {
    question: "Can I switch templates later?",
    answer: "Yes, you can change templates at any time without losing your content.",
  },
  {
    question: "What analytics are included?",
    answer: "Pro and Enterprise plans provide visitor stats, page views, referrer data, and more.",
  },
  {
    question: "Is my data secure?",
    answer: "We use industry-standard encryption and never share your personal information with third parties.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes, you can downgrade or cancel your paid plan at any time from your account settings.",
  },
  {
    question: "Do you offer support?",
    answer:
      "All users get access to our help center; Pro users receive priority email support and Enterprise users get dedicated assistance.",
  },
];
