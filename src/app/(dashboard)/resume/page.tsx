"use client";

import { motion } from "framer-motion";
import { toast } from "sonner";
import Link from "next/link";
import React from "react";
import * as Yup from "yup";
import {
  RiBriefcaseLine,
  RiGraduationCapLine,
  RiAwardLine,
  RiCodeLine,
  RiGlobalLine,
  RiToolsLine,
  RiUserLine,
} from "@remixicon/react";

import { FormSection } from "@/components/modules/resume";
import { Avatar, ScrollArea } from "@/components/shared";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateUserMutation } from "@/api/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/user";
import { getInitials } from "@/lib";
import type {
  ExperienceProps,
  EducationProps,
  CertificationProps,
  ProjectProps,
  LanguageProps,
  UpdateUserDto,
} from "@/types";

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

const experienceFields = [
  { name: "role", label: "Job Title", type: "text" as const, required: true, placeholder: "e.g. Senior Developer" },
  { name: "company_name", label: "Company", type: "text" as const, required: true, placeholder: "e.g. Google" },
  { name: "location", label: "Location", type: "text" as const, placeholder: "e.g. San Francisco, CA" },
  { name: "start_date", label: "Start Date", type: "date" as const, required: true },
  { name: "end_date", label: "End Date", type: "date" as const, helperText: "Leave empty if current position" },
  {
    name: "description",
    label: "Description",
    type: "textarea" as const,
    fullWidth: true,
    placeholder: "Describe your responsibilities and achievements...",
  },
  {
    name: "technologies",
    label: "Technologies",
    type: "tags" as const,
    fullWidth: true,
    placeholder: "Press Enter to add technologies...",
  },
];

const educationFields = [
  { name: "institution", label: "Institution", type: "text" as const, required: true, placeholder: "e.g. MIT" },
  { name: "degree", label: "Degree", type: "text" as const, required: true, placeholder: "e.g. Bachelor of Science" },
  {
    name: "field",
    label: "Field of Study",
    type: "text" as const,
    required: true,
    placeholder: "e.g. Computer Science",
  },
  { name: "location", label: "Location", type: "text" as const, placeholder: "e.g. Cambridge, MA" },
  { name: "start_date", label: "Start Date", type: "date" as const, required: true },
  { name: "end_date", label: "End Date", type: "date" as const, helperText: "Leave empty if currently enrolled" },
  { name: "gpa", label: "GPA", type: "number" as const, placeholder: "e.g. 3.8" },
  {
    name: "highlights",
    label: "Highlights",
    type: "textarea" as const,
    fullWidth: true,
    placeholder: "Notable achievements, activities, honors...",
  },
];

const certificationFields = [
  {
    name: "name",
    label: "Certification Name",
    type: "text" as const,
    required: true,
    placeholder: "e.g. AWS Solutions Architect",
  },
  {
    name: "issuer",
    label: "Issuing Organization",
    type: "text" as const,
    required: true,
    placeholder: "e.g. Amazon Web Services",
  },
  { name: "issue_date", label: "Issue Date", type: "date" as const, required: true },
  { name: "expiry_date", label: "Expiry Date", type: "date" as const, helperText: "Leave empty if no expiration" },
  { name: "credential_id", label: "Credential ID", type: "text" as const, placeholder: "e.g. ABC123XYZ" },
  { name: "url", label: "Credential URL", type: "url" as const, placeholder: "https://..." },
];

const projectFields = [
  {
    name: "title",
    label: "Project Title",
    type: "text" as const,
    required: true,
    placeholder: "e.g. E-commerce Platform",
  },
  { name: "url", label: "Project URL", type: "url" as const, placeholder: "https://..." },
  { name: "start_date", label: "Start Date", type: "date" as const },
  { name: "end_date", label: "End Date", type: "date" as const },
  {
    name: "description",
    label: "Description",
    type: "textarea" as const,
    fullWidth: true,
    required: true,
    placeholder: "Describe the project, your role, and impact...",
  },
  {
    name: "stack",
    label: "Tech Stack",
    type: "tags" as const,
    fullWidth: true,
    placeholder: "Press Enter to add technologies...",
  },
];

const languageFields = [
  { name: "name", label: "Language", type: "text" as const, required: true, placeholder: "e.g. English" },
  {
    name: "proficiency",
    label: "Proficiency",
    type: "text" as const,
    required: true,
    placeholder: "e.g. Native, Fluent, Intermediate",
  },
];

const experienceSchema = Yup.object({
  role: Yup.string().required("Job title is required"),
  company_name: Yup.string().required("Company name is required"),
  start_date: Yup.date().required("Start date is required"),
});

