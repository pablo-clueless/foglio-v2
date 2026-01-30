"use client";

import { toast } from "sonner";
import React from "react";
import {
  RiLinkedinBoxFill,
  RiGithubFill,
  RiTwitterXFill,
  RiInstagramFill,
  RiFacebookBoxFill,
  RiYoutubeFill,
  RiArticleLine,
  RiUserLine,
  RiExternalLinkLine,
} from "@remixicon/react";

import { useUpdateUserMutation } from "@/api/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/user";

const socialFields = [
  { key: "linkedin", label: "LinkedIn", icon: RiLinkedinBoxFill, placeholder: "https://linkedin.com/in/username" },
  { key: "gitHub", label: "GitHub", icon: RiGithubFill, placeholder: "https://github.com/username" },
  { key: "twitter", label: "Twitter / X", icon: RiTwitterXFill, placeholder: "https://x.com/username" },
  { key: "instagram", label: "Instagram", icon: RiInstagramFill, placeholder: "https://instagram.com/username" },
  { key: "facebook", label: "Facebook", icon: RiFacebookBoxFill, placeholder: "https://facebook.com/username" },
  { key: "youtube", label: "YouTube", icon: RiYoutubeFill, placeholder: "https://youtube.com/@channel" },
  { key: "blog", label: "Blog / Website", icon: RiArticleLine, placeholder: "https://yourblog.com" },
] as const;

export const ProfileSettings = () => {
  const { user, setUser } = useUserStore();
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const [form, setForm] = React.useState({
    name: user?.name || "",
    username: user?.username || "",
    email: user?.email || "",
  });

  const [socialMedia, setSocialMedia] = React.useState({
    linkedin: user?.social_media?.linkedin || "",
    gitHub: user?.social_media?.gitHub || "",
    twitter: user?.social_media?.twitter || "",
    instagram: user?.social_media?.instagram || "",
    facebook: user?.social_media?.facebook || "",
    youtube: user?.social_media?.youtube || "",
    blog: user?.social_media?.blog || "",
  });

  React.useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
      });
      setSocialMedia({
        linkedin: user.social_media?.linkedin || "",
        gitHub: user.social_media?.gitHub || "",
        twitter: user.social_media?.twitter || "",
        instagram: user.social_media?.instagram || "",
        facebook: user.social_media?.facebook || "",
        youtube: user.social_media?.youtube || "",
        blog: user.social_media?.blog || "",
      });
    }
  }, [user]);

  const handleSaveProfile = async () => {
    if (!user) return;
    try {
      const result = await updateUser({
        id: user.id,
        payload: { name: form.name, username: form.username },
      }).unwrap();
      setUser(result.data);
      toast.success("Profile updated successfully");
    } catch {
      toast.error("Failed to update profile");
    }
  };

  const handleSaveSocialMedia = async () => {
    if (!user) return;
    try {
      const result = await updateUser({
        id: user.id,
        payload: { social_media: socialMedia },
      }).unwrap();
      setUser(result.data);
      toast.success("Social links updated successfully");
    } catch {
      toast.error("Failed to update social links");
    }
  };

  if (!user) return null;

  return (
    <div className="space-y-8">
      <div className="rounded-lg border border-white/10 bg-white/5 p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-white/5">
            <RiUserLine className="text-primary-100 size-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Account Information</h3>
            <p className="text-sm text-gray-400">Update your basic account details</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Full Name"
            name="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your full name"
          />
          <Input
            label="Username"
            name="username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            placeholder="your_username"
          />
          <div className="sm:col-span-2">
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={form.email}
              disabled
              helperText="Email cannot be changed"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={handleSaveProfile} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-white/10 bg-white/5 p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-white/5">
            <RiExternalLinkLine className="text-primary-100 size-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Social Links</h3>
            <p className="text-sm text-gray-400">Connect your social media profiles</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {socialFields.map((field) => {
            const Icon = field.icon;
            return (
              <div key={field.key} className="relative">
                <Input
                  label={field.label}
                  name={field.key}
                  value={socialMedia[field.key]}
                  onChange={(e) => setSocialMedia({ ...socialMedia, [field.key]: e.target.value })}
                  placeholder={field.placeholder}
                  className="pl-10"
                />
                <Icon className="absolute top-[34px] left-3 size-4 text-gray-500" />
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={handleSaveSocialMedia} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Social Links"}
          </Button>
        </div>
      </div>
    </div>
  );
};
