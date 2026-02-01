"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { toast } from "sonner";
import React from "react";
import {
  RiBuilding2Line,
  RiMapPinLine,
  RiGlobalLine,
  RiGroupLine,
  RiImageLine,
  RiInformationLine,
} from "@remixicon/react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateUserMutation } from "@/api/user";
import { ScrollArea } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/store/user";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
} as const;

const companySizes = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "501-1000", label: "501-1000 employees" },
  { value: "1001-5000", label: "1001-5000 employees" },
  { value: "5001+", label: "5001+ employees" },
];

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "E-commerce",
  "Marketing",
  "Consulting",
  "Manufacturing",
  "Real Estate",
  "Entertainment",
  "Transportation",
  "Hospitality",
  "Non-profit",
  "Government",
  "Other",
];

const Page = () => {
  const { user, setUser } = useUserStore();
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const [form, setForm] = React.useState({
    name: "",
    industry: "",
    size: "",
    website: "",
    logo: "",
    description: "",
    location: "",
  });

  const [hasChanges, setHasChanges] = React.useState(false);

  React.useEffect(() => {
    if (user?.company) {
      setForm({
        name: user.company.name || "",
        industry: user.company.industry || "",
        size: user.company.size || "",
        website: user.company.website || "",
        logo: user.company.logo || "",
        description: user.company.description || "",
        location: user.company.location || "",
      });
    }
  }, [user?.company]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    if (!user) return;
    try {
      const result = await updateUser({
        id: user.id,
        payload: {
          company: {
            name: form.name,
            industry: form.industry || undefined,
            size: form.size || undefined,
            website: form.website || undefined,
            logo: form.logo || undefined,
            description: form.description || undefined,
            location: form.location || undefined,
          },
        },
      }).unwrap();
      setUser(result.data);
      setHasChanges(false);
      toast.success("Company profile updated successfully");
    } catch {
      toast.error("Failed to update company profile");
    }
  };

  const handleReset = () => {
    if (user?.company) {
      setForm({
        name: user.company.name || "",
        industry: user.company.industry || "",
        size: user.company.size || "",
        website: user.company.website || "",
        logo: user.company.logo || "",
        description: user.company.description || "",
        location: user.company.location || "",
      });
      setHasChanges(false);
    }
  };

  if (!user) return null;

  return (
    <ScrollArea>
      <motion.div className="w-full space-y-6 pb-10" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants}>
          <h1 className="text-2xl font-bold text-white">Company Profile</h1>
          <p className="text-gray-400">Manage your company information and branding</p>
        </motion.div>
        <motion.div variants={itemVariants} className="border border-white/10 bg-white/5 p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center bg-white/5">
              <RiBuilding2Line className="text-primary-100 size-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Basic Information</h3>
              <p className="text-sm text-gray-400">Your company&apos;s core details</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Company Name"
              placeholder="Your company name"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            <div className="space-y-2">
              <Label>Industry</Label>
              <Select value={form.industry} onValueChange={(value) => handleChange("industry", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent className="bg-black text-white">
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Company Size</Label>
              <Select value={form.size} onValueChange={(value) => handleChange("size", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select company size" />
                </SelectTrigger>
                <SelectContent className="bg-black text-white">
                  {companySizes.map((size) => (
                    <SelectItem key={size.value} value={size.value}>
                      {size.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="relative">
              <Input
                label="Location"
                placeholder="e.g. San Francisco, CA"
                value={form.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className="pl-10"
              />
              <RiMapPinLine className="absolute top-[34px] left-3 size-4 text-gray-500" />
            </div>
          </div>
        </motion.div>
        <motion.div variants={itemVariants} className="border border-white/10 bg-white/5 p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center bg-white/5">
              <RiGlobalLine className="text-primary-100 size-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Online Presence</h3>
              <p className="text-sm text-gray-400">Your company&apos;s website and branding</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative">
              <Input
                label="Website"
                placeholder="https://yourcompany.com"
                value={form.website}
                onChange={(e) => handleChange("website", e.target.value)}
                className="pl-10"
              />
              <RiGlobalLine className="absolute top-[34px] left-3 size-4 text-gray-500" />
            </div>
            <div className="relative">
              <Input
                label="Logo URL"
                placeholder="https://yourcompany.com/logo.png"
                value={form.logo}
                onChange={(e) => handleChange("logo", e.target.value)}
                className="pl-10"
              />
              <RiImageLine className="absolute top-[34px] left-3 size-4 text-gray-500" />
            </div>
          </div>
          {form.logo && (
            <div className="mt-4">
              <Label className="mb-2 block">Logo Preview</Label>
              <div className="relative inline-flex items-center justify-center border border-white/10 bg-white/5 p-4">
                <Image
                  alt="Company logo preview"
                  className="max-h-20 max-w-[200px] object-contain"
                  fill
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                  sizes="100%"
                  src={form.logo}
                />
              </div>
            </div>
          )}
        </motion.div>
        <motion.div variants={itemVariants} className="border border-white/10 bg-white/5 p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center bg-white/5">
              <RiInformationLine className="text-primary-100 size-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">About Your Company</h3>
              <p className="text-sm text-gray-400">Tell candidates about your company culture and mission</p>
            </div>
          </div>
          <Textarea
            label="Company Description"
            placeholder="Describe your company, its mission, culture, and what makes it a great place to work..."
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="min-h-[150px]"
          />
        </motion.div>
        {user?.company?.users && user.company.users.length > 0 && (
          <motion.div variants={itemVariants} className="border border-white/10 bg-white/5 p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center bg-white/5">
                <RiGroupLine className="text-primary-100 size-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Team Members</h3>
                <p className="text-sm text-gray-400">{user.company.users.length} members in your company</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {user.company.users.slice(0, 6).map((member) => (
                <div key={member.id} className="flex items-center gap-3 border border-white/10 bg-white/5 p-3">
                  <div className="bg-primary-500/20 text-primary-400 flex size-10 items-center justify-center">
                    {member.image ? (
                      <div className="relative aspect-square size-10">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          sizes="100%"
                          className="size-10 object-cover"
                        />
                      </div>
                    ) : (
                      <span className="text-sm font-medium">{member.name?.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-white">{member.name}</p>
                    <p className="truncate text-sm text-gray-400">{member.role || member.headline || "Team member"}</p>
                  </div>
                </div>
              ))}
            </div>
            {user.company.users.length > 6 && (
              <p className="mt-4 text-sm text-gray-400">And {user.company.users.length - 6} more team members</p>
            )}
          </motion.div>
        )}
        <motion.div variants={itemVariants} className="flex justify-end gap-3">
          {hasChanges && (
            <Button variant="outline" onClick={handleReset}>
              Discard Changes
            </Button>
          )}
          <Button onClick={handleSave} disabled={isLoading || !form.name}>
            {isLoading ? "Saving..." : "Save Company Profile"}
          </Button>
        </motion.div>
        {!user.company && (
          <motion.div variants={itemVariants} className="border border-yellow-500/20 bg-yellow-500/10 p-4">
            <div className="flex items-start gap-3">
              <RiInformationLine className="size-5 shrink-0 text-yellow-500" />
              <div>
                <h4 className="font-medium text-yellow-500">Complete Your Company Profile</h4>
                <p className="mt-1 text-sm text-yellow-400/80">
                  A complete company profile helps attract top talent. Candidates are more likely to apply to companies
                  with detailed profiles showing their culture and values.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </ScrollArea>
  );
};

export default Page;
