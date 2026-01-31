"use client";

import { toast } from "sonner";
import React from "react";
import {
  RiPaletteLine,
  RiLayoutGridLine,
  RiCheckLine,
  RiLockLine,
  RiRefreshLine,
  RiEyeLine,
  RiAddLine,
  RiFileTextLine,
  RiSeoLine,
  RiSearchEyeLine,
  RiSettings3Line,
  RiExternalLinkLine,
} from "@remixicon/react";

import { useGetPortfolioQuery, useUpdatePortfolioMutation, useCreatePortfolioMutation } from "@/api/portfolio";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useUserStore } from "@/store/user";
import { cn } from "@/lib";

const TEMPLATES: {
  id: string;
  name: string;
  description: string;
  preview: { bg: string; accent: string };
}[] = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean and simple design with focus on content",
    preview: { bg: "bg-white", accent: "bg-gray-900" },
  },
  {
    id: "modern",
    name: "Modern",
    description: "Contemporary design with bold typography",
    preview: { bg: "bg-slate-50", accent: "bg-blue-600" },
  },
  {
    id: "creative",
    name: "Creative",
    description: "Unique layout for creative professionals",
    preview: { bg: "bg-purple-50", accent: "bg-purple-600" },
  },
  {
    id: "developer",
    name: "Developer",
    description: "Tech-focused with code-like aesthetics",
    preview: { bg: "bg-gray-900", accent: "bg-green-500" },
  },
  {
    id: "elegant",
    name: "Elegant",
    description: "Sophisticated and refined presentation",
    preview: { bg: "bg-stone-50", accent: "bg-amber-700" },
  },
  {
    id: "bold",
    name: "Bold",
    description: "Eye-catching with strong visual impact",
    preview: { bg: "bg-black", accent: "bg-red-500" },
  },
];

const DEFAULT_THEME = {
  primary_color: "#6366f1",
  secondary_color: "#a855f7",
  accent_color: "#10b981",
  text_color: "#1f2937",
  background_color: "#ffffff",
  font_family: "Inter",
  font_size: "16px",
};

const DEFAULT_SEO = {
  meta_title: "",
  meta_description: "",
  meta_keywords: "",
  og_image: "",
};

const DEFAULT_SETTINGS = {
  show_projects: true,
  show_experiences: true,
  show_education: true,
  show_skills: true,
  show_certifications: true,
  show_contact: true,
  show_social_links: true,
  enable_analytics: false,
  enable_comments: false,
};

const PRESET_COLORS = {
  primary: ["#6366f1", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6"],
  secondary: ["#a855f7", "#06b6d4", "#22c55e", "#eab308", "#f97316", "#6366f1", "#f43f5e", "#0ea5e9"],
  text: ["#1f2937", "#111827", "#374151", "#4b5563", "#0f172a", "#18181b", "#27272a", "#171717"],
};

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  presets: string[];
}

