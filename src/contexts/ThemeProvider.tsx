import { useState, ReactNode, useEffect } from "react";
import { ThemeContext, colorThemes, ThemeColors, ThemeKey } from "./ThemeContext";

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState<ThemeColors>(colorThemes.blue);

    const setTheme = (themeKey: ThemeKey) => {
        setCurrentTheme(colorThemes[themeKey]);
    };

    // Add theme attributes to the body element for global CSS access
    useEffect(() => {
        // Remove all theme classes
        document.body.classList.remove(
            'theme-blue',
            'theme-green',
            'theme-purple',
            'theme-red',
            'theme-amber',
            'theme-teal'
        );

        // Add current theme class
        const themeName = Object.entries(colorThemes).find(
            ([_, theme]) => theme.name === currentTheme.name
        )?.[0];

        if (themeName) {
            document.body.classList.add(`theme-${themeName}`);
        }
    }, [currentTheme]);

    return (
        <ThemeContext.Provider value={{ currentTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};


