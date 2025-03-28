import { useRef, useState, useEffect } from "react";
import { userData } from "@/assets/data";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Button } from "../ui/button";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import {
    Mouse,
    ArrowDown,
    Trophy,
    FileCheck,
    Target,
    Share2,
    UserPlus,
    Mail,
} from 'lucide-react';

const HeroSection = () => {
    // Create a client-side only flag
    const [isClient, setIsClient] = useState(false);
    const { scrollY } = useScroll();
    const ref = useRef(null);

    const y = useTransform(scrollY, [0, 500], [0, -150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const scale = useTransform(scrollY, [0, 300], [1, 0.9]);

    const springY = useSpring(y, { stiffness: 100, damping: 30 });
    const springOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });
    const springScale = useSpring(scale, { stiffness: 100, damping: 30 });

    // Added padding at the top to account for the fixed navigation
    const topPadding = "pt-20";

    // Set isClient to true after component mount
    useEffect(() => {
        setIsClient(true);
    }, []);
    const yScroll = useTransform(scrollY, [0, 500], [0, 100]);
    const scaleScroll = useTransform(scrollY, [0, 500], [1, 1.1]);
    return (
        <motion.div
            ref={ref}
            className={`relative h-screen w-full overflow-hidden flex items-center justify-center ${topPadding}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            {/* Parallax background with gradient overlay */}
            <motion.div
                className="absolute inset-0 z-0 bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900"
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
                            className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-400 opacity-20 blur-xl"
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
                className="container grid grid-cols-2 relative z-10 text-center text-white px-6"
                style={isClient ? {
                    y: springY,
                    opacity: springOpacity,
                    scale: springScale
                } : {}}
            >
                <motion.div
                    className="mx-auto mb-8"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.3
                    }}
                >
                    <Avatar className="h-40 w-40 border-4 border-white/30 shadow-xl mx-auto">
                        <AvatarImage src={userData.profileImage} alt={userData.name} />
                        <AvatarFallback className="text-5xl bg-gradient-to-br from-blue-500 to-purple-600">NPA</AvatarFallback>
                    </Avatar>

                    {/* Impact score badge */}
                    <motion.div
                        className="absolute top-24 left-[21%] transform translate-x-20 translate-y-4"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                    >
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
                                        <span className="font-bold">{userData.impactScore}</span>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent className="bg-white/10 backdrop-blur-lg border-0">
                                    <p className="font-semibold">Impact Score: {userData.impactScore}</p>
                                    <p className="text-xs text-blue-200">Top 5% in Medicinal Chemistry</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </motion.div>
                </motion.div>

                <motion.h1
                    className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                >
                    {userData.name}
                </motion.h1>

                <motion.p
                    className="text-2xl text-blue-100 mb-4 text-left"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                >
                    {userData.title} at {userData.company}
                </motion.p>

                <motion.div
                    className="flex items-center justify-center text-blue-200 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.7 }}
                >
                    {/* <MapPin size={18} className="mr-1" />
                    <span>{userData.location}</span> */}
                </motion.div>

                <motion.p
                    className="text-lg text-left text-blue-100 max-w-3xl mx-auto mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.8 }}
                >
                    {userData.summary}
                </motion.p>

                <motion.div
                    className="flex flex-wrap justify-center items-center gap-3 mb-10"
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
                </motion.div>

                <motion.div
                    className="flex justify-center gap-4 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 1 }}
                >
                    <Button className="bg-white text-blue-900 hover:bg-blue-100 gap-2">
                        <UserPlus size={16} />
                        Connect
                    </Button>
                    <Button variant="outline" className="border-white/30 hover:bg-white/10 text-pink-500 gap-2">
                        <Mail size={16} />
                        Contact
                    </Button>
                    <Button variant="outline" className="border-white/3 text-purple-600 hover:bg-white/10 gap-2">
                        <Share2 size={16} />
                        Share
                    </Button>
                </motion.div>

                <motion.div
                    className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.7,
                        delay: 1.2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        repeatDelay: 0.5
                    }}
                >
                    <div className="flex flex-col items-center gap-2 text-blue-200">
                        <Mouse size={24} />
                        <ArrowDown size={20} />
                        <span className="text-sm font-light">Scroll to explore</span>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default HeroSection;