import { useState, useEffect, useMemo } from 'react';
import { motion, useAnimationControls } from 'motion/react';
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
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);
    const controls = useAnimationControls();

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
            // Add some offset to account for the navigation bar
            const yOffset = -80;
            const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;

            window.scrollTo({
                top: y,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Determine if we should show or hide based on scroll direction
            if (currentScrollY < 100) {
                // Always show at the top of the page
                setIsVisible(true);
            } else if (currentScrollY > lastScrollY) {
                // Scrolling down - hide the navigation
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);

            // Determine active section based on scroll position
            const sections = navItems.map(item => ({
                id: item.id,
                element: document.getElementById(item.id)
            })).filter(item => item.element);

            // Find the section that is currently most visible in the viewport
            let mostVisibleSection = null;
            let maxVisibleHeight = 0;

            for (const section of sections) {
                const rect = section.element?.getBoundingClientRect();
                if (!rect) continue;

                // Calculate how much of the section is in the viewport
                const visibleTop = Math.max(0, rect.top);
                const visibleBottom = Math.min(window.innerHeight, rect.bottom);
                const visibleHeight = Math.max(0, visibleBottom - visibleTop);

                if (visibleHeight > maxVisibleHeight) {
                    maxVisibleHeight = visibleHeight;
                    mostVisibleSection = section.id;
                }
            }

            if (mostVisibleSection && mostVisibleSection !== activeSection) {
                setActiveSection(mostVisibleSection);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY, activeSection, navItems]);

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
    const getPosition = (index: number, total: number, radius: number = 150) => {
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
                className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
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
                            className="absolute top-0 left-0 w-80 h-80 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                            animate={{
                                opacity: isExpanded ? 1 : 0,
                                scale: isExpanded ? 1 : 0.8
                            }}
                            transition={{ duration: 0.5 }}
                        >
                            {isExpanded && (
                                <>
                                    <motion.div
                                        className="absolute top-1/2 left-1/2 w-80 h-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/20"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                    />
                                    <motion.div
                                        className="absolute top-1/2 left-1/2 w-80 h-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-500/20"
                                        style={{ transform: "rotate(45deg)" }}
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    />
                                    <motion.div
                                        className="absolute top-1/2 left-1/2 w-64 h-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-500/20"
                                        style={{ transform: "rotate(25deg)" }}
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                    />
                                </>
                            )}
                        </motion.div>

                        {/* Labels at center when expanded */}
                        {isExpanded && (
                            <motion.div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl border border-slate-700/50 pointer-events-none"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 }}
                            >
                                <h3 className="text-lg font-medium">Navigation</h3>
                                <p className="text-xs text-slate-300">Click on an atom to navigate</p>
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
                                            ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white'
                                            : 'bg-slate-800/90 backdrop-blur-md text-slate-300 hover:text-white'
                                        } flex items-center justify-center transition-colors`}
                                    initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                                    animate={{
                                        opacity: isExpanded ? 1 : 0,
                                        x: position.x,
                                        y: position.y,
                                        scale: position.scale,
                                        width: activeSection === item.id ? 48 : 40,
                                        height: activeSection === item.id ? 48 : 40,
                                        boxShadow: activeSection === item.id
                                            ? "0 0 15px 5px rgba(56, 189, 248, 0.3)"
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
                                        boxShadow: "0 0 15px 5px rgba(56, 189, 248, 0.3)"
                                    }}
                                >
                                    <div className="relative">
                                        {item.icon}

                                        {/* Item label tooltip */}
                                        <motion.span
                                            className="absolute whitespace-nowrap top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900/90 text-xs rounded pointer-events-none"
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
                        className="relative z-20 w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-lg border border-blue-500/30"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{
                            rotate: isExpanded ? 45 : 0,
                            boxShadow: isExpanded
                                ? "0 0 25px 5px rgba(56, 189, 248, 0.4)"
                                : "0 0 15px 2px rgba(56, 189, 248, 0.2)"
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