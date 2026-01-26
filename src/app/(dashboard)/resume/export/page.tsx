"use client";

import { RiPrinterLine, RiShareLine } from "@remixicon/react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import React from "react";

import type { ResumeProps } from "@/components/modules/resume/types";
import { Checkbox } from "@/components/ui/checkbox";
import { FONTFACES, THEMES } from "@/config/theme";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/user";
import {
  ClassicResume,
  CorporateResume,
  CreativeResume,
  ElegantResume,
  ExecutiveResume,
  ModernResume,
  ProfessionalResume,
} from "@/components/modules/resume";

const initialValues = {
  fontface: FONTFACES[0].value,
  theme: THEMES[0].id,
};

const resumes: Record<string, React.FC<ResumeProps>> = {
  classic: ClassicResume,
  corporate: CorporateResume,
  creative: CreativeResume,
  executive: ExecutiveResume,
  elegant: ElegantResume,
  minimal: ClassicResume,
  modern: ModernResume,
  professional: ProfessionalResume,
};

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
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
} as const;

const previewVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.3 },
  },
} as const;

const Page = () => {
  const { user } = useUserStore();
  const router = useRouter();

  const { setFieldValue, values } = useFormik({
    initialValues,
    onSubmit: () => {},
  });

  const selectedFontFamily = React.useMemo(() => {
    if (!values.fontface) return "--font-figtree";
    const fontFamily = FONTFACES.find((f) => f.value === values.fontface);
    if (!fontFamily) return "--font-figtree";
    else return fontFamily.value;
  }, [values.fontface]);

  const selectedTheme = React.useMemo(() => {
    return THEMES.find((t) => t.id === values.theme)!;
  }, [values.theme]);

  const Resume = resumes[selectedTheme.id];

  return (
    <div className="flex h-full w-full gap-10">
      <motion.div className="h-full flex-1 space-y-6" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants}>
          <Button onClick={() => router.back()} size="sm" variant="default-outline">
            Back
          </Button>
        </motion.div>
        <div className="flex h-[calc(100%-56px)] flex-col justify-between">
          <div className="space-y-4">
            <motion.div className="space-y-1" variants={itemVariants}>
              <p className="text-sm font-semibold">Choose Theme</p>
              <div className="space-y-1">
                {THEMES.map((theme, index) => (
                  <motion.div
                    className="flex items-center gap-x-2"
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Checkbox
                      checked={values.theme === theme.id}
                      onCheckedChange={() => setFieldValue("theme", theme.id)}
                    />
                    <p className="text-sm">{theme.name}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div className="space-y-1" variants={itemVariants}>
              <p className="text-sm font-semibold">Choose Fontface</p>
              <div className="space-y-1">
                {FONTFACES.map((fontface, index) => (
                  <motion.div
                    className="flex items-center gap-x-2"
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Checkbox
                      checked={values.fontface === fontface.value}
                      onCheckedChange={() => setFieldValue("fontface", fontface.value)}
                    />
                    <p className="text-sm">{fontface.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          <div className="grid w-full grid-cols-2 gap-x-4">
            <Button size="sm">
              <RiPrinterLine /> Print
            </Button>
            <Button size="sm" variant="default-outline">
              <RiShareLine /> Share
            </Button>
          </div>
        </div>
      </motion.div>
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTheme.id + selectedFontFamily}
          className="aspect-[1/1.414] h-full border"
          variants={previewVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {user && <Resume fontFamily={selectedFontFamily} theme={selectedTheme} user={user} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Page;
