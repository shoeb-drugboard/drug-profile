import React, { useState, useEffect, useMemo } from 'react';
import { motion, useAnimationControls, useScroll, useMotionValueEvent } from 'motion/react';
import { userData } from '@/assets/data';
import useTheme from '@/contexts/useTheme';
import {
    Home,
    Briefcase,
    GraduationCap,
    BookOpen,
    Target,
    FlaskConical,
    Trophy,
    Calendar,
    UserPlus,
    Atom
} from 'lucide-react';

const MolecularNavigation = () => {
    const [activeSection, setActiveSection] = useState("hero");
    const [isVisible, setIsVisible] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const controls = useAnimationControls();
    const { currentTheme } = useTheme();
    const { scrollY } = useScroll();

    // Navigation items
    const navItems = useMemo(() => [
        { id: "hero", label: "Profile", icon: <Home size={16} /> },
        { id: "stats", label: "Stats", icon: <Target size={16} /> },
        { id: "experience", label: "Experience", icon: <Briefcase size={16} /> },
        { id: "education", label: "Education", icon: <GraduationCap size={16} /> },
        { id: "skills", label: "Skills", icon: <FlaskConical size={16} /> },
        { id: "research", label: "Research", icon: <BookOpen size={16} /> },
        { id: "awards", label: "Awards", icon: <Trophy size={16} /> },
        { id: "activity", label: "Activity", icon: <Calendar size={16} /> },
        { id: "connect", label: "Connect", icon: <UserPlus size={16} /> }
    ], []);

    // Handle scrolling to section
    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
            // Calculate a dynamic offset based on viewport height
            const viewportHeight = window.innerHeight;
            const yOffset = Math.min(viewportHeight * 0.2, 50); // Adaptive offset between 10% of viewport height and max 100px

            // Use motion to animate the scroll
            const y = window.pageYOffset + section.getBoundingClientRect().top + yOffset;

            // Using Framer Motion's animate function for smoother scrolling
            import('motion').then(({ animate }) => {
                animate(window.scrollY, y, {
                    type: 'spring',
                    stiffness: 120,
                    damping: 20,
                    onUpdate: (latest) => window.scrollTo(0, latest)
                });
            });

            // Set active section immediately to avoid flicker during scroll
            setActiveSection(sectionId);

            // Hide expanded navigation
            if (isExpanded) {
                setIsExpanded(false);
                document.body.style.overflow = '';
            }
        }
    };

    // Using Framer Motion's scroll detection
    useMotionValueEvent(scrollY, "change", (latest) => {
        // Determine if we should show or hide based on scroll direction
        const currentScrollY = latest;
        const prevScrollY = scrollY.getPrevious() || 0; // Get previous scroll position

        if (currentScrollY < 100) {
            // Always show at the top of the page
            setIsVisible(true);
        } else if (currentScrollY > prevScrollY + 10) { // Added threshold to prevent flickering
            // Scrolling down - hide the navigation
            setIsVisible(false);
        } else if (currentScrollY < prevScrollY - 10) { // Added threshold to prevent flickering
            setIsVisible(true);
        }

        // Determine active section based on scroll position
        const sections = navItems.map(item => ({
            id: item.id,
            element: document.getElementById(item.id)
        })).filter(item => item.element);

        // Improved algorithm to find the most visible section
        const viewportHeight = window.innerHeight;
        let mostVisibleSection = null;
        let maxVisibleRatio = 0;

        for (const section of sections) {
            const rect = section.element?.getBoundingClientRect();
            if (!rect) continue;

            // Calculate how much of the section is in the viewport
            const visibleTop = Math.max(0, rect.top);
            const visibleBottom = Math.min(viewportHeight, rect.bottom);
            const visibleHeight = Math.max(0, visibleBottom - visibleTop);

            // Calculate the ratio of the section that's visible (between 0 and 1)
            const sectionHeight = rect.height || 1; // Avoid division by zero
            const visibleRatio = visibleHeight / sectionHeight;

            // Factor in position - give preference to sections closer to the middle of the viewport
            const distanceFromMiddle = Math.abs((rect.top + rect.bottom) / 2 - viewportHeight / 2);
            const positionFactor = 1 - Math.min(distanceFromMiddle / (viewportHeight / 2), 1);

            // Combined score based on visibility and position
            const score = visibleRatio * 0.7 + positionFactor * 0.3;

            if (score > maxVisibleRatio) {
                maxVisibleRatio = score;
                mostVisibleSection = section.id;
            }
        }

        if (mostVisibleSection && mostVisibleSection !== activeSection) {
            setActiveSection(mostVisibleSection);
        }
    });

    useEffect(() => {
        controls.start(isVisible ? "visible" : "hidden");
    }, [isVisible, controls]);

    const toggleExpansion = () => {
        setIsExpanded(prevState => {
            const newExpandedState = !prevState;

            // Toggle body scroll based on new state
            document.body.style.overflow = newExpandedState ? 'hidden' : '';

            return newExpandedState;
        });
    };

    // Molecular positioning utilities for centered layout
    const getPosition = (index: number, total: number, radius: number = 200) => {
        if (!isExpanded) {
            return { x: 0, y: 0, scale: 0 };
        }

        // Create a circular pattern
        const angle = (index / total) * Math.PI * 2;

        return {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
            scale: 1
        };
    };

    return (
        <>
            {/* Full-screen backdrop when expanded */}
            <motion.div
                className="fixed h-full inset-0 bg-black/60 backdrop-blur-md z-40"
                initial={{ opacity: 0 }}
                animate={{
                    opacity: isExpanded ? 1 : 0,
                    pointerEvents: isExpanded ? "auto" : "none",
                }}
                transition={{ duration: 0.3 }}
                onClick={() => {
                    setIsExpanded(false);
                    document.body.style.overflow = '';
                }}
            />

            <motion.nav
                className="fixed top-4 right-4 z-50"
                initial="visible"
                animate={controls}
                variants={{
                    visible: { y: 0, opacity: 1 },
                    hidden: { y: -100, opacity: 0 }
                }}
                transition={{ duration: 0.3 }}
            >
                {/* Central navigation wrapper when expanded */}
                <motion.div
                    className="fixed inset-0 pointer-events-none flex items-center justify-center z-50"
                    animate={{ opacity: isExpanded ? 1 : 0 }}
                >
                    {/* Centered Orbital system */}
                    <motion.div
                        className={`relative ${isExpanded ? 'pointer-events-auto' : 'pointer-events-none'}`}
                    >
                        {/* Electron Orbitals - For Visual Effect */}
                        <motion.div
                            className="absolute top-0 left-0 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                            animate={{
                                opacity: isExpanded ? 1 : 0,
                                scale: isExpanded ? 1 : 0.8
                            }}
                            transition={{ duration: 0.5 }}
                        >
                            {isExpanded && (
                                <>
                                    <motion.div
                                        className={`absolute top-1/2 left-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-${currentTheme.iconColor.replace('text-', '')}/20`}
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                                    />
                                    <motion.div
                                        className={`absolute top-1/2 left-1/2 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-${currentTheme.iconColor.replace('text-', '')}/20`}
                                        style={{ transform: "rotate(45deg)" }}
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                                    />
                                    <motion.div
                                        className={`absolute top-1/2 left-1/2 w-[300px] h-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-${currentTheme.iconColor.replace('text-', '')}/20`}
                                        style={{ transform: "rotate(25deg)" }}
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                    />
                                </>
                            )}
                        </motion.div>

                        {/* Labels at center when expanded */}
                        {isExpanded && (
                            <motion.div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white bg-slate-900/70 backdrop-blur-md p-5 rounded-2xl border border-slate-700/50 pointer-events-none shadow-lg"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 }}
                            >
                                <h3 className="text-xl font-medium">{userData.name.split(',')[0].split('.').slice(-1)[0].split(' ')[2]}'s</h3>
                                <p className="text-sm text-slate-300">Journey</p>
                            </motion.div>
                        )}

                        {/* Atoms/Electrons - Navigation Items */}
                        {navItems.map((item, index) => {
                            const position = getPosition(index, navItems.length);

                            return (
                                <motion.button
                                    key={item.id}
                                    onClick={() => {
                                        scrollToSection(item.id);
                                        setIsExpanded(false);
                                        document.body.style.overflow = '';
                                    }}
                                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 rounded-full shadow-lg 
                                        ${activeSection === item.id
                                            ? `bg-gradient-to-br ${currentTheme.buttonGradient} text-white`
                                            : 'bg-slate-800/90 backdrop-blur-md text-slate-300 hover:text-white'
                                        } flex items-center justify-center transition-colors`}
                                    initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                                    animate={{
                                        opacity: isExpanded ? 1 : 0,
                                        x: position.x,
                                        y: position.y,
                                        scale: position.scale,
                                        width: activeSection === item.id ? 60 : 50,
                                        height: activeSection === item.id ? 60 : 50,
                                        boxShadow: activeSection === item.id
                                            ? `0 0 15px 5px ${currentTheme.iconColor.replace('text-', 'rgba(')}, 0.3)`
                                            : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                                        pointerEvents: isExpanded ? "auto" : "none"
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20,
                                        delay: index * 0.05
                                    }}
                                    whileHover={{
                                        scale: position.scale * 1.2,
                                        boxShadow: `0 0 15px 5px ${currentTheme.iconColor.replace('text-', 'rgba(')}, 0.3)`
                                    }}
                                >
                                    <div className="relative">
                                        {React.cloneElement(item.icon, { size: 24 })}

                                        {/* Item label tooltip */}
                                        <motion.span
                                            className="absolute whitespace-nowrap top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-900/90 text-sm font-medium rounded-md pointer-events-none shadow-lg"
                                            initial={{ opacity: 0, y: -5 }}
                                            animate={{
                                                opacity: isExpanded ? 1 : 0,
                                                y: isExpanded ? 0 : -5
                                            }}
                                            transition={{ duration: 0.2, delay: 0.1 + index * 0.05 }}
                                        >
                                            {item.label}
                                        </motion.span>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </motion.div>
                </motion.div>

                {/* Always visible trigger button */}
                <div className="relative">
                    {/* Nucleus - Core Navigation Control */}
                    <motion.button
                        onClick={toggleExpansion}
                        className={`relative z-20 w-14 h-14 rounded-full bg-gradient-to-br ${currentTheme.buttonGradient} flex items-center justify-center text-white shadow-lg border border-${currentTheme.iconColor.replace('text-', '')}/30`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{
                            rotate: isExpanded ? 45 : 0,
                            boxShadow: isExpanded
                                ? `0 0 25px 5px ${currentTheme.iconColor.replace('text-', 'rgba(')}, 0.4)`
                                : `0 0 15px 2px ${currentTheme.iconColor.replace('text-', 'rgba(')}, 0.2)`
                        }}
                        transition={{
                            rotate: { duration: 0.3 },
                            boxShadow: { duration: 1, repeat: Infinity, repeatType: "reverse" }
                        }}
                    >
                        <Atom size={24} />
                    </motion.button>
                </div>
            </motion.nav>
        </>
    );
};

export default MolecularNavigation;