import { createContext } from "react";

// Pharmaceutical industry inspired color palettes
export const colorThemes = {
  blue: {
    name: "Clinical Blue",
    primary: "from-blue-900 via-indigo-800 to-purple-900",
    secondary: "from-blue-500 to-indigo-700",
    accent: "from-blue-500 to-indigo-600",
    highlight: "from-blue-400 to-indigo-500",
    buttonGradient: "from-blue-600 to-purple-600",
    textGradient: "from-white to-blue-200",
    iconColor: "text-blue-400",
    sectionGradient: "from-slate-900 to-slate-800",
    altSectionGradient: "from-slate-800 to-slate-900",
  },
  green: {
    name: "Research Green",
    primary: "from-emerald-900 via-green-800 to-teal-900",
    secondary: "from-emerald-500 to-green-700",
    accent: "from-emerald-500 to-teal-600",
    highlight: "from-emerald-400 to-teal-500",
    buttonGradient: "from-emerald-600 to-teal-600",
    textGradient: "from-white to-emerald-200",
    iconColor: "text-emerald-400",
    sectionGradient: "from-slate-900 to-slate-800",
    altSectionGradient: "from-slate-800 to-slate-900",
  },
  purple: {
    name: "Innovation Purple",
    primary: "from-purple-900 via-violet-800 to-indigo-900",
    secondary: "from-purple-500 to-violet-700",
    accent: "from-purple-500 to-violet-600",
    highlight: "from-purple-400 to-violet-500",
    buttonGradient: "from-purple-600 to-indigo-600",
    textGradient: "from-white to-purple-200",
    iconColor: "text-purple-400",
    sectionGradient: "from-slate-900 to-slate-800",
    altSectionGradient: "from-slate-800 to-slate-900",
  },
  red: {
    name: "Medical Red",
    primary: "from-red-900 via-rose-800 to-pink-900",
    secondary: "from-red-500 to-rose-700",
    accent: "from-red-500 to-rose-600",
    highlight: "from-red-400 to-rose-500",
    buttonGradient: "from-red-600 to-rose-600",
    textGradient: "from-white to-red-200",
    iconColor: "text-red-400",
    sectionGradient: "from-slate-900 to-slate-800",
    altSectionGradient: "from-slate-800 to-slate-900",
  },
  amber: {
    name: "Pharma Amber",
    primary: "from-amber-900 via-orange-800 to-yellow-900",
    secondary: "from-amber-500 to-orange-700",
    accent: "from-amber-500 to-orange-600",
    highlight: "from-amber-400 to-orange-500",
    buttonGradient: "from-amber-600 to-orange-600",
    textGradient: "from-white to-amber-200",
    iconColor: "text-amber-400",
    sectionGradient: "from-slate-900 to-slate-800",
    altSectionGradient: "from-slate-800 to-slate-900",
  },
  teal: {
    name: "Biotech Teal",
    primary: "from-teal-900 via-cyan-800 to-blue-900",
    secondary: "from-teal-500 to-cyan-700",
    accent: "from-teal-500 to-cyan-600",
    highlight: "from-teal-400 to-cyan-500",
    buttonGradient: "from-teal-600 to-cyan-600",
    textGradient: "from-white to-teal-200",
    iconColor: "text-teal-400",
    sectionGradient: "from-slate-900 to-slate-800",
    altSectionGradient: "from-slate-800 to-slate-900",
  },
};

export type ThemeKey = keyof typeof colorThemes;
export type ThemeColors = (typeof colorThemes)[ThemeKey];

type ThemeContextType = {
  currentTheme: ThemeColors;
  setTheme: (theme: ThemeKey) => void;
};
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
