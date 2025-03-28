import { useRef } from "react";
import { userData } from "@/assets/data";
import { fadeInUpVariants, fadeInVariants } from "@/assets/data";
import {
    BookOpen,
    FileCheck,
    Star,
    MessageSquare,
    UserPlus,
    Heart
} from 'lucide-react';
import { motion, useInView } from 'motion/react';

const StatsOverview = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: false, amount: 0.2 });

    // Add padding to account for the navigation bar
    const topPadding = "pt-16";

    const statsContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const statItemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20
            }
        }
    };


    const stats = [
        { label: "Publications", value: userData.achievements.publications, icon: <BookOpen size={24} />, color: "from-blue-500 to-blue-700" },
        { label: "Patents", value: userData.achievements.patents, icon: <FileCheck size={24} />, color: "from-purple-500 to-purple-700" },
        { label: "Citations", value: userData.achievements.citations, icon: <Star size={24} />, color: "from-indigo-500 to-indigo-700" },
        { label: "Presentations", value: userData.achievements.presentations, icon: <MessageSquare size={24} />, color: "from-emerald-500 to-emerald-700" },
        { label: "Collaborators", value: userData.achievements.collaborators, icon: <UserPlus size={24} />, color: "from-amber-500 to-amber-700" },
        { label: "Contributions", value: userData.achievements.contributions, icon: <Heart size={24} />, color: "from-rose-500 to-rose-700" },
    ];

    return (
        <motion.div
            ref={ref}
            className={`py-16 bg-gradient-to-b from-slate-800 to-slate-900 ${topPadding}`}
            variants={fadeInVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
        >
            <div className="container mx-auto px-4">
                <motion.h2
                    className="text-3xl font-bold text-center mb-12 text-white"
                    variants={fadeInUpVariants}
                >
                    Research Impact & Achievements
                </motion.h2>

                <motion.div
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
                    variants={statsContainerVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 text-center border border-slate-700 shadow-lg"
                            variants={statItemVariants}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                            <div className={`mx-auto w-14 h-14 rounded-full mb-4 flex items-center justify-center bg-gradient-to-br ${stat.color}`}>
                                {stat.icon}
                            </div>
                            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                            <div className="text-slate-400 text-sm">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
};
export default StatsOverview;