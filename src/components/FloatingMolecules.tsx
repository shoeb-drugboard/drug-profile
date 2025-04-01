import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import useTheme from '@/contexts/useTheme';

interface FloatingMoleculesProps {
    count?: number;
    color?: string;
    secondaryColor?: string;
    speed?: number;
    backgroundColor?: string;
    minSize?: number;
    maxSize?: number;
}

const FloatingMolecules: React.FC<FloatingMoleculesProps> = ({
    count = 10,
    color,
    secondaryColor,
    speed = 0.5,
    backgroundColor = 'transparent',
    minSize = 60,
    maxSize = 200
}) => {
    const [blurBalls, setBlurBalls] = useState<React.ReactNode[]>([]);
    const { currentTheme } = useTheme();

    // Default colors based on the current theme if not provided
    const getThemeColor = (cssVar: string) => {
        // Extract the color name from CSS variable format
        const colorName = cssVar.replace('text-', '');
        if (colorName === 'blue-400') return '#60a5fa';
        if (colorName === 'purple-400') return '#c084fc';
        if (colorName === 'emerald-400') return '#34d399';
        if (colorName === 'red-400') return '#f87171';
        if (colorName === 'amber-400') return '#fbbf24';
        if (colorName === 'teal-400') return '#2dd4bf';
        // Return a default color if not found
        return '#60a5fa';
    };

    const primaryColor = color || getThemeColor(currentTheme.iconColor);
    const secondaryThemeColor = secondaryColor || getThemeColor(currentTheme.accent.split(' ')[0].replace('from-', ''));

    // Generate random position within viewport bounds
    const getRandomPosition = useCallback(() => {
        return {
            x: `${Math.random() * 100}vw`,
            y: `${Math.random() * 100}vh`,
        };
    }, []);

    // Create a random animation duration (affected by speed)
    const getRandomDuration = useCallback(() => {
        return 20 + Math.random() * 80 / speed;
    }, [speed]);

    // Create a single blur ball with random properties
    const createBlurBall = useCallback((index: number) => {
        // Random size between min and max
        const size = Math.random() * (maxSize - minSize) + minSize;

        // Random color (either primary or secondary)
        const ballColor = Math.random() > 0.5 ? primaryColor : secondaryThemeColor;

        // Random opacity for varied blur effect
        const opacity = 0.1 + Math.random() * 0.3;

        // Random initial position
        const initialPosition = getRandomPosition();

        // Animation properties
        const duration = getRandomDuration();

        // Create animation paths that look random but stay in viewport
        const animate = {
            x: [
                initialPosition.x,
                `${parseFloat(initialPosition.x as string) + (Math.random() - 0.5) * 30}vw`,
                `${parseFloat(initialPosition.x as string) + (Math.random() - 0.5) * 20}vw`,
                initialPosition.x
            ],
            y: [
                initialPosition.y,
                `${parseFloat(initialPosition.y as string) + (Math.random() - 0.5) * 30}vh`,
                `${parseFloat(initialPosition.y as string) + (Math.random() - 0.5) * 20}vh`,
                initialPosition.y
            ],
            scale: [
                1,
                1 + Math.random() * 0.2,
                1 - Math.random() * 0.2,
                1
            ],
        };

        return (
            <motion.div
                key={index}
                className="blur-ball"
                animate={animate}
                transition={{
                    duration,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    times: [0, 0.33, 0.66, 1]
                }}
                style={{
                    position: 'absolute',
                    width: `${size}px`,
                    height: `${size}px`,
                    borderRadius: '50%',
                    background: ballColor,
                    filter: `blur(${size / 3}px)`,
                    opacity,
                    left: initialPosition.x,
                    top: initialPosition.y,
                    zIndex: -1,
                }}
            />
        );
    }, [primaryColor, secondaryThemeColor, minSize, maxSize, getRandomPosition, getRandomDuration]);

    // Generate all blur balls on component mount or when theme changes
    useEffect(() => {
        const balls = [];
        for (let i = 0; i < count; i++) {
            balls.push(createBlurBall(i));
        }
        setBlurBalls(balls);
    }, [count, createBlurBall, currentTheme]); // Added currentTheme dependency

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1,
                overflow: 'hidden',
                backgroundColor,
                pointerEvents: 'none',
            }}
        >
            {blurBalls}
        </div>
    );
};

export default FloatingMolecules;
