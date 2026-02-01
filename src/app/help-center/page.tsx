"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import {
  RiQuestionLine,
  RiUserLine,
  RiMoneyDollarCircleLine,
  RiBriefcaseLine,
  RiShieldLine,
  RiCustomerService2Line,
  RiSearchLine,
} from "@remixicon/react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Footer, Navbar } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
} as const;

const helpCategories = [
  {
    icon: RiUserLine,
    title: "Account & Profile",
    description: "Manage your account settings, profile, and preferences",
  },
  {
    icon: RiBriefcaseLine,
    title: "Finding Work",
    description: "Tips for freelancers to find and land projects",
  },
  {
    icon: RiMoneyDollarCircleLine,
    title: "Payments & Billing",
    description: "Payment methods, invoicing, and transaction issues",
  },
  {
    icon: RiShieldLine,
    title: "Safety & Security",
    description: "Protecting your account and staying safe online",
  },
];

const faqData = [
  {
    category: "Getting Started",
    questions: [
      {
        question: "How do I create an account on Foglio?",
        answer:
          "To create an account, click the 'Sign Up' button on the homepage. You can register using your email address or sign up with Google. Fill in your basic information, verify your email, and complete your profile to get started.",
      },
      {
        question: "What's the difference between a freelancer and client account?",
        answer:
          "Freelancer accounts are for professionals looking to offer their services and find work. Client accounts are for individuals or businesses looking to hire freelancers for projects. You can switch between account types in your settings if needed.",
      },
      {
        question: "How do I complete my profile?",
        answer:
          "Navigate to your profile settings and fill in all required fields including your bio, skills, portfolio samples, and work history. A complete profile increases your visibility and helps clients find you. Aim for at least 80% profile completion.",
      },
    ],
  },
  {
    category: "Finding Work",
    questions: [
      {
        question: "How do I find projects that match my skills?",
        answer:
          "Use the Jobs page to browse available projects. You can filter by category, budget, duration, and required skills. Set up job alerts to get notified when new projects matching your criteria are posted.",
      },
      {
        question: "How do I submit a proposal?",
        answer:
          "Click on a job listing to view details, then click 'Submit Proposal'. Write a personalized cover letter explaining why you're the right fit, set your rate, and include relevant portfolio samples. Be specific about how you'll approach the project.",
      },
      {
        question: "What makes a successful proposal?",
        answer:
          "Successful proposals are personalized, address the client's specific needs, showcase relevant experience, and demonstrate understanding of the project requirements. Include specific examples of similar work and be clear about your approach and timeline.",
      },
    ],
  },
  {
    category: "Payments",
    questions: [
      {
        question: "How do payments work on Foglio?",
        answer:
          "All payments are processed securely through our platform. Clients fund milestones or projects upfront, and funds are held in escrow until work is approved. Once approved, funds are released to the freelancer's account and can be withdrawn.",
      },
      {
        question: "What payment methods are accepted?",
        answer:
          "We accept major credit cards, debit cards, and bank transfers. For withdrawals, freelancers can transfer funds to their bank account or use supported payment services. Processing times vary by method.",
      },
      {
        question: "What are Foglio's service fees?",
        answer:
          "Foglio charges a service fee on completed projects. Fee structures are transparently displayed before you accept or post a project. The fee helps us maintain the platform, provide support, and offer payment protection.",
      },
      {
        question: "How do I handle payment disputes?",
        answer:
          "If you have a payment dispute, first try to resolve it directly with the other party through our messaging system. If you can't reach an agreement, you can open a dispute through the Help Center. Our team will review the case and make a fair determination.",
      },
    ],
  },
  {
    category: "Account & Security",
    questions: [
      {
        question: "How do I change my password?",
        answer:
          "Go to Settings > Security > Change Password. Enter your current password and your new password twice to confirm. Use a strong password with a mix of letters, numbers, and symbols.",
      },
      {
        question: "How do I enable two-factor authentication?",
        answer:
          "Navigate to Settings > Security > Two-Factor Authentication. Follow the prompts to set up 2FA using an authenticator app. This adds an extra layer of security to your account.",
      },
      {
        question: "What should I do if I suspect unauthorized account access?",
        answer:
          "Immediately change your password and enable two-factor authentication if not already active. Review your recent account activity and contact our support team. We recommend checking connected devices and revoking access to any you don't recognize.",
      },
      {
        question: "How do I delete my account?",
        answer:
          "Go to Settings > Account > Delete Account. Please note that account deletion is permanent and will remove all your data, including project history and earnings. Make sure to withdraw any remaining balance before deleting.",
      },
    ],
  },
];

