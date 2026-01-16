import type { TemplateThemeProps } from "@/types";

export const THEMES: TemplateThemeProps[] = [
  {
    id: "classic",
    name: "Classic",
    colors: {
      surfaceColor: "#f8f9fa",
      primaryColor: "#2c3e50",
      secondaryColor: "#34495e",
      textPrimary: "#2c3e50",
      textSecondary: "#7f8c8d",
      borderColor: "#ecf0f1",
    },
  },
  {
    id: "professional",
    name: "Professional",
    colors: {
      surfaceColor: "#f4f6f8",
      primaryColor: "#1a365d",
      secondaryColor: "#2d3748",
      textPrimary: "#1a202c",
      textSecondary: "#4a5568",
      borderColor: "#e2e8f0",
    },
  },
  {
    id: "modern",
    name: "Modern",
    colors: {
      surfaceColor: "#f7fafc",
      primaryColor: "#3182ce",
      secondaryColor: "#4299e1",
      textPrimary: "#2d3748",
      textSecondary: "#718096",
      borderColor: "#e2e8f0",
    },
  },
  {
    id: "executive",
    name: "Executive",
    colors: {
      surfaceColor: "#fafafa",
      primaryColor: "#0f172a",
      secondaryColor: "#334155",
      textPrimary: "#0f172a",
      textSecondary: "#64748b",
      borderColor: "#f1f5f9",
    },
  },
  {
    id: "creative",
    name: "Creative",
    colors: {
      surfaceColor: "#f8f4ff",
      primaryColor: "#7c3aed",
      secondaryColor: "#a855f7",
      textPrimary: "#1e1b4b",
      textSecondary: "#6b7280",
      borderColor: "#e5e7eb",
    },
  },
  {
    id: "minimal",
    name: "Minimal",
    colors: {
      surfaceColor: "#ffffff",
      primaryColor: "#000000",
      secondaryColor: "#374151",
      textPrimary: "#111827",
      textSecondary: "#6b7280",
      borderColor: "#f3f4f6",
    },
  },
  {
    id: "corporate",
    name: "Corporate",
    colors: {
      surfaceColor: "#f9fafb",
      primaryColor: "#1f2937",
      secondaryColor: "#374151",
      textPrimary: "#111827",
      textSecondary: "#6b7280",
      borderColor: "#d1d5db",
    },
  },
  {
    id: "elegant",
    name: "Elegant",
    colors: {
      surfaceColor: "#f8f8f8",
      primaryColor: "#8b5a3c",
      secondaryColor: "#a0522d",
      textPrimary: "#2f1b14",
      textSecondary: "#8b7355",
      borderColor: "#e8e2d4",
    },
  },
];

export const FONTFACES = [
  { label: "Figtree", value: "--font-figtree" },
  { label: "Inter", value: "--font-inter" },
  { label: "Space Grotesk", value: "--font-space-grotesk" },
  { label: "Bricolage Grotesque", value: "--font-bricolage-grotesque" },
  { label: "Nunito", value: "--font-nunito" },
  { label: "Geist", value: "--font-geist" },
  { label: "JetBrains Mono", value: "--font-jetbrains-mono" },
  { label: "Fira Code", value: "--font-fira-code" },
];
