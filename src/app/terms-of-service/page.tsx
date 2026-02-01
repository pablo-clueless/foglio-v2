"use client";

import { RiFileTextLine } from "@remixicon/react";
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

const termsSections = [
  {
    title: "1. Acceptance of Terms",
    content:
      "By accessing or using Foglio, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this platform. These terms apply to all users of the platform, including freelancers, clients, and visitors.",
  },
  {
    title: "2. Account Registration",
    content:
      "To access certain features of our platform, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding your password and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.",
  },
  {
    title: "3. User Responsibilities",
    subsections: [
      {
        subtitle: "For Freelancers",
        text: "You agree to accurately represent your skills, experience, and qualifications. You will deliver work that meets the agreed-upon specifications and deadlines. You are responsible for the quality of your work and must communicate professionally with clients.",
      },
      {
        subtitle: "For Clients",
        text: "You agree to provide clear project requirements and timely feedback. You will make payments as agreed upon completion of milestones or projects. You must treat freelancers with respect and professionalism.",
      },
      {
        subtitle: "For All Users",
        text: "You agree not to use the platform for any illegal purposes, harass other users, post misleading or false information, or attempt to circumvent our payment systems.",
      },
    ],
  },
  {
    title: "4. Payments and Fees",
    content:
      "Foglio charges service fees for facilitating transactions between freelancers and clients. Fee structures are clearly displayed before you accept or post a project. All payments must be processed through our platform to ensure protection for both parties. Attempting to conduct payments outside the platform may result in account suspension.",
  },
  {
    title: "5. Intellectual Property",
    subsections: [
      {
        subtitle: "Platform Content",
        text: "The Foglio platform, including its design, features, and content created by us, is protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, or distribute our platform content without written permission.",
      },
      {
        subtitle: "User Content",
        text: "You retain ownership of content you create and post on the platform. By posting content, you grant Foglio a non-exclusive license to display and distribute your content as necessary to operate the platform. Work product ownership is determined by the agreement between freelancer and client.",
      },
    ],
  },
  {
    title: "6. Dispute Resolution",
    content:
      "We encourage users to resolve disputes directly through communication. If a resolution cannot be reached, Foglio offers a dispute resolution process. Our team will review the details and make a determination based on the evidence provided. While we strive to be fair, our decisions are final and binding.",
  },
  {
    title: "7. Limitation of Liability",
    content:
      "Foglio provides a platform to connect freelancers and clients but is not responsible for the quality of work delivered or the conduct of users. To the maximum extent permitted by law, Foglio shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues.",
  },
  {
    title: "8. Prohibited Activities",
    content:
      "Users are prohibited from: sharing false or misleading information; impersonating others; posting spam or unauthorized advertisements; attempting to hack or disrupt the platform; using automated tools to scrape data; engaging in any form of discrimination or harassment; circumventing fees or payment systems; and violating any applicable laws or regulations.",
  },
  {
    title: "9. Account Termination",
    content:
      "We reserve the right to suspend or terminate your account at any time for violations of these terms or for any other reason at our discretion. You may also delete your account at any time through your account settings. Upon termination, your right to use the platform will immediately cease.",
  },
  {
    title: "10. Modifications to Terms",
    content:
      "We reserve the right to modify these Terms of Service at any time. We will notify users of significant changes via email or platform notification. Your continued use of the platform after changes are posted constitutes acceptance of the modified terms.",
  },
  {
    title: "11. Governing Law",
    content:
      "These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction in which Foglio operates, without regard to its conflict of law provisions.",
  },
  {
    title: "12. Contact Information",
    content:
      "If you have any questions about these Terms of Service, please contact us at legal@foglio.com or visit our Help Center for assistance.",
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
              <RiFileTextLine />
              Legal
            </Badge>
          </motion.div>
          <motion.h1 className="text-4xl font-semibold sm:text-6xl" variants={itemVariants}>
            Terms of Service
          </motion.h1>
          <motion.p className="text-sm text-gray-400 sm:text-base" variants={itemVariants}>
            Last updated: February 1, 2026
          </motion.p>
          <motion.p className="max-w-3xl pt-4 text-gray-300" variants={itemVariants}>
            Welcome to Foglio. These Terms of Service govern your use of our platform and services. Please read them
            carefully before using our platform.
          </motion.p>
        </motion.section>
        <motion.section
          className="container mx-auto max-w-6xl space-y-8 pb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {termsSections.map((section, index) => (
            <motion.div
              key={section.title}
              className="border border-gray-800 bg-gray-900/50 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
            >
              <h2 className="mb-4 text-xl font-semibold text-white">{section.title}</h2>
              {section.content && <p className="leading-relaxed text-gray-400">{section.content}</p>}
              {section.subsections && (
                <div className="mt-4 space-y-4">
                  {section.subsections.map((subsection) => (
                    <div key={subsection.subtitle} className="border-primary-400 border-l-2 pl-4">
                      <h3 className="text-primary-400 mb-2 font-medium">{subsection.subtitle}</h3>
                      <p className="leading-relaxed text-gray-400">{subsection.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </motion.section>
      </div>
      <Footer />
    </>
  );
};

export default Page;
