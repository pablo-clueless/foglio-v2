"use client";

import { RiShieldLine } from "@remixicon/react";
import { motion } from "framer-motion";
import React from "react";

import { Footer, Navbar } from "@/components/shared";
import { Badge } from "@/components/ui/badge";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

const privacySections = [
  {
    title: "1. Information We Collect",
    content: [
      {
        subtitle: "Personal Information",
        text: "When you create an account, we collect information such as your name, email address, phone number, and profile details. For freelancers, this may include portfolio samples, skills, and work history. For clients, this may include company information and project requirements.",
      },
      {
        subtitle: "Payment Information",
        text: "We collect payment details necessary to process transactions, including billing addresses and payment method information. Payment processing is handled by secure third-party providers.",
      },
      {
        subtitle: "Usage Data",
        text: "We automatically collect information about how you interact with our platform, including pages visited, features used, search queries, and time spent on the platform.",
      },
    ],
  },
  {
    title: "2. How We Use Your Information",
    content: [
      {
        subtitle: "Service Delivery",
        text: "We use your information to provide, maintain, and improve our services, including matching freelancers with clients, processing payments, and facilitating communication.",
      },
      {
        subtitle: "Communication",
        text: "We may send you service-related announcements, updates, security alerts, and support messages. With your consent, we may also send promotional communications.",
      },
      {
        subtitle: "Analytics and Improvement",
        text: "We analyze usage patterns to improve our platform, develop new features, and enhance user experience.",
      },
    ],
  },
  {
    title: "3. Information Sharing",
    content: [
      {
        subtitle: "With Other Users",
        text: "Your profile information is visible to other users as necessary to facilitate connections between freelancers and clients. You control what information appears on your public profile.",
      },
      {
        subtitle: "Service Providers",
        text: "We share information with third-party service providers who assist us in operating our platform, such as payment processors, cloud hosting providers, and analytics services.",
      },
      {
        subtitle: "Legal Requirements",
        text: "We may disclose information when required by law, to protect our rights, or to respond to legal processes.",
      },
    ],
  },
  {
    title: "4. Data Security",
    content: [
      {
        subtitle: "Protection Measures",
        text: "We implement industry-standard security measures including encryption, secure servers, and regular security audits to protect your personal information from unauthorized access, alteration, or destruction.",
      },
      {
        subtitle: "Data Retention",
        text: "We retain your information for as long as your account is active or as needed to provide services. You may request deletion of your data at any time, subject to legal retention requirements.",
      },
    ],
  },
  {
    title: "5. Cookies and Tracking",
    content: [
      {
        subtitle: "Cookies",
        text: "We use cookies and similar technologies to remember your preferences, understand how you use our platform, and personalize your experience.",
      },
      {
        subtitle: "Analytics",
        text: "We use analytics tools to collect and analyze usage data. You can opt out of certain tracking through your browser settings or our cookie preferences.",
      },
    ],
  },
  {
    title: "6. Your Rights",
    content: [
      {
        subtitle: "Access and Portability",
        text: "You have the right to access your personal data and request a copy in a portable format.",
      },
      {
        subtitle: "Correction and Deletion",
        text: "You can update your information through your account settings or request that we correct or delete your personal data.",
      },
      {
        subtitle: "Opt-Out",
        text: "You can opt out of promotional communications at any time by clicking the unsubscribe link in our emails or updating your notification preferences.",
      },
    ],
  },
  {
    title: "7. International Data Transfers",
    content: [
      {
        subtitle: "Cross-Border Transfers",
        text: "Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with applicable laws.",
      },
    ],
  },
  {
    title: "8. Changes to This Policy",
    content: [
      {
        subtitle: "Updates",
        text: "We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page and updating the 'Last updated' date.",
      },
    ],
  },
  {
    title: "9. Contact Us",
    content: [
      {
        subtitle: "Questions",
        text: "If you have questions about this Privacy Policy or our data practices, please contact us at privacy@foglio.com or through our Help Center.",
      },
    ],
  },
];

const Page = () => {
  return (
    <>
      <Navbar />
      <div className="w-screen overflow-hidden px-4 sm:px-0">
        <motion.section
          className="container mx-auto max-w-6xl space-y-2 py-20 sm:py-32"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Badge>
              <RiShieldLine />
              Privacy & Security
            </Badge>
          </motion.div>
          <motion.h1 className="text-4xl font-semibold sm:text-6xl" variants={itemVariants}>
            Privacy Policy
          </motion.h1>
          <motion.p className="text-sm text-gray-400 sm:text-base" variants={itemVariants}>
            Last updated: February 1, 2026
          </motion.p>
          <motion.p className="max-w-3xl pt-4 text-gray-300" variants={itemVariants}>
            At Foglio, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you use our platform.
          </motion.p>
        </motion.section>

        <motion.section
          className="container mx-auto max-w-6xl space-y-12 pb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {privacySections.map((section, index) => (
            <motion.div
              key={section.title}
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
              <h2 className="text-2xl font-semibold text-white">{section.title}</h2>
              <div className="space-y-4">
                {section.content.map((item) => (
                  <div key={item.subtitle} className="border border-gray-800 bg-gray-900/50 p-6">
                    <h3 className="text-primary-400 mb-2 font-medium">{item.subtitle}</h3>
                    <p className="leading-relaxed text-gray-400">{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.section>
      </div>
      <Footer />
    </>
  );
};

export default Page;
