import { assign, createMachine } from "xstate";

import type { CertificationProps, EducationProps, ExperienceProps, LanguageProps, ProjectProps } from "@/types";

interface Form {
  headline: string;
  summary: string;
  certifications?: CertificationProps[];
  education?: EducationProps[];
  experiences?: ExperienceProps[];
  languages?: LanguageProps[];
  projects?: ProjectProps[];
  skills?: string[];
}

interface FormContext {
  errors: Record<string, string>;
  form: Partial<Form>;
}

type FormEvent =
  | { type: "NEXT" }
  | { type: "BACK" }
  | { type: "UPDATE_DATA"; data: Partial<Form> }
  | { type: "SUBMIT" }
  | { type: "RESET" };

const validateSummary = (ctx: FormContext): boolean => {
  const { form } = ctx;

  if (!form.summary) return false;
  if (form.summary.length < 200) return false;
  return true;
};

const validateHeadline = (ctx: FormContext): boolean => {
  const { form } = ctx;

  if (!form.headline) return false;
  if (form.headline.length < 50) return false;
  return true;
};

const validateCertification = (ctx: FormContext): boolean => {
  const { form } = ctx;

  if (!form.certifications?.length) return true;
  return form.certifications.every((certification) => {
    return (
      certification.credential_id &&
      certification.issue_date &&
      certification.issuer &&
      certification.name &&
      certification.url
    );
  });
};

const validateEducation = (ctx: FormContext): boolean => {
  const { form } = ctx;

  if (!form.education?.length) return true;
  return form.education.every((school) => {
    return school.degree && school.field && school.institution && school.start_date;
  });
};

const validateExperiences = (ctx: FormContext): boolean => {
  const { form } = ctx;

  if (!form.experiences?.length) return true;
  return form.experiences.every((experience) => {
    return experience.company_name && experience.role && experience.start_date;
  });
};

const validateLanguages = (ctx: FormContext): boolean => {
  const { form } = ctx;

  if (!form.languages?.length) return true;
  return form.languages.every((language) => {
    return language.name && language.proficiency;
  });
};

const validateProjects = (ctx: FormContext): boolean => {
  const { form } = ctx;

  if (!form.projects?.length) return true;
  return form.projects.every((project) => {
    return project.stack?.length && project.title && project.url;
  });
};

export const machine = createMachine(
  {
    id: "form",
    initial: "personal",
    schemas: {
      context: {} as FormContext,
      events: {} as FormEvent,
    },
    context: {
      errors: {},
      form: {},
    },
    states: {
      personal: {
        on: {
          NEXT: "summary",
        },
      },
      summary: {
        on: {
          NEXT: "experience",
          BACK: "personal",
        },
      },
      experience: {
        on: {
          NEXT: "education",
          BACK: "summary",
        },
      },
      education: {
        on: {
          NEXT: "projects",
          BACK: "experience",
        },
      },
      projects: {
        on: {
          NEXT: "skills",
          BACK: "education",
        },
      },
      skills: {
        on: {
          NEXT: "certifications",
          BACK: "projects",
        },
      },
      certifications: {
        on: {
          NEXT: "languages",
          BACK: "skills",
        },
      },
      languages: {
        on: {
          NEXT: "preview",
          BACK: "certifications",
        },
      },
      preview: {
        on: {
          SUBMIT: "submitting",
          BACK: "languages",
        },
      },
      submitting: {
        invoke: {
          src: "submitForm",
          onDone: "success",
          onError: {
            target: "languages",
            actions: assign({
              errors: (ctx) => ({
                submit: ctx.event.error || "Submission failed",
              }),
            }),
          },
        },
      },
      success: {
        type: "final",
      },
    },
    on: {
      UPDATE_DATA: {
        actions: assign({
          form: (ctx) => ({
            ...ctx.context.form,
          }),
        }),
      },
      RESET: {
        target: "personal",
        actions: assign({
          form: {},
          errors: {},
        }),
      },
    },
  },
  {
    guards: {
      isFormValid: (ctx) => {
        const { context } = ctx;

        if (!validateHeadline(context)) return false;
        if (!validateSummary(context)) return false;
        if (!validateCertification(context)) return false;
        if (!validateEducation(context)) return false;
        if (!validateExperiences(context)) return false;
        if (!validateLanguages(context)) return false;
        if (!validateProjects(context)) return false;

        return true;
      },
    },
  },
);
