import type { TemplateThemeProps } from "@/types";

export const THEMES: TemplateThemeProps[] = [
  {
    id: "light",
    name: "Light",
    colors: {
      background: "#ffffff",
      surface: "#f5f5f5",
      primary: "#1976d2",
      secondary: "#424242",
      text: "#212121",
      textSecondary: "#757575",
      border: "#e0e0e0",
    },
  },
  {
    id: "dark",
    name: "Dark",
    colors: {
      background: "#121212",
      surface: "#1e1e1e",
      primary: "#90caf9",
      secondary: "#b0bec5",
      text: "#ffffff",
      textSecondary: "#b0bec5",
      border: "#333333",
    },
  },
  {
    id: "solarized",
    name: "Solarized",
    colors: {
      background: "#002b36",
      surface: "#073642",
      primary: "#268bd2",
      secondary: "#859900",
      text: "#839496",
      textSecondary: "#586e75",
      border: "#073642",
    },
  },
  {
    id: "monokai",
    name: "Monokai",
    colors: {
      background: "#272822",
      surface: "#3e3d32",
      primary: "#f92672",
      secondary: "#fd971f",
      text: "#f8f8f2",
      textSecondary: "#75715e",
      border: "#3e3d32",
    },
  },
  {
    id: "nord",
    name: "Nord",
    colors: {
      background: "#2e3440",
      surface: "#3b4252",
      primary: "#88c0d0",
      secondary: "#81a1c1",
      text: "#eceff4",
      textSecondary: "#d8dee9",
      border: "#434c5e",
    },
  },
];
