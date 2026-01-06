import type { TemplateThemeProps } from "@/types";

export const THEMES: TemplateThemeProps[] = [
  {
    id: "light",
    name: "Light",
    colors: {
      backgroundColor: "#ffffff",
      surfaceColor: "#f5f5f5",
      primaryColor: "#1976d2",
      secondaryColor: "#424242",
      textPrimary: "#212121",
      textSecondary: "#757575",
      border: "#e0e0e0",
    },
  },
  {
    id: "dark",
    name: "Dark",
    colors: {
      backgroundColor: "#121212",
      surfaceColor: "#1e1e1e",
      primaryColor: "#90caf9",
      secondaryColor: "#b0bec5",
      textPrimary: "#ffffff",
      textSecondary: "#b0bec5",
      border: "#333333",
    },
  },
  {
    id: "solarized",
    name: "Solarized",
    colors: {
      backgroundColor: "#002b36",
      surfaceColor: "#073642",
      primaryColor: "#268bd2",
      secondaryColor: "#859900",
      textPrimary: "#839496",
      textSecondary: "#586e75",
      border: "#073642",
    },
  },
  {
    id: "monokai",
    name: "Monokai",
    colors: {
      backgroundColor: "#272822",
      surfaceColor: "#3e3d32",
      primaryColor: "#f92672",
      secondaryColor: "#fd971f",
      textPrimary: "#f8f8f2",
      textSecondary: "#75715e",
      border: "#3e3d32",
    },
  },
  {
    id: "nord",
    name: "Nord",
    colors: {
      backgroundColor: "#2e3440",
      surfaceColor: "#3b4252",
      primaryColor: "#88c0d0",
      secondaryColor: "#81a1c1",
      textPrimary: "#eceff4",
      textSecondary: "#d8dee9",
      border: "#434c5e",
    },
  },
];
