import { useRef } from "react";
import { motion, useInView } from 'motion/react';
import { Target } from 'lucide-react';
import { userData, fadeInUpVariants, fadeInVariants, impactBreakdown } from '@/assets/data';

const SkillsSection = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: false, amount: 0.2 });

    return (
        <motion.section
            ref={ref}
            className="py-24 bg-gradient-to-b from-slate-900 to-slate-800 overflow-hidden relative pt-24"
            variants={fadeInVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
        >
            {/* Decorative molecules in background */}
            <div className="absolute inset-0 pointer-events-none opacity-5">
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                        <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(0.5)">
                            <polygon points="24.8,22 37.3,29.2 37.3,43.7 24.8,50.9 12.3,43.7 12.3,29.2" fill="none" stroke="#fff" strokeWidth="1"></polygon>
                            <polygon points="24.8,0 37.3,7.3 37.3,21.7 24.8,29 12.3,21.7 12.3,7.3" fill="none" stroke="#fff" strokeWidth="1"></polygon>
                            <polygon points="0,22 12.5,29.2 12.5,43.7 0,50.9 -12.5,43.7 -12.5,29.2" fill="none" stroke="#fff" strokeWidth="1"></polygon>
                            <polygon points="49.6,22 62.1,29.2 62.1,43.7 49.6,50.9 37.1,43.7 37.1,29.2" fill="none" stroke="#fff" strokeWidth="1"></polygon>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#hexagons)"></rect>
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
                                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
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
                                <Target size={20} className="text-blue-400" />
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
                                    <div className="text-4xl font-bold text-blue-400 mb-1">{userData.impactScore}</div>
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