const educationSchema = Yup.object({
  institution: Yup.string().required("Institution is required"),
  degree: Yup.string().required("Degree is required"),
  field: Yup.string().required("Field of study is required"),
  start_date: Yup.date().required("Start date is required"),
});

const certificationSchema = Yup.object({
  name: Yup.string().required("Certification name is required"),
  issuer: Yup.string().required("Issuing organization is required"),
  issue_date: Yup.date().required("Issue date is required"),
});

const projectSchema = Yup.object({
  title: Yup.string().required("Project title is required"),
  description: Yup.string().required("Description is required"),
});

const languageSchema = Yup.object({
  name: Yup.string().required("Language is required"),
  proficiency: Yup.string().required("Proficiency level is required"),
});

const Page = () => {
  const { user, setUser } = useUserStore();
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const [editingProfile, setEditingProfile] = React.useState(false);
  const [profileForm, setProfileForm] = React.useState({
    role: user?.role || "",
    headline: user?.headline || "",
    summary: user?.summary || "",
    location: user?.location || "",
    phone: user?.phone || "",
  });

  const [skills, setSkills] = React.useState<string[]>(user?.skills || []);
  const [skillInput, setSkillInput] = React.useState("");

  React.useEffect(() => {
    if (user) {
      setProfileForm({
        role: user.role || "",
        headline: user.headline || "",
        summary: user.summary || "",
        location: user.location || "",
        phone: user.phone || "",
      });
      setSkills(user.skills || []);
    }
  }, [user]);

  const handleUpdateUser = async (data: Partial<typeof user>) => {
    if (!user) return;
    const payload: UpdateUserDto = {
      ...data,
    };
    try {
      const result = await updateUser({ id: user.id, payload }).unwrap();
      setUser(result.data);
      toast.success("Updated successfully");
    } catch {
      toast.error("Failed to update");
    }
  };

  const handleSaveProfile = async () => {
    await handleUpdateUser(profileForm);
    setEditingProfile(false);
  };

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const skill = skillInput.trim();
      if (skill && !skills.includes(skill)) {
        const newSkills = [...skills, skill];
        setSkills(newSkills);
        setSkillInput("");
        handleUpdateUser({ skills: newSkills });
      }
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const newSkills = skills.filter((s) => s !== skillToRemove);
    setSkills(newSkills);
    handleUpdateUser({ skills: newSkills });
  };

  const handleAddExperience = async (exp: Omit<ExperienceProps, "id" | "user_id" | "created_at" | "updated_at">) => {
    const newExp = {
      ...exp,
      id: crypto.randomUUID(),
      user_id: user!.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    await handleUpdateUser({ experiences: [...(user?.experiences || []), newExp as ExperienceProps] });
  };

  const handleUpdateExperience = async (exp: ExperienceProps) => {
    const updated =
      user?.experiences?.map((e) => (e.id === exp.id ? { ...exp, updated_at: new Date().toISOString() } : e)) || [];
    await handleUpdateUser({ experiences: updated });
  };

  const handleDeleteExperience = async (id: string) => {
    const filtered = user?.experiences?.filter((e) => e.id !== id) || [];
    await handleUpdateUser({ experiences: filtered });
  };

  const handleAddEducation = async (edu: Omit<EducationProps, "id" | "user_id" | "created_at" | "updated_at">) => {
    const newEdu = {
      ...edu,
      id: crypto.randomUUID(),
      user_id: user!.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    await handleUpdateUser({ education: [...(user?.education || []), newEdu as EducationProps] });
  };

  const handleUpdateEducation = async (edu: EducationProps) => {
    const updated =
      user?.education?.map((e) => (e.id === edu.id ? { ...edu, updated_at: new Date().toISOString() } : e)) || [];
    await handleUpdateUser({ education: updated });
  };

  const handleDeleteEducation = async (id: string) => {
    const filtered = user?.education?.filter((e) => e.id !== id) || [];
    await handleUpdateUser({ education: filtered });
  };

  const handleAddCertification = async (
    cert: Omit<CertificationProps, "id" | "user_id" | "created_at" | "updated_at">,
  ) => {
    const newCert = {
      ...cert,
      id: crypto.randomUUID(),
      user_id: user!.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    await handleUpdateUser({ certifications: [...(user?.certifications || []), newCert as CertificationProps] });
  };

  const handleUpdateCertification = async (cert: CertificationProps) => {
    const updated =
      user?.certifications?.map((c) => (c.id === cert.id ? { ...cert, updated_at: new Date().toISOString() } : c)) ||
      [];
    await handleUpdateUser({ certifications: updated });
  };

  const handleDeleteCertification = async (id: string) => {
    const filtered = user?.certifications?.filter((c) => c.id !== id) || [];
    await handleUpdateUser({ certifications: filtered });
  };

  const handleAddProject = async (proj: Omit<ProjectProps, "id" | "user_id" | "created_at" | "updated_at">) => {
    const newProj = {
      ...proj,
      id: crypto.randomUUID(),
      user_id: user!.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    await handleUpdateUser({ projects: [...(user?.projects || []), newProj as ProjectProps] });
  };

  const handleUpdateProject = async (proj: ProjectProps) => {
    const updated =
      user?.projects?.map((p) => (p.id === proj.id ? { ...proj, updated_at: new Date().toISOString() } : p)) || [];
    await handleUpdateUser({ projects: updated });
  };

  const handleDeleteProject = async (id: string) => {
    const filtered = user?.projects?.filter((p) => p.id !== id) || [];
    await handleUpdateUser({ projects: filtered });
  };

  const handleAddLanguage = async (lang: Omit<LanguageProps, "id" | "user_id" | "created_at" | "updated_at">) => {
    const newLang = {
      ...lang,
      id: crypto.randomUUID(),
      user_id: user!.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    await handleUpdateUser({ languages: [...(user?.languages || []), newLang as LanguageProps] });
  };

  const handleUpdateLanguage = async (lang: LanguageProps) => {
    const updated =
      user?.languages?.map((l) => (l.id === lang.id ? { ...lang, updated_at: new Date().toISOString() } : l)) || [];
    await handleUpdateUser({ languages: updated });
  };

  const handleDeleteLanguage = async (id: string) => {
    const filtered = user?.languages?.filter((l) => l.id !== id) || [];
    await handleUpdateUser({ languages: filtered });
  };

  if (!user) {
    return <div className="grid h-full w-full place-items-center" />;
  }

  return (
    <ScrollArea>
      <motion.div className="w-full space-y-6 pb-10" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div className="flex items-center justify-end gap-x-4" variants={itemVariants}>
          <Button asChild size="sm" variant="outline">
            <Link href={`/talent-pool/${user.id}`}>Preview Profile</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/resume/export">Export Resume</Link>
          </Button>
        </motion.div>
        <motion.div variants={itemVariants} className="rounded-lg border border-white/10 bg-white/5 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-white/5">
                <RiUserLine className="text-primary-100 size-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">Profile</h3>
            </div>
            <div className="flex items-center gap-x-4">
              {editingProfile && (
                <Button size="sm" variant="outline" onClick={() => setEditingProfile(false)} disabled={isLoading}>
                  Cancel
                </Button>
              )}
              <Button
                size="sm"
                variant={editingProfile ? "default" : "outline"}
                onClick={() => (editingProfile ? handleSaveProfile() : setEditingProfile(true))}
                disabled={isLoading}
              >
                {editingProfile ? "Save" : "Edit"}
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-6 lg:flex-row">
            <Avatar
              alt={getInitials(user.name)}
              className="bg-primary-400 size-24 shrink-0 text-3xl font-bold text-black"
              editable
              src={user.image}
            />
            <div className="flex-1 space-y-4">
              <div>
                <p className="text-2xl font-bold text-white">{user.name}</p>
                <p className="text-gray-400">{user.email}</p>
              </div>
              {editingProfile ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label="Job Title"
                    name="role"
                    value={profileForm.role}
                    onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value })}
                    placeholder="e.g. Senior Software Engineer"
                  />
                  <Input
                    label="Location"
                    name="location"
                    value={profileForm.location}
                    onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                    placeholder="e.g. San Francisco, CA"
                  />
                  <Input
                    label="Phone"
                    name="phone"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    placeholder="e.g. +1 234 567 8900"
                  />
                  <Input
                    label="Headline"
                    name="headline"
                    value={profileForm.headline}
                    onChange={(e) => setProfileForm({ ...profileForm, headline: e.target.value })}
                    placeholder="A short professional headline"
                  />
                  <div className="sm:col-span-2">
                    <label className="mb-0.5 block text-sm font-medium text-gray-400">Summary</label>
                    <Textarea
                      name="summary"
                      value={profileForm.summary}
                      onChange={(e) => setProfileForm({ ...profileForm, summary: e.target.value })}
                      placeholder="Write a brief professional summary..."
                      className="min-h-[100px] border-white/10 bg-transparent"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {user.role && <p className="text-primary-100 font-medium">{user.role}</p>}
                  {user.headline && <p className="text-gray-300">{user.headline}</p>}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                    {user.location && <span>{user.location}</span>}
                    {user.phone && <span>{user.phone}</span>}
                  </div>
                  {user.summary && <p className="mt-2 text-gray-400">{user.summary}</p>}
                </div>
              )}
            </div>
          </div>
        </motion.div>
        <motion.div variants={itemVariants} className="rounded-lg border border-white/10 bg-white/5 p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-white/5">
              <RiToolsLine className="text-primary-100 size-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Skills</h3>
              <p className="text-sm text-gray-400">Add your technical and soft skills</p>
            </div>
          </div>
          <div className="focus-within:border-primary-400 mb-4 flex min-h-[42px] flex-wrap items-center gap-2 rounded-lg border border-white/10 bg-transparent px-3 py-2 transition-colors">
            {skills.map((skill) => (
              <span
                key={skill}
                className="flex items-center gap-1.5 rounded-md bg-white/10 px-2.5 py-1 text-sm text-white"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="text-gray-400 hover:text-red-400"
                >
                  ×
                </button>
              </span>
            ))}
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleAddSkill}
              placeholder={skills.length === 0 ? "Type a skill and press Enter..." : "Add more..."}
              className="min-w-[150px] flex-1 border-0 bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
            />
          </div>
          <p className="text-xs text-gray-500">{skills.length} skills added</p>
        </motion.div>
        <motion.div variants={itemVariants}>
          <FormSection<ExperienceProps>
            title="Experience"
            description="Add your work experience"
            icon={<RiBriefcaseLine className="text-primary-100 size-5" />}
            items={user.experiences || []}
            fields={experienceFields}
            getItemTitle={(exp) => exp.role}
            getItemSubtitle={(exp) =>
              `${exp.company_name} • ${new Date(exp.start_date).getFullYear()} - ${exp.end_date ? new Date(exp.end_date).getFullYear() : "Present"}`
            }
            createEmptyItem={() => ({
              role: "",
              company_name: "",
              description: "",
              start_date: new Date().toISOString(),
              location: "",
              technologies: [],
            })}
            validationSchema={experienceSchema}
            onAdd={handleAddExperience}
            onUpdate={handleUpdateExperience}
            onDelete={handleDeleteExperience}
            isLoading={isLoading}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <FormSection<EducationProps>
            title="Education"
            description="Add your educational background"
            icon={<RiGraduationCapLine className="text-primary-100 size-5" />}
            items={user.education || []}
            fields={educationFields}
            getItemTitle={(edu) => edu.degree}
            getItemSubtitle={(edu) =>
              `${edu.institution} • ${new Date(edu.start_date).getFullYear()} - ${edu.end_date ? new Date(edu.end_date).getFullYear() : "Present"}`
            }
            createEmptyItem={() => ({
              institution: "",
              degree: "",
              field: "",
              start_date: new Date().toISOString(),
              location: "",
            })}
            validationSchema={educationSchema}
            onAdd={handleAddEducation}
            onUpdate={handleUpdateEducation}
            onDelete={handleDeleteEducation}
            isLoading={isLoading}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <FormSection<ProjectProps>
            title="Projects"
            description="Showcase your personal or professional projects"
            icon={<RiCodeLine className="text-primary-100 size-5" />}
            items={user.projects || []}
            fields={projectFields}
            getItemTitle={(proj) => proj.title}
            getItemSubtitle={(proj) => (proj.stack?.length ? proj.stack.slice(0, 3).join(", ") : "")}
            createEmptyItem={() => ({
              title: "",
              description: "",
              stack: [],
            })}
            validationSchema={projectSchema}
            onAdd={handleAddProject}
            onUpdate={handleUpdateProject}
            onDelete={handleDeleteProject}
            isLoading={isLoading}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <FormSection<CertificationProps>
            title="Certifications"
            description="Add your professional certifications"
            icon={<RiAwardLine className="text-primary-100 size-5" />}
            items={user.certifications || []}
            fields={certificationFields}
            getItemTitle={(cert) => cert.name}
            getItemSubtitle={(cert) => cert.issuer}
            createEmptyItem={() => ({
              name: "",
              issuer: "",
              issue_date: new Date().toISOString(),
            })}
            validationSchema={certificationSchema}
            onAdd={handleAddCertification}
            onUpdate={handleUpdateCertification}
            onDelete={handleDeleteCertification}
            isLoading={isLoading}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <FormSection<LanguageProps>
            title="Languages"
            description="Add languages you speak"
            icon={<RiGlobalLine className="text-primary-100 size-5" />}
            items={user.languages || []}
            fields={languageFields}
            getItemTitle={(lang) => lang.name}
            getItemSubtitle={(lang) => lang.proficiency}
            createEmptyItem={() => ({
              name: "",
              proficiency: "",
            })}
            validationSchema={languageSchema}
            onAdd={handleAddLanguage}
            onUpdate={handleUpdateLanguage}
            onDelete={handleDeleteLanguage}
            isLoading={isLoading}
            maxItems={10}
          />
        </motion.div>
      </motion.div>
    </ScrollArea>
  );
};

export default Page;
