import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Palette, X } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './ui/tooltip';
import { Button } from './ui/button';
import { colorThemes, ThemeKey } from '@/contexts/ThemeContext';
import useTheme from '@/contexts/useTheme';

interface ThemeSelectorProps {
    className?: string;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { currentTheme, setTheme } = useTheme();

    const toggleOpen = () => setIsOpen(!isOpen);

    const handleThemeChange = (themeKey: ThemeKey) => {
        setTheme(themeKey);
        setIsOpen(false);
    };

    return (
        <div className={`fixed z-40 ${className}`}>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            onClick={toggleOpen}
                            className={`rounded-full w-12 h-12 shadow-lg bg-gradient-to-br ${currentTheme.buttonGradient} text-white hover:opacity-90 border-none`}
                        >
                            {isOpen ? <X size={20} /> : <Palette size={20} />}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                        <p>Change Theme</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 0 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 0 }}
                        className="absolute top-14 right-0 bg-slate-900/90 backdrop-blur-lg rounded-lg p-3 shadow-xl border border-white/10 w-64"
                    >
                        <h3 className="text-white/90 font-medium mb-3 text-sm">Pharma Color Themes</h3>
                        <div className="space-y-2">
                            {Object.entries(colorThemes).map(([key, theme]) => (
                                <motion.button
                                    key={key}
                                    onClick={() => handleThemeChange(key as ThemeKey)}
                                    className={`w-full flex items-center gap-3 p-2 rounded-md ${currentTheme.name === theme.name ? 'bg-white/10' : 'hover:bg-white/5'} transition-colors`}
                                    whileHover={{ x: 3 }}
                                >
                                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${theme.buttonGradient}`} />
                                    <span className="text-white/80 text-sm">{theme.name}</span>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ThemeSelector;
