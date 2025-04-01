import { useRef } from "react";
import { motion, useInView } from 'motion/react';
import { Target } from 'lucide-react';
import { userData, fadeInUpVariants, fadeInVariants, impactBreakdown } from '@/assets/data';
import useTheme from "@/contexts/useTheme";

const SkillsSection = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: false, amount: 0.2 });
    const { currentTheme } = useTheme();

    return (
        <motion.section
            ref={ref}
            className={`py-24 bg-gradient-to-b ${currentTheme.sectionGradient} overflow-hidden relative pt-24`}
            variants={fadeInVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
        >
            {/* Decorative molecular structure in background */}
            <div className="absolute inset-0 pointer-events-none opacity-5">
                <svg width="100%" height="100%" viewBox="0 0 200 100" preserveAspectRatio="true">
                    <defs>
                        <pattern id="molecules" width="60" height="40" patternUnits="userSpaceOnUse" patternTransform="scale(0.6)">
                            {/* Small circles representing atoms */}
                            <circle cx="10" cy="10" r="2" fill="none" stroke="#fff" strokeWidth="0.8" />
                            <circle cx="30" cy="10" r="2" fill="none" stroke="#fff" strokeWidth="0.8" />
                            <circle cx="20" cy="25" r="2" fill="none" stroke="#fff" strokeWidth="0.8" />
                            <circle cx="10" cy="40" r="2" fill="none" stroke="#fff" strokeWidth="0.8" />
                            <circle cx="30" cy="40" r="2" fill="none" stroke="#fff" strokeWidth="0.8" />

                            {/* Lines representing bonds */}
                            <line x1="10" y1="10" x2="30" y2="10" stroke="#fff" strokeWidth="0.5" />
                            <line x1="10" y1="10" x2="20" y2="25" stroke="#fff" strokeWidth="0.5" />
                            <line x1="30" y1="10" x2="20" y2="25" stroke="#fff" strokeWidth="0.5" />
                            <line x1="20" y1="25" x2="10" y2="40" stroke="#fff" strokeWidth="0.5" />
                            <line x1="20" y1="25" x2="30" y2="40" stroke="#fff" strokeWidth="0.5" />
                            <line x1="10" y1="40" x2="30" y2="40" stroke="#fff" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#molecules)"></rect>
                </svg>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.h2
                    className="text-3xl font-bold text-center mb-16 text-white"
                    variants={fadeInUpVariants}
                >
                    Expertise & Skills
                </motion.h2>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                    variants={fadeInUpVariants}
                >
                    <div className="space-y-8">
                        {userData.skills.map((skill, index) => (
                            <motion.div
                                key={index}
                                className="space-y-2"
                                initial={{ opacity: 0, x: -50 }}
                                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="flex justify-between text-white">
                                    <span className="font-medium">{skill.name}</span>
                                    <span>{skill.level}%</span>
                                </div>
                                <div className="relative h-2 bg-slate-700 rounded-full overflow-hidden">
                                    <motion.div
                                        className={`absolute inset-y-0 left-0 bg-gradient-to-r ${currentTheme.buttonGradient} rounded-full`}
                                        initial={{ width: 0 }}
                                        animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                                        transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        className="rounded-xl overflow-hidden shadow-2xl"
                        initial={{ opacity: 0, y: 50 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <div className="bg-slate-800/80 backdrop-blur-lg p-6 border border-slate-700">
                            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                                <Target size={20} className={currentTheme.iconColor} />
                                Impact Breakdown
                            </h3>

                            <div className="space-y-4">
                                {impactBreakdown.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        className="space-y-2"
                                        initial={{ opacity: 0 }}
                                        animate={inView ? { opacity: 1 } : { opacity: 0 }}
                                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                                    >
                                        <div className="flex justify-between text-white">
                                            <span>{item.category}</span>
                                            <span className="font-semibold">{item.score} pts</span>
                                        </div>
                                        <div className="h-2 bg-slate-700 rounded-full">
                                            <motion.div
                                                className={`h-2 rounded-full ${item.color}`}
                                                initial={{ width: 0 }}
                                                animate={inView ? { width: `${(item.score / userData.impactScore) * 100}%` } : { width: 0 }}
                                                transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-8 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                                <div className="text-center">
                                    <div className={`text-4xl font-bold ${currentTheme.iconColor} mb-1`}>{userData.impactScore}</div>
                                    <div className="text-slate-300 text-sm">Total Impact Score</div>
                                    <div className="text-blue-300 text-xs mt-1">Top 5% in Medicinal Chemistry</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default SkillsSection;