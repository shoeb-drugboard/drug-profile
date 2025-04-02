import { useRef, useState, useEffect } from "react";
import { userData, impactBreakdown } from "@/assets/data";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { Badge } from '../ui/badge';
import { Button } from "../ui/button";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import useTheme from "@/contexts/useTheme";
import MolecularAvatar from "../ui/MolecularAvatar";
import {
    Mouse,
    ArrowDown,
    Trophy,
    FileCheck,
    Target,
    Share2,
    UserPlus,
    Mail,
    MapPin,
    Microscope,
    BookOpen,
    FlaskConical,
    Award,
    Briefcase,
} from 'lucide-react';
import ThemeSelector from "../ThemeSelector";

const HeroSection = () => {
    // Create a client-side only flag
    const [isClient, setIsClient] = useState(false);
    const [frameType, setFrameType] = useState<'benzene' | 'dna' | 'peptide' | 'hexagon' | 'circle'>('benzene');
    const { scrollY } = useScroll();
    const ref = useRef(null);
    const { currentTheme } = useTheme();

    const y = useTransform(scrollY, [0, 500], [0, -150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const scale = useTransform(scrollY, [0, 300], [1, 0.9]);

    const springY = useSpring(y, { stiffness: 100, damping: 30 });
    const springOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });
    const springScale = useSpring(scale, { stiffness: 100, damping: 30 });

    // Set isClient to true after component mount
    useEffect(() => {
        setIsClient(true);
    }, []);

    const yScroll = useTransform(scrollY, [0, 500], [0, 100]);
    const scaleScroll = useTransform(scrollY, [0, 500], [1, 1.1]);

    // Frame options for the avatar
    const frameOptions = [
        { type: 'benzene', label: 'Benzene Ring' },
        { type: 'dna', label: 'DNA Helix' },
        { type: 'peptide', label: 'Peptide Chain' },
        { type: 'circle', label: 'Circular' }
    ];

    // Handle frame selection
    const handleFrameChange = (type: 'benzene' | 'dna' | 'peptide' | 'circle') => {
        setFrameType(type);
    };

    return (
        <motion.div
            ref={ref}
            className={`relative min-h-screen w-full overflow-hidden grid place-content-center`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <ThemeSelector className="top-20 right-4" />
            {/* Parallax background with gradient overlay */}
            <motion.div
                className={`absolute inset-0 z-0 bg-gradient-to-br ${currentTheme.primary}`}
                style={isClient ? {
                    y: yScroll,
                    scale: scaleScroll
                } : {}}
            >
                <div className="absolute inset-0 bg-black opacity-50"></div>

                {/* Only render floating elements on client */}
                {isClient && (
                    <>
                        <motion.div
                            className={`absolute top-1/4 left-1/4 w-32 h-32 rounded-full ${currentTheme.iconColor.replace('text-', 'bg-')} opacity-20 blur-xl`}
                            animate={{
                                x: [0, 20, 0],
                                y: [0, -20, 0],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 8,
                                ease: "easeInOut"
                            }}
                        />

                        <motion.div
                            className="absolute top-1/3 right-1/3 w-48 h-48 rounded-full bg-purple-400 opacity-10 blur-xl"
                            animate={{
                                x: [0, -30, 0],
                                y: [0, 30, 0],
                                scale: [1, 1.2, 1]
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 10,
                                ease: "easeInOut"
                            }}
                        />

                        <motion.div
                            className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-indigo-400 opacity-15 blur-xl"
                            animate={{
                                x: [0, 25, 0],
                                y: [0, 25, 0],
                                scale: [1, 1.15, 1]
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 12,
                                ease: "easeInOut"
                            }}
                        />
                    </>
                )}
            </motion.div>

            {/* Content container */}
            <motion.div
                className="container relative z-10 text-white px-6 py-12"
                style={isClient ? {
                    y: springY,
                    opacity: springOpacity,
                    scale: springScale
                } : {}}
            >
                {/* Profile header - 2 columns layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Left column - Profile image & impact metrics */}
                    <div className="md:col-span-1">
                        <motion.div
                            className="relative"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                                delay: 0.3
                            }}
                        >
                            {/* Replace Avatar with MolecularAvatar */}
                            <MolecularAvatar
                                src={'/image.png'}
                                alt={userData.name}
                                frameType={frameType}
                                size="xl"
                                fallback="NPA"
                                className=""
                            />

                            {/* Frame selector */}
                            <div className="mt-3 flex flex-wrap justify-center gap-2">
                                {frameOptions.map((option) => (
                                    <button
                                        key={option.type}
                                        onClick={() => handleFrameChange(option.type as 'benzene' | 'dna' | 'peptide' | 'circle')}
                                        className={`text-xs px-2 py-1 rounded-full transition-colors ${frameType === option.type
                                            ? `bg-gradient-to-r ${currentTheme.buttonGradient} text-white`
                                            : 'bg-white/10 text-blue-100 hover:bg-white/20'
                                            }`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>

                            {/* Impact score badge */}
                            <motion.div
                                className="absolute top-32 right-32 transform translate-x-5 z-50"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.8, duration: 0.5 }}
                            >
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <div className={`bg-gradient-to-r ${currentTheme.buttonGradient} text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg`}>
                                                <span className="font-bold">{userData.impactScore}</span>
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-white/10 backdrop-blur-lg border-0 w-64">
                                            <p className="font-semibold">Impact Score: {userData.impactScore}</p>
                                            <p className="text-xs text-blue-200">Top 5% in Medicinal Chemistry</p>
                                            <div className="mt-2">
                                                {impactBreakdown.map((item, i) => (
                                                    <div key={i} className="flex items-center text-xs mt-1">
                                                        <div className={`w-2 h-2 rounded-full ${item.color} mr-2`}></div>
                                                        <span className="flex-1">{item.category}</span>
                                                        <span className="font-medium">{item.score}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </motion.div>
                        </motion.div>

                        {/* Key professional metrics */}
                        <motion.div
                            className="grid grid-cols-2 gap-2 mt-6 text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.9 }}
                        >
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                                <div className="font-bold text-2xl">{userData.achievements.publications}</div>
                                <div className="text-xs text-blue-200">Publications</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                                <div className="font-bold text-2xl">{userData.achievements.patents}</div>
                                <div className="text-xs text-blue-200">Patents</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                                <div className="font-bold text-2xl">{userData.achievements.citations}</div>
                                <div className="text-xs text-blue-200">Citations</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                                <div className="font-bold text-2xl">{userData.achievements.collaborators}</div>
                                <div className="text-xs text-blue-200">Collaborators</div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right column - Profile information */}
                    <div className="md:col-span-2 text-left">
                        <motion.h1
                            className={`text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r ${currentTheme.textGradient}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.5 }}
                        >
                            {userData.name}
                        </motion.h1>

                        <motion.div
                            className="flex flex-col md:flex-row gap-2 md:items-center mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.6 }}
                        >
                            <div className="text-xl text-blue-100 flex items-center">
                                <Briefcase size={16} className="mr-2" />
                                <span>{userData.title}</span>
                            </div>
                            <div className="hidden md:block text-blue-300 mx-2">•</div>
                            <div className="text-lg text-blue-100">
                                {userData.company}
                            </div>
                        </motion.div>

                        <motion.div
                            className="flex items-center text-blue-200 mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.7 }}
                        >
                            <MapPin size={16} className="mr-1" />
                            <span>{userData.location}</span>
                        </motion.div>

                        <motion.p
                            className="text-lg text-blue-100 max-w-3xl mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.8 }}
                        >
                            {userData.summary}
                        </motion.p>

                        {/* Research focus areas with pharma-specific badges */}
                        <motion.div
                            className="flex flex-wrap gap-3 mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.9 }}
                        >
                            {userData.badges.map((badge, index) => (
                                <Badge
                                    key={index}
                                    variant="secondary"
                                    className="px-3 py-1.5 gap-1.5 bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors text-white"
                                >
                                    {badge.icon === "Trophy" && <Trophy size={16} />}
                                    {badge.icon === "FileCheck" && <FileCheck size={16} />}
                                    {badge.icon === "Target" && <Target size={16} />}
                                    {badge.name}
                                </Badge>
                            ))}
                            <Badge
                                variant="secondary"
                                className="px-3 py-1.5 gap-1.5 bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors text-white"
                            >
                                <Microscope size={16} />
                                Lipid Nanoparticles
                            </Badge>
                            <Badge
                                variant="secondary"
                                className="px-3 py-1.5 gap-1.5 bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors text-white"
                            >
                                <FlaskConical size={16} />
                                mRNA Therapeutics
                            </Badge>
                            <Badge
                                variant="secondary"
                                className="px-3 py-1.5 gap-1.5 bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors text-white"
                            >
                                <BookOpen size={16} />
                                8+ Publications
                            </Badge>
                        </motion.div>

                        {/* Key specializations/expertise section */}
                        <motion.div
                            className="mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 1 }}
                        >
                            <h3 className="text-sm uppercase text-blue-300 mb-2 font-semibold tracking-wider">Expertise</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {userData.skills.slice(0, 4).map((skill, index) => (
                                    <div key={index} className="bg-white/5 rounded-lg p-3">
                                        <div className="text-sm font-medium">{skill.name}</div>
                                        <div className="mt-1 h-2 bg-white/10 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full bg-gradient-to-b ${currentTheme.accent} rounded-3xl`}
                                                style={{ width: `${skill.level}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Action buttons */}
                        <motion.div
                            className="flex flex-wrap gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 1.1 }}
                        >
                            <Button className={`bg-gradient-to-tl ${currentTheme.buttonGradient} text-white border-none hover:opacity-90 gap-2`}>
                                <UserPlus size={16} />
                                Connect
                            </Button>
                            <Button variant="outline" className={`border-white/30 bg-gradient-to-tl ${currentTheme.buttonGradient} hover:bg-white/10 text-white gap-2`}>
                                <Mail size={16} />
                                Contact
                            </Button>
                            <Button variant="outline" className={`border-white/30 bg-gradient-to-tl ${currentTheme.buttonGradient} hover:bg-white/10 text-white gap-2`}>
                                <Share2 size={16} />
                                Share Profile
                            </Button>
                            <Button variant="outline" className={`border-white/30 bg-gradient-to-tl ${currentTheme.buttonGradient} hover:bg-white/10 text-white gap-2`}>
                                <Award size={16} />
                                View Patents
                            </Button>
                        </motion.div>
                    </div>
                </div >

                {/* Current research highlight */}
                <motion.div
                    className="mt-8 bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 1.2 }}
                >
                    <h3 className="text-lg font-medium mb-2 flex items-center">
                        <Microscope className="mr-2" size={20} />
                        Current Research Focus
                    </h3>
                    <p className="text-blue-100">
                        Design and synthesis of various novel lipids and mRNA caps for targeted drug delivery systems.
                        Developing safe, stable, and effective LNP delivery systems to target cells and tissues.
                    </p>
                </motion.div >

                <motion.div
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.7,
                        delay: 1.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        repeatDelay: 0.5
                    }}
                >
                    <div className="flex flex-col items-center gap-2 text-blue-200">
                        <Mouse size={24} />
                        <ArrowDown size={20} />
                        <span className="text-sm font-light">Scroll to explore full profile</span>
                    </div>
                </motion.div>
            </motion.div >
        </motion.div >
    );
};

export default HeroSection;