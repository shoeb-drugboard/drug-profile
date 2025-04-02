import React from 'react';
import { cn } from "@/lib/utils";
import useTheme from "@/contexts/useTheme";
import { motion } from "motion/react";

export type FrameType = 'benzene' | 'dna' | 'peptide' | 'hexagon' | 'circle';

interface MolecularAvatarProps {
    src: string;
    alt: string;
    frameType?: FrameType;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    showAnimation?: boolean;
    fallback?: string;
}

export const MolecularAvatar: React.FC<MolecularAvatarProps> = ({
    src,
    alt,
    frameType = 'benzene',
    size = 'lg',
    className = '',
    showAnimation = true,
    fallback = 'NA'
}) => {
    const { currentTheme } = useTheme();

    // Size mapping - increased to make frames more prominent
    const sizeClasses = {
        sm: 'w-40 h-40',
        md: 'w-48 h-48',
        lg: 'w-56 h-56',
        xl: 'w-64 h-64'
    };

    // Create the container class based on size
    const containerClass = `relative ${sizeClasses[size]} ${className}`;

    // Get gradient colors from theme properly
    const getGradientColors = () => {

        // Fallback to direct color mapping if parsing fails
        return {
            fromColor: getCssColor(currentTheme.iconColor.replace('text-', '')) || '#3b82f6',
            toColor: getCssColor(currentTheme.accent.split('to-')[1]) || '#8b5cf6',
        };
    };

    // Helper to map Tailwind color classes to hex values
    const getCssColor = (colorClass: string) => {
        // Map common Tailwind colors to hex values
        const colorMap: Record<string, string> = {
            'blue-400': '#60a5fa', 'blue-500': '#3b82f6', 'blue-600': '#2563eb',
            'purple-400': '#c084fc', 'purple-500': '#a855f7', 'purple-600': '#9333ea',
            'emerald-400': '#34d399', 'emerald-500': '#10b981', 'emerald-600': '#059669',
            'teal-400': '#2dd4bf', 'teal-500': '#14b8a6', 'teal-600': '#0d9488',
            'red-400': '#f87171', 'red-500': '#ef4444', 'red-600': '#dc2626',
            'amber-400': '#fbbf24', 'amber-500': '#f59e0b', 'amber-600': '#d97706',
        };

        return colorMap[colorClass] || null;
    };

    // Extracted colors for the gradient
    const { fromColor, toColor } = getGradientColors();

    // Calculate image size (smaller than container to fit inside the frame)
    const getImageSizeClass = () => {
        switch (size) {
            case 'sm': return 'w-24 h-24';
            case 'md': return 'w-30 h-30';
            case 'lg': return 'w-36 h-36';
            case 'xl': return 'w-40 h-40';
            default: return 'w-36 h-36';
        }
    };

    // Render the appropriate frame
    const renderFrame = () => {
        switch (frameType) {
            case 'benzene':
                return (
                    <div className="absolute inset-0 z-10">
                        <svg viewBox="0 0 200 200" className="w-full h-full">
                            <defs>
                                <linearGradient id="benzeneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor={fromColor} />
                                    <stop offset="100%" stopColor={toColor} />
                                </linearGradient>
                            </defs>
                            {/* Hexagon shape - larger to contain the image */}
                            <motion.polygon
                                points="100,5 180,45 180,155 100,195 20,155 20,45"
                                fill="none"
                                strokeWidth="4"
                                stroke="url(#benzeneGradient)"
                                animate={showAnimation ? { rotate: [0, 360] } : undefined}
                                transition={showAnimation ? { duration: 60, repeat: Infinity, ease: "linear" } : undefined}
                            />
                            {/* Benzene double bonds */}
                            <motion.g
                                strokeWidth="3"
                                stroke="url(#benzeneGradient)"
                                animate={showAnimation ? { rotate: [0, -360] } : undefined}
                                transition={showAnimation ? { duration: 50, repeat: Infinity, ease: "linear" } : undefined}
                            >
                                <line x1="100" y1="5" x2="100" y2="25" />
                                <line x1="180" y1="45" x2="160" y2="55" />
                                <line x1="180" y1="155" x2="160" y2="145" />
                                <line x1="100" y1="195" x2="100" y2="175" />
                                <line x1="20" y1="155" x2="40" y2="145" />
                                <line x1="20" y1="45" x2="40" y2="55" />
                            </motion.g>
                            {/* Center circle that will contain the image */}
                            <circle cx="100" cy="100" r="50" fill="white" stroke="url(#benzeneGradient)" strokeWidth="2" />
                        </svg>
                    </div>
                );

            case 'dna':
                return (
                    <div className="absolute inset-0 z-10">
                        <svg viewBox="0 0 200 200" className="w-full h-full">
                            <defs>
                                <linearGradient id="dnaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor={fromColor} />
                                    <stop offset="100%" stopColor={toColor} />
                                </linearGradient>
                            </defs>
                            {/* Double helix spirals - expanded */}
                            <motion.path
                                d="M30,10 C60,35 140,65 170,90 C140,115 60,145 30,170 C60,195 140,215 170,230"
                                fill="none"
                                strokeWidth="4"
                                stroke="url(#dnaGradient)"
                                animate={showAnimation ? {
                                    y: [0, -20, 0],
                                    pathLength: [0.9, 1, 0.9]
                                } : undefined}
                                transition={showAnimation ? { duration: 6, repeat: Infinity, ease: "easeInOut" } : undefined}
                            />
                            <motion.path
                                d="M170,-10 C140,15 60,45 30,70 C60,95 140,125 170,150 C140,175 60,195 30,210"
                                fill="none"
                                strokeWidth="4"
                                stroke="url(#dnaGradient)"
                                animate={showAnimation ? {
                                    y: [0, 20, 0],
                                    pathLength: [0.9, 1, 0.9]
                                } : undefined}
                                transition={showAnimation ? { duration: 6, repeat: Infinity, ease: "easeInOut" } : undefined}
                            />
                            {/* Connecting lines */}
                            <motion.g
                                stroke="url(#dnaGradient)"
                                strokeWidth="2"
                                animate={showAnimation ? { opacity: [0.5, 1, 0.5] } : undefined}
                                transition={showAnimation ? { duration: 3, repeat: Infinity } : undefined}
                            >
                                {[20, 40, 60, 80, 100, 120, 140, 160, 180].map((y, i) => (
                                    <line
                                        key={i}
                                        x1="40"
                                        y1={y}
                                        x2="160"
                                        y2={y}
                                    />
                                ))}
                            </motion.g>
                            {/* Center circle that will contain the image */}
                            <circle cx="100" cy="100" r="50" fill="white" stroke="url(#dnaGradient)" strokeWidth="2" />
                        </svg>
                    </div>
                );

            case 'peptide':
                return (
                    <div className="absolute inset-0 z-10">
                        <svg viewBox="0 0 200 200" className="w-full h-full">
                            <defs>
                                <linearGradient id="peptideGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor={fromColor} />
                                    <stop offset="100%" stopColor={toColor} />
                                </linearGradient>
                            </defs>
                            {/* Peptide chain backbone - larger */}
                            <motion.g
                                stroke="url(#peptideGradient)"
                                strokeWidth="4"
                                fill="none"
                                animate={showAnimation ? { rotate: [0, 5, 0, -5, 0] } : undefined}
                                transition={showAnimation ? { duration: 10, repeat: Infinity, ease: "easeInOut" } : undefined}
                            >
                                <path d="M25,40 L55,20 L85,40 L115,20 L145,40 L175,20" />
                                <path d="M25,100 L55,80 L85,100 L115,80 L145,100 L175,80" />
                                <path d="M25,160 L55,140 L85,160 L115,140 L145,160 L175,140" />

                                {/* Vertical connectors */}
                                <line x1="55" y1="20" x2="55" y2="80" />
                                <line x1="85" y1="40" x2="85" y2="100" />
                                <line x1="115" y1="20" x2="115" y2="80" />
                                <line x1="145" y1="40" x2="145" y2="100" />
                                <line x1="55" y1="80" x2="55" y2="140" />
                                <line x1="85" y1="100" x2="85" y2="160" />
                                <line x1="115" y1="80" x2="115" y2="140" />
                                <line x1="145" y1="100" x2="145" y2="160" />
                            </motion.g>

                            {/* Amino acid side chains */}
                            <motion.g
                                stroke="url(#peptideGradient)"
                                strokeWidth="3"
                                fill="none"
                                animate={showAnimation ? {
                                    rotate: [0, -5, 0, 5, 0],
                                    y: [0, 2, 0, -2, 0]
                                } : undefined}
                                transition={showAnimation ? { duration: 7, repeat: Infinity, ease: "easeInOut" } : undefined}
                            >
                                <circle cx="55" cy="20" r="6" />
                                <circle cx="85" cy="40" r="6" />
                                <circle cx="115" cy="20" r="6" />
                                <circle cx="145" cy="40" r="6" />
                                <circle cx="55" cy="80" r="6" />
                                <circle cx="85" cy="100" r="6" />
                                <circle cx="115" cy="80" r="6" />
                                <circle cx="145" cy="100" r="6" />
                                <circle cx="55" cy="140" r="6" />
                                <circle cx="85" cy="160" r="6" />
                                <circle cx="115" cy="140" r="6" />
                                <circle cx="145" cy="160" r="6" />
                            </motion.g>

                            {/* Center circle that will contain the image */}
                            <circle cx="100" cy="100" r="50" fill="white" stroke="url(#peptideGradient)" strokeWidth="2" />
                        </svg>
                    </div>
                );

            default: // circle frame
                return (
                    <div className="absolute inset-0 z-10">
                        <svg viewBox="0 0 200 200" className="w-full h-full">
                            <defs>
                                <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor={fromColor} />
                                    <stop offset="100%" stopColor={toColor} />
                                </linearGradient>
                            </defs>

                            {/* Concentric circles - larger */}
                            <motion.g
                                stroke="url(#circleGradient)"
                                fill="none"
                                strokeWidth="4"
                                animate={showAnimation ? { scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] } : undefined}
                                transition={showAnimation ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : undefined}
                            >
                                <circle cx="100" cy="100" r="95" />
                            </motion.g>

                            <motion.g
                                stroke="url(#circleGradient)"
                                fill="none"
                                strokeWidth="2"
                                animate={showAnimation ? { scale: [1.05, 1, 1.05], opacity: [1, 0.8, 1] } : undefined}
                                transition={showAnimation ? { duration: 5, repeat: Infinity, ease: "easeInOut" } : undefined}
                            >
                                <circle cx="100" cy="100" r="85" />
                            </motion.g>

                            <motion.g
                                stroke="url(#circleGradient)"
                                fill="none"
                                strokeWidth="1.5"
                                animate={showAnimation ? { scale: [1, 1.03, 1], opacity: [0.8, 1, 0.8] } : undefined}
                                transition={showAnimation ? { duration: 6, repeat: Infinity, ease: "easeInOut" } : undefined}
                            >
                                <circle cx="100" cy="100" r="75" />
                            </motion.g>

                            {/* Center circle that will contain the image */}
                            <circle cx="100" cy="100" r="50" fill="white" stroke="url(#circleGradient)" strokeWidth="1" />
                        </svg>
                    </div>
                );
        }
    };

    // Fallback text for when image fails to load
    const getFallbackInitials = () => {
        return fallback.substring(0, 2).toUpperCase();
    };

    return (
        <div className={cn(containerClass)}>
            {/* The frame goes first so it's behind the image */}
            {renderFrame()}

            {/* Image container - centered and smaller than the frame */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                <div className={`rounded-full overflow-hidden ${getImageSizeClass()}`}>
                    {src ? (
                        <img
                            src={src}
                            alt={alt}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                document.getElementById(`fallback-${fallback}`)?.classList.remove('hidden');
                            }}
                        />
                    ) : null}
                    <div
                        id={`fallback-${fallback}`}
                        className={`${!src ? '' : 'hidden'} w-full h-full flex items-center justify-center bg-gradient-to-br ${currentTheme.accent} text-white text-3xl font-bold`}
                    >
                        {getFallbackInitials()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MolecularAvatar;
