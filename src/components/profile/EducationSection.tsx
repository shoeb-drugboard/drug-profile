import { useRef } from "react";
import { motion, useInView } from 'motion/react';
import { GraduationCap, MapPin, FileText, FileCheck } from 'lucide-react';
import { userData, fadeInUpVariants, fadeInVariants, staggerContainerVariants } from '@/assets/data';
const EducationSection = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: false, amount: 0.1 });

    return (
        <motion.section
            ref={ref}
            className="py-24 bg-gradient-to-b from-slate-900 to-slate-800 relative pt-24"
            variants={fadeInVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
        >
            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full bg-emerald-500 opacity-20"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, Math.random() * 30 - 15],
                            x: [0, Math.random() * 30 - 15],
                            scale: [1, Math.random() * 0.5 + 0.5, 1],
                            opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: Math.random() * 5 + 5,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.h2
                    className="text-3xl font-bold text-center mb-16 text-white"
                    variants={fadeInUpVariants}
                >
                    Academic Background
                </motion.h2>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-10"
                    variants={staggerContainerVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                >
                    {userData.education.map((edu, index) => (
                        <motion.div
                            key={index}
                            className="perspective-1000"
                            variants={fadeInUpVariants}
                            whileHover={{ z: 20 }}
                        >
                            <motion.div
                                className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl overflow-hidden border border-emerald-800/30 shadow-xl"
                                whileHover={{
                                    rotateX: 5,
                                    rotateY: 10,
                                    z: 20,
                                    boxShadow: "0 50px 100px -20px rgba(0, 0, 0, 0.5), 0 30px 60px -30px rgba(16, 185, 129, 0.25)"
                                }}
                                transition={{ duration: 0.2 }}
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                {/* Top decoration */}
                                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 to-teal-500" />

                                {/* Degree badge */}
                                <div className="absolute -top-3 -right-3 w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 
                             rotate-12 transform-gpu shadow-lg flex items-center justify-center">
                                    <GraduationCap size={24} className="text-white transform -rotate-12" />
                                </div>

                                <div className="p-6 mt-2">
                                    <h4 className="font-bold text-lg text-emerald-300 mb-3 pr-10">{edu.degree}</h4>
                                    <div className="flex items-center gap-2 text-slate-300 mb-2">
                                        <div className="w-6 h-6 bg-emerald-900/50 rounded-full flex items-center justify-center">
                                            <MapPin size={12} className="text-emerald-300" />
                                        </div>
                                        <span>{edu.institution}, {edu.location}</span>
                                    </div>
                                    <div className="text-slate-400 text-sm mb-4">{edu.duration}</div>

                                    {edu.thesis && (
                                        <div className="mt-3 pt-3 border-t border-dashed border-emerald-900/50">
                                            <div className="flex items-start gap-2">
                                                <FileText size={16} className="text-emerald-400 mt-1 flex-shrink-0" />
                                                <div>
                                                    <span className="font-medium text-emerald-300">Thesis:</span>
                                                    <p className="text-slate-300">{edu.thesis}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* 3D elements */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-teal-500/5 opacity-0 
                             group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    className="mt-16"
                    variants={fadeInUpVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    transition={{ delay: 0.5 }}
                >
                    <h3 className="text-xl font-semibold text-white mb-8 text-center">Certifications & Additional Training</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {userData.certifications.map((cert, index) => (
                            <motion.div
                                key={index}
                                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-5 text-white"
                                whileHover={{ y: -5, boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.3)" }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="flex gap-4 items-start">
                                    <div className="bg-blue-500/20 p-2 rounded-full text-blue-300">
                                        <FileCheck size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-blue-200">{cert.name}</h4>
                                        <p className="text-sm text-slate-400 mt-1">
                                            {cert.issuer} • {cert.year}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default EducationSection;