"use client";

import { GearIcon, LightningIcon, PaletteIcon, RocketLaunchIcon } from "@phosphor-icons/react";

import type { FeaturesProps, PricingProps } from "@/types";

export const FEATURES: FeaturesProps[] = [
  {
    icon: LightningIcon,
    title: "Quick Setup",
    subtitle: "Get your portfolio up and running in less than 5 minutes with our streamlined process",
  },
  {
    icon: PaletteIcon,
    title: "Easy Customization",
    subtitle: "Personalize your portfolio with our intuitive drag-and-drop interface and pre-built templates",
  },
  {
    icon: RocketLaunchIcon,
    title: "Instant Deploy",
    subtitle: "Publish your portfolio instantly with one click and share it with the world",
  },
  {
    icon: GearIcon,
    title: "Advanced Features",
    subtitle: "Access powerful tools like analytics, SEO optimization, and custom domains to enhance your portfolio",
  },
];

export const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Upload or Enter",
    description: "Drag-and-drop your existing resume or fill out a simple form to add your information manually.",
  },
  {
    step: 2,
    title: "Organize & Review",
    description: "Review and organize your data in the visual editor; tweak anything to perfect your presentation.",
  },
  {
    step: 3,
    title: "Pick a Template",
    description: "Choose from professional, modern, or creative templates and customize colors, fonts, and sections.",
  },
  {
    step: 4,
    title: "Export & Share",
    description: "Download your polished resume as PDF or get a shareable link to send to recruiters in one click.",
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