const Page = () => {
  const [search, setSearch] = React.useState("");
  const debouncedSearch = useDebounce(search, 300);

  const filteredFaqs = React.useMemo(() => {
    if (!debouncedSearch.trim()) return faqData;

    const searchLower = debouncedSearch.toLowerCase();
    return faqData
      .map((category) => ({
        ...category,
        questions: category.questions.filter(
          (q) => q.question.toLowerCase().includes(searchLower) || q.answer.toLowerCase().includes(searchLower),
        ),
      }))
      .filter((category) => category.questions.length > 0);
  }, [debouncedSearch]);

  const totalResults = filteredFaqs.reduce((acc, cat) => acc + cat.questions.length, 0);

  return (
    <>
      <Navbar />
      <div className="w-screen overflow-hidden px-4 sm:px-0">
        <motion.section
          className="container mx-auto max-w-6xl space-y-6 py-20 sm:py-32"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="w-full space-y-4" variants={itemVariants}>
            <Badge>
              <RiQuestionLine />
              Get Help
            </Badge>
            <h1 className="text-4xl font-semibold sm:text-6xl">Help Center</h1>
            <p className="text-sm text-gray-400 sm:text-base">
              Find answers to common questions and learn how to get the most out of Foglio
            </p>
          </motion.div>
          <motion.div className="relative" variants={itemVariants}>
            <Input
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              value={search}
              placeholder="Search for help..."
              className="pl-12"
              wrapperClassName="w-full sm:w-1/2"
            />
          </motion.div>
        </motion.section>
        <motion.section
          className="container mx-auto max-w-6xl pb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="mb-6 text-xl font-semibold">Browse by Category</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {helpCategories.map((category, index) => (
              <motion.div
                key={category.title}
                className="group hover:border-primary-400 cursor-pointer border border-gray-800 bg-gray-900/50 p-6 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <category.icon className="text-primary-400 mb-4 size-8" />
                <h3 className="group-hover:text-primary-400 mb-2 font-medium text-white">{category.title}</h3>
                <p className="text-sm text-gray-400">{category.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
        <motion.section
          className="container mx-auto max-w-6xl pb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
            {debouncedSearch && (
              <p className="text-sm text-gray-400">
                {totalResults} {totalResults === 1 ? "result" : "results"} found
              </p>
            )}
          </div>
          {filteredFaqs.length === 0 ? (
            <div className="border border-gray-800 bg-gray-900/50 p-12 text-center">
              <RiSearchLine className="mx-auto mb-4 size-12 text-gray-600" />
              <h3 className="mb-2 text-lg font-medium text-white">No results found</h3>
              <p className="text-gray-400">
                We couldn't find any articles matching "{debouncedSearch}". Try different keywords or browse the
                categories above.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredFaqs.map((category) => (
                <div key={category.category}>
                  <h3 className="text-primary-400 mb-4 text-lg font-medium">{category.category}</h3>
                  <Accordion type="single" collapsible className="border border-gray-800 bg-gray-900/50">
                    {category.questions.map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`${category.category}-${index}`}
                        className="border-gray-800 px-6"
                      >
                        <AccordionTrigger className="hover:text-primary-400 text-left text-white hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-400">{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          )}
        </motion.section>
        <motion.section
          className="container mx-auto max-w-6xl pb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="from-primary-900/20 to-primary-800/20 border border-gray-800 bg-gradient-to-r p-8 text-center sm:p-12">
            <RiCustomerService2Line className="text-primary-400 mx-auto mb-4 size-12" />
            <h2 className="mb-2 text-2xl font-semibold">Still need help?</h2>
            <p className="mb-6 text-gray-400">Can't find what you're looking for? Our support team is here to help.</p>
            <Button asChild size="lg">
              <Link href="mailto:support@foglio.com">Contact Support</Link>
            </Button>
          </div>
        </motion.section>
      </div>
      <Footer />
    </>
  );
};

export default Page;