const ColorPicker = ({ label, value, onChange, presets }: ColorPickerProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-400">{label}</label>
      <div className="flex items-center gap-3">
        <div className="relative">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="size-10 cursor-pointer rounded border border-white/10 bg-transparent"
          />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-28 border border-white/10 bg-white/5 px-3 text-sm text-white uppercase"
          placeholder="#000000"
        />
        <div className="flex gap-1">
          {presets.map((color) => (
            <button
              key={color}
              onClick={() => onChange(color)}
              className={cn(
                "size-6 rounded border-2 transition-all",
                value === color ? "scale-110 border-white" : "border-transparent hover:scale-105",
              )}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const PortfolioSettings = () => {
  const { user, setUser } = useUserStore();
  const isPremium = user?.is_premium;

  const { data: portfolioData, isLoading: isLoadingPortfolio } = useGetPortfolioQuery(null, {
    skip: !isPremium,
  });

  const [createPortfolio, { isLoading: isCreating }] = useCreatePortfolioMutation();
  const [updatePortfolio, { isLoading: isUpdating }] = useUpdatePortfolioMutation();

  const [selectedTemplate, setSelectedTemplate] = React.useState("minimal");
  const [theme, setTheme] = React.useState(DEFAULT_THEME);
  const [portfolioInfo, setPortfolioInfo] = React.useState({
    title: "",
    slug: "",
    tagline: "",
    bio: "",
  });
  const [seo, setSeo] = React.useState(DEFAULT_SEO);
  const [settings, setSettings] = React.useState(DEFAULT_SETTINGS);

  const portfolioSettings = portfolioData?.data || user?.portfolio;
  const hasPortfolio = !!portfolioSettings?.id;

  React.useEffect(() => {
    if (portfolioSettings) {
      setSelectedTemplate(portfolioSettings.template);
      if (portfolioSettings.theme) {
        setTheme({
          ...DEFAULT_THEME,
          ...portfolioSettings.theme,
        });
      }
      setPortfolioInfo({
        title: portfolioSettings.title || "",
        slug: portfolioSettings.slug || "",
        tagline: portfolioSettings.tagline || "",
        bio: portfolioSettings.bio || "",
      });
      if (portfolioSettings.seo) {
        setSeo({
          ...DEFAULT_SEO,
          ...portfolioSettings.seo,
        });
      }
      if (portfolioSettings.settings) {
        setSettings({
          ...DEFAULT_SETTINGS,
          ...portfolioSettings.settings,
        });
      }
    }
  }, [portfolioSettings]);

  // Auto-generate slug from title
  React.useEffect(() => {
    if (!hasPortfolio && portfolioInfo.title) {
      const slug = portfolioInfo.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setPortfolioInfo((prev) => ({ ...prev, slug }));
    }
  }, [portfolioInfo.title, hasPortfolio]);

  const handleCreate = async () => {
    if (!user) return;

    if (!portfolioInfo.title.trim() || !portfolioInfo.slug.trim()) {
      toast.error("Title and slug are required");
      return;
    }

    try {
      const result = await createPortfolio({
        title: portfolioInfo.title,
        slug: portfolioInfo.slug,
        tagline: portfolioInfo.tagline || "",
        bio: portfolioInfo.bio || "",
        template: selectedTemplate,
        theme,
        seo: DEFAULT_SEO,
        settings: DEFAULT_SETTINGS,
      }).unwrap();

      setUser({ ...user, portfolio: result.data });
      toast.success("Portfolio created successfully!");
    } catch {
      toast.error("Failed to create portfolio");
    }
  };

  const handleUpdate = async () => {
    if (!user) return;
    try {
      const result = await updatePortfolio({
        title: portfolioInfo.title,
        slug: portfolioInfo.slug,
        tagline: portfolioInfo.tagline,
        bio: portfolioInfo.bio,
        template: selectedTemplate,
        theme,
        seo,
        settings,
        is_public: portfolioSettings?.is_public ?? false,
      }).unwrap();

      setUser({ ...user, portfolio: result.data });
      toast.success("Portfolio settings saved successfully");
    } catch {
      toast.error("Failed to save portfolio settings");
    }
  };

  const handleReset = () => {
    setSelectedTemplate("minimal");
    setTheme(DEFAULT_THEME);
    setSeo(DEFAULT_SEO);
    setSettings(DEFAULT_SETTINGS);
    toast.success("Settings reset to default. Click Save to apply.");
  };

  const handleThemeChange = (key: keyof typeof theme, value: string) => {
    setTheme((prev) => ({ ...prev, [key]: value }));
  };

  if (!user) return null;

  if (isPremium && isLoadingPortfolio) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-400">Loading portfolio settings...</div>
      </div>
    );
  }

  if (!isPremium) {
    return (
      <div className="space-y-8">
        <div className="border border-white/10 bg-white/5 p-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center bg-white/5">
                <RiLayoutGridLine className="text-primary-100 size-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Portfolio Settings</h3>
                <p className="text-sm text-gray-400">Create and customize your portfolio</p>
              </div>
            </div>
            <Badge className="border-gray-500/30 bg-gray-500/20 text-gray-400">
              <RiLockLine className="mr-1 size-3" />
              Premium Only
            </Badge>
          </div>
          <div className="rounded border border-white/10 bg-white/5 p-6 text-center">
            <RiLockLine className="mx-auto mb-3 size-8 text-gray-500" />
            <p className="mb-2 text-white">Upgrade to Premium</p>
            <p className="mb-4 text-sm text-gray-400">
              Create a stunning portfolio with customizable templates and colors
            </p>
            <Button variant="default">Upgrade Now</Button>
          </div>
        </div>
      </div>
    );
  }

  if (!hasPortfolio) {
    return (
      <div className="space-y-8">
        <div className="border border-white/10 bg-white/5 p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center bg-white/5">
              <RiFileTextLine className="text-primary-100 size-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Create Your Portfolio</h3>
              <p className="text-sm text-gray-400">Set up your portfolio to get started</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Portfolio Title"
              value={portfolioInfo.title}
              onChange={(e) => setPortfolioInfo((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="My Portfolio"
              required
            />
            <Input
              label="URL Slug"
              value={portfolioInfo.slug}
              onChange={(e) =>
                setPortfolioInfo((prev) => ({
                  ...prev,
                  slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""),
                }))
              }
              placeholder="my-portfolio"
              helperText="Your portfolio will be available at this URL"
              required
            />
            <Input
              label="Tagline"
              value={portfolioInfo.tagline}
              onChange={(e) => setPortfolioInfo((prev) => ({ ...prev, tagline: e.target.value }))}
              placeholder="Full-Stack Developer & Designer"
            />
            <Input
              label="Bio"
              value={portfolioInfo.bio}
              onChange={(e) => setPortfolioInfo((prev) => ({ ...prev, bio: e.target.value }))}
              placeholder="A brief introduction about yourself"
            />
          </div>
        </div>
        <div className="border border-white/10 bg-white/5 p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center bg-white/5">
              <RiLayoutGridLine className="text-primary-100 size-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Choose Template</h3>
              <p className="text-sm text-gray-400">Select a template for your portfolio</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TEMPLATES.map((template) => {
              const isSelected = selectedTemplate === template.id;
              return (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={cn(
                    "group relative overflow-hidden border p-4 text-left transition-all",
                    isSelected
                      ? "border-primary-400 bg-primary-400/10"
                      : "border-white/10 bg-white/5 hover:border-white/20",
                  )}
                >
                  <div className={cn("mb-3 flex h-24 items-center justify-center rounded", template.preview.bg)}>
                    <div className="space-y-1.5 text-center">
                      <div className={cn("mx-auto h-2 w-12 rounded", template.preview.accent)} />
                      <div className="mx-auto h-1.5 w-16 rounded bg-gray-300" />
                      <div className="mx-auto h-1.5 w-14 rounded bg-gray-200" />
                    </div>
                  </div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-white">{template.name}</h4>
                      <p className="text-xs text-gray-400">{template.description}</p>
                    </div>
                    {isSelected && (
                      <div className="bg-primary-400 flex size-5 items-center justify-center rounded-full">
                        <RiCheckLine className="size-3 text-black" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        <div className="border border-white/10 bg-white/5 p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center bg-white/5">
              <RiPaletteLine className="text-primary-100 size-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Color Customization</h3>
              <p className="text-sm text-gray-400">Personalize your portfolio colors</p>
            </div>
          </div>
          <div className="space-y-6">
            <ColorPicker
              label="Primary Color"
              value={theme.primary_color}
              onChange={(value) => handleThemeChange("primary_color", value)}
              presets={PRESET_COLORS.primary}
            />
            <ColorPicker
              label="Secondary Color"
              value={theme.secondary_color}
              onChange={(value) => handleThemeChange("secondary_color", value)}
              presets={PRESET_COLORS.secondary}
            />
            <ColorPicker
              label="Text Color"
              value={theme.text_color}
              onChange={(value) => handleThemeChange("text_color", value)}
              presets={PRESET_COLORS.text}
            />
          </div>
        </div>
        <div className="flex justify-end border border-white/10 bg-white/5 p-6">
          <Button onClick={handleCreate} disabled={isCreating || !portfolioInfo.title.trim()}>
            <RiAddLine className="mr-2 size-4" />
            {isCreating ? "Creating..." : "Create Portfolio"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Portfolio Info */}
      <div className="border border-white/10 bg-white/5 p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center bg-white/5">
              <RiFileTextLine className="text-primary-100 size-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Portfolio Information</h3>
              <p className="text-sm text-gray-400">Update your portfolio details</p>
            </div>
          </div>
          <a
            href={`/portfolio/${portfolioInfo.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-400 hover:text-primary-300 flex items-center gap-1.5 text-sm transition-colors"
          >
            <RiExternalLinkLine className="size-4" />
            View Portfolio
          </a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Portfolio Title"
            value={portfolioInfo.title}
            onChange={(e) => setPortfolioInfo((prev) => ({ ...prev, title: e.target.value }))}
            placeholder="My Portfolio"
          />
          <Input
            label="URL Slug"
            value={portfolioInfo.slug}
            onChange={(e) =>
              setPortfolioInfo((prev) => ({
                ...prev,
                slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""),
              }))
            }
            placeholder="my-portfolio"
            helperText={`Your portfolio URL: /portfolio/${portfolioInfo.slug || "your-slug"}`}
          />
          <Input
            label="Tagline"
            value={portfolioInfo.tagline}
            onChange={(e) => setPortfolioInfo((prev) => ({ ...prev, tagline: e.target.value }))}
            placeholder="Full-Stack Developer & Designer"
          />
          <Input
            label="Bio"
            value={portfolioInfo.bio}
            onChange={(e) => setPortfolioInfo((prev) => ({ ...prev, bio: e.target.value }))}
            placeholder="A brief introduction about yourself"
          />
        </div>
      </div>

      {/* Template Selection */}
      <div className="border border-white/10 bg-white/5 p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center bg-white/5">
              <RiLayoutGridLine className="text-primary-100 size-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Portfolio Template</h3>
              <p className="text-sm text-gray-400">Choose a template for your portfolio page</p>
            </div>
          </div>
          <Badge className="border-green-500/30 bg-green-500/20 text-green-400">
            <RiCheckLine className="mr-1 size-3" />
            Active
          </Badge>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TEMPLATES.map((template) => {
            const isSelected = selectedTemplate === template.id;
            return (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={cn(
                  "group relative overflow-hidden border p-4 text-left transition-all",
                  isSelected
                    ? "border-primary-400 bg-primary-400/10"
                    : "border-white/10 bg-white/5 hover:border-white/20",
                )}
              >
                <div className={cn("mb-3 flex h-32 items-center justify-center rounded", template.preview.bg)}>
                  <div className="space-y-2 text-center">
                    <div className={cn("mx-auto h-3 w-16 rounded", template.preview.accent)} />
                    <div className="mx-auto h-2 w-24 rounded bg-gray-300" />
                    <div className="mx-auto h-2 w-20 rounded bg-gray-200" />
                    <div className="flex justify-center gap-1 pt-2">
                      <div className={cn("size-4 rounded", template.preview.accent)} />
                      <div className={cn("size-4 rounded opacity-60", template.preview.accent)} />
                      <div className={cn("size-4 rounded opacity-30", template.preview.accent)} />
                    </div>
                  </div>
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-white">{template.name}</h4>
                    <p className="text-xs text-gray-400">{template.description}</p>
                  </div>
                  {isSelected && (
                    <div className="bg-primary-400 flex size-5 items-center justify-center rounded-full">
                      <RiCheckLine className="size-3 text-black" />
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="flex items-center gap-2 text-sm text-white">
                    <RiEyeLine className="size-4" />
                    Preview
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* SEO Optimization */}
      <div className="border border-white/10 bg-white/5 p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center bg-white/5">
            <RiSeoLine className="text-primary-100 size-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">SEO Optimization</h3>
            <p className="text-sm text-gray-400">Improve your portfolio&apos;s visibility in search engines</p>
          </div>
        </div>
        <div className="space-y-4">
          <Input
            label="Meta Title"
            value={seo.meta_title}
            onChange={(e) => setSeo((prev) => ({ ...prev, meta_title: e.target.value }))}
            placeholder="John Doe - Full-Stack Developer Portfolio"
            helperText="Recommended: 50-60 characters"
          />
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Meta Description</label>
            <Textarea
              value={seo.meta_description}
              onChange={(e) => setSeo((prev) => ({ ...prev, meta_description: e.target.value }))}
              placeholder="A passionate full-stack developer with expertise in React, Node.js, and cloud technologies. View my projects and experience."
              className="min-h-[100px] border-white/10 bg-white/5"
            />
            <p className="text-xs text-gray-500">Recommended: 150-160 characters</p>
          </div>
          <Input
            label="Meta Keywords"
            value={seo.meta_keywords}
            onChange={(e) => setSeo((prev) => ({ ...prev, meta_keywords: e.target.value }))}
            placeholder="developer, portfolio, react, nodejs, web development"
            helperText="Separate keywords with commas"
          />
          <Input
            label="Social Share Image URL"
            value={seo.og_image}
            onChange={(e) => setSeo((prev) => ({ ...prev, og_image: e.target.value }))}
            placeholder="https://example.com/og-image.png"
            helperText="Image shown when sharing on social media (recommended: 1200x630px)"
          />
        </div>
      </div>

      {/* Visibility Settings */}
      <div className="border border-white/10 bg-white/5 p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center bg-white/5">
            <RiSearchEyeLine className="text-primary-100 size-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Visibility Settings</h3>
            <p className="text-sm text-gray-400">Control what visitors can see on your portfolio</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center justify-between border border-white/5 bg-white/5 p-4">
              <div>
                <p className="font-medium text-white">Projects</p>
                <p className="text-sm text-gray-400">Display your projects section</p>
              </div>
              <Switch
                checked={settings.show_projects}
                onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, show_projects: checked }))}
              />
            </div>
            <div className="flex items-center justify-between border border-white/5 bg-white/5 p-4">
              <div>
                <p className="font-medium text-white">Experience</p>
                <p className="text-sm text-gray-400">Display your work experience</p>
              </div>
              <Switch
                checked={settings.show_experiences}
                onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, show_experiences: checked }))}
              />
            </div>
            <div className="flex items-center justify-between border border-white/5 bg-white/5 p-4">
              <div>
                <p className="font-medium text-white">Education</p>
                <p className="text-sm text-gray-400">Display your education history</p>
              </div>
              <Switch
                checked={settings.show_education}
                onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, show_education: checked }))}
              />
            </div>
            <div className="flex items-center justify-between border border-white/5 bg-white/5 p-4">
              <div>
                <p className="font-medium text-white">Skills</p>
                <p className="text-sm text-gray-400">Display your skills section</p>
              </div>
              <Switch
                checked={settings.show_skills}
                onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, show_skills: checked }))}
              />
            </div>
            <div className="flex items-center justify-between border border-white/5 bg-white/5 p-4">
              <div>
                <p className="font-medium text-white">Certifications</p>
                <p className="text-sm text-gray-400">Display your certifications</p>
              </div>
              <Switch
                checked={settings.show_certifications}
                onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, show_certifications: checked }))}
              />
            </div>
            <div className="flex items-center justify-between border border-white/5 bg-white/5 p-4">
              <div>
                <p className="font-medium text-white">Contact Info</p>
                <p className="text-sm text-gray-400">Display contact information</p>
              </div>
              <Switch
                checked={settings.show_contact}
                onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, show_contact: checked }))}
              />
            </div>
            <div className="flex items-center justify-between border border-white/5 bg-white/5 p-4">
              <div>
                <p className="font-medium text-white">Social Links</p>
                <p className="text-sm text-gray-400">Display social media links</p>
              </div>
              <Switch
                checked={settings.show_social_links}
                onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, show_social_links: checked }))}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Settings */}
      <div className="border border-white/10 bg-white/5 p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center bg-white/5">
            <RiSettings3Line className="text-primary-100 size-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Advanced Settings</h3>
            <p className="text-sm text-gray-400">Additional features for your portfolio</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between border border-white/5 bg-white/5 p-4">
            <div>
              <p className="font-medium text-white">Analytics</p>
              <p className="text-sm text-gray-400">Track visitor statistics for your portfolio</p>
            </div>
            <Switch
              checked={settings.enable_analytics}
              onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, enable_analytics: checked }))}
            />
          </div>
          <div className="flex items-center justify-between border border-white/5 bg-white/5 p-4">
            <div>
              <p className="font-medium text-white">Comments</p>
              <p className="text-sm text-gray-400">Allow visitors to leave comments on your portfolio</p>
            </div>
            <Switch
              checked={settings.enable_comments}
              onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, enable_comments: checked }))}
            />
          </div>
        </div>
      </div>

      {/* Color Customization */}
      <div className="border border-white/10 bg-white/5 p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center bg-white/5">
            <RiPaletteLine className="text-primary-100 size-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Color Customization</h3>
            <p className="text-sm text-gray-400">Personalize your portfolio colors</p>
          </div>
        </div>
        <div className="space-y-6">
          <ColorPicker
            label="Primary Color"
            value={theme.primary_color}
            onChange={(value) => handleThemeChange("primary_color", value)}
            presets={PRESET_COLORS.primary}
          />
          <ColorPicker
            label="Secondary Color"
            value={theme.secondary_color}
            onChange={(value) => handleThemeChange("secondary_color", value)}
            presets={PRESET_COLORS.secondary}
          />
          <ColorPicker
            label="Text Color"
            value={theme.text_color}
            onChange={(value) => handleThemeChange("text_color", value)}
            presets={PRESET_COLORS.text}
          />
        </div>
        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium text-gray-400">Preview</label>
          <div className="rounded border border-white/10 p-6" style={{ backgroundColor: theme.background_color }}>
            <div className="space-y-3">
              <h4 className="text-lg font-bold" style={{ color: theme.text_color }}>
                Sample Heading
              </h4>
              <p className="text-sm" style={{ color: theme.text_color, opacity: 0.7 }}>
                This is how your portfolio text will appear with the selected colors.
              </p>
              <div className="flex gap-2">
                <div
                  className="rounded px-4 py-2 text-sm font-medium text-white"
                  style={{ backgroundColor: theme.primary_color }}
                >
                  Primary Button
                </div>
                <div
                  className="rounded px-4 py-2 text-sm font-medium text-white"
                  style={{ backgroundColor: theme.secondary_color }}
                >
                  Secondary
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between border border-white/10 bg-white/5 p-6">
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleReset}>
            <RiRefreshLine className="mr-2 size-4" />
            Reset to Default
          </Button>
        </div>
        <Button onClick={handleUpdate} disabled={isUpdating}>
          {isUpdating ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};
