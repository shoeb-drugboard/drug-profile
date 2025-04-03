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
    textGradient: "to-blue-200",
    iconColor: "text-blue-400",
    sectionGradient: "from-blue-600 to-indigo-400",
    altSectionGradient: "from-blue-400 to-indigo-200",
  },
  green: {
    name: "Research Green",
    primary: "from-emerald-900 via-green-800 to-teal-900",
    secondary: "from-emerald-400 to-green-400",
    accent: "from-emerald-500 to-teal-600",
    highlight: "from-emerald-400 to-teal-500",
    buttonGradient: "from-emerald-600 to-teal-600",
    textGradient: "from-teal-300 to-emerald-200",
    iconColor: "text-emerald-400",
    sectionGradient: "from-emerald-400 to-emerald-600",
    altSectionGradient: "from-teal-400 to-emerald-200",
  },
  purple: {
    name: "Innovation Purple",
    primary: "from-purple-900 via-violet-800 to-indigo-900",
    secondary: "from-purple-500 to-violet-700",
    accent: "from-purple-500 to-violet-600",
    highlight: "from-purple-400 to-violet-500",
    buttonGradient: "from-purple-600 to-indigo-600",
    textGradient: "to-purple-200",
    iconColor: "text-purple-400",
    sectionGradient: "from-purple-400 to-violet-200",
    altSectionGradient: "from-purple-200 to-violet-400",
  },
  red: {
    name: "Medical Red",
    primary: "from-red-600 via-rose-800 to-pink-900",
    secondary: "from-red-200 to-rose-300",
    accent: "from-red-500 to-rose-600",
    highlight: "from-red-400 to-rose-500",
    buttonGradient: "from-red-600 to-rose-600",
    textGradient: "to-red-200",
    iconColor: "text-red-400",
    sectionGradient: "from-rose-400 to-rose-600",
    altSectionGradient: "",
  },
  amber: {
    name: "Pharma Amber",
    primary: "from-amber-900 via-orange-800 to-yellow-900",
    secondary: "from-amber-500 to-orange-700",
    accent: "from-amber-500 to-orange-600",
    highlight: "from-amber-400 to-orange-500",
    buttonGradient: "from-amber-600 to-orange-600",
    textGradient: "to-amber-200",
    iconColor: "text-amber-400",
    sectionGradient: "from-orange-400 to-amber-400",
    altSectionGradient: "",
  },
  teal: {
    name: "Biotech Teal",
    primary: "from-teal-900 via-cyan-800 to-blue-900",
    secondary: "from-teal-500 to-cyan-700",
    accent: "from-teal-500 to-cyan-600",
    highlight: "from-teal-400 to-cyan-500",
    buttonGradient: "from-teal-600 to-cyan-600",
    textGradient: "to-teal-200",
    iconColor: "text-teal-400",
    sectionGradient: "from-cyan-400 to-teal-400",
    altSectionGradient: "",
  },
  black: {
    name: "Elegant Black",
    primary: "from-gray-800 via-gray-400 to-black",
    secondary: "from-gray-400 to-gray-600",
    accent: "from-gray-400 to-gray-800",
    highlight: "from-gray-500 to-gray-700",
    buttonGradient: "from-gray-600 to-black",
    textGradient: "to-gray-300",
    iconColor: "text-gray-400",
    sectionGradient: "from-black to-gray-800",
    altSectionGradient: "from-gray-800 to-black",
  },
  white: {
    name: "Clinical White",
    primary: "bg-white",
    secondary: "bg-white",
    accent: "from-purple-600 to-white", // For text gradient effects
    highlight: "from-white/80 to-black/10",
    buttonGradient: "from-blue-300 to-purple-400", // Gradient for buttons
    textGradient: "text-black", // Purple-blue text gradient
    iconColor: "text-purple-600",
    sectionGradient: "bg-white",
    altSectionGradient: "bg-white",
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
