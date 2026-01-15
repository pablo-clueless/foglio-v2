"use client";

import { useFormik } from "formik";
import React from "react";

import type { ResumeProps } from "@/components/modules/resume/types";
import { Checkbox } from "@/components/ui/checkbox";
import { FONTFACES, THEMES } from "@/config/theme";
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
import { Button } from "@/components/ui/button";

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

const Page = () => {
  const { user } = useUserStore();

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
      <div className="flex-1 space-y-6">
        <Button size="sm" variant="default-outline">
          Back
        </Button>
        <div className="space-y-4">
          <div className="space-y-1">
            <p className="text-sm font-semibold">Choose Theme</p>
            <div className="space-y-1">
              {THEMES.map((theme, index) => (
                <div className="flex items-center gap-x-2" key={index}>
                  <Checkbox
                    checked={values.theme === theme.id}
                    onCheckedChange={() => setFieldValue("theme", theme.id)}
                  />
                  <p className="text-sm">{theme.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold">Choose Fontface</p>
            <div className="space-y-1">
              {FONTFACES.map((fontface, index) => (
                <div className="flex items-center gap-x-2" key={index}>
                  <Checkbox
                    checked={values.fontface === fontface.value}
                    onCheckedChange={() => setFieldValue("fontface", fontface.value)}
                  />
                  <p className="text-sm">{fontface.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="aspect-[1/1.414] h-full border">
        {user && <Resume fontFamily={selectedFontFamily} theme={selectedTheme} user={user} />}
      </div>
    </div>
  );
};

export default Page;
