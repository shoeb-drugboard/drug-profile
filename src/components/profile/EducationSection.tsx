import { useRef } from "react";
import { motion, useInView } from 'motion/react';
import { GraduationCap, Microscope, FlaskConical, Award, BookOpen, Atom, PenTool, FileText, Briefcase } from 'lucide-react';
import { userData, fadeInUpVariants, fadeInVariants, staggerContainerVariants } from '@/assets/data';
import useTheme from '@/contexts/useTheme';

const EducationSection = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: false, amount: 0.1 });
    const { currentTheme } = useTheme();

    // Helper function to get icon based on degree type
    const getDegreeIcon = (degree: string) => {
        if (degree.toLowerCase().includes("phd") || degree.toLowerCase().includes("doctor")) return Microscope;
        if (degree.toLowerCase().includes("research")) return FlaskConical;
        if (degree.toLowerCase().includes("master")) return BookOpen;
        if (degree.toLowerCase().includes("certification")) return Award;
        return GraduationCap;
    };

    // Helper to determine specialization type color
    const getSpecializationColor = (specialization: string) => {
        if (specialization.toLowerCase().includes("clinical")) return "from-blue-500 to-blue-700";
        if (specialization.toLowerCase().includes("research")) return "from-purple-500 to-purple-700";
        if (specialization.toLowerCase().includes("analysis")) return "from-green-500 to-green-700";
        return "from-amber-500 to-amber-700";
    };

    return (
        <motion.section
            ref={ref}
            className={`py-24 bg-gradient-to-b ${currentTheme.altSectionGradient} relative pt-24`}
            variants={fadeInVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
        >
            {/* Scientific molecule-like floating particles */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className={`absolute rounded-full ${currentTheme.iconColor.replace('text-', 'bg-')} opacity-20`}
                        style={{
                            width: `${Math.random() * 10 + 2}px`,
                            height: `${Math.random() * 10 + 2}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, Math.random() * 50 - 25],
                            x: [0, Math.random() * 50 - 25],
                            opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: Math.random() * 15 + 10,
                            ease: "easeInOut",
                        }}
                    />
                ))}

                {/* Connection lines between particles to simulate molecules */}
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={`line-${i}`}
                        className={`absolute h-px ${currentTheme.iconColor.replace('text-', 'bg-')} opacity-10`}
                        style={{
                            width: `${Math.random() * 100 + 50}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            transform: `rotate(${Math.random() * 360}deg)`,
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    className="flex flex-col items-center mb-16"
                    variants={fadeInUpVariants}
                >
                    <div className="flex items-center justify-center space-x-4 mb-4">
                        <Atom className={`${currentTheme.iconColor} w-7 h-7`} />
                        <h2 className="text-3xl font-bold text-white">Scientific & Professional Qualifications</h2>
                    </div>
                    <p className="text-slate-300 max-w-2xl text-center">
                        Educational background and specialized training in pharmaceutical research, clinical trials, and industry practices.
                    </p>
                </motion.div>

                {/* Research & Academic Timeline */}
                <motion.div
                    className="relative mb-24"
                    variants={staggerContainerVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                >
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-transparent via-slate-500/30 to-transparent"></div>

                    {userData.education.map((edu, index) => {
                        const IconComponent = getDegreeIcon(edu.degree);
                        const isEven = index % 2 === 0;

                        return (
                            <motion.div
                                key={index}
                                className={`flex items-center mb-16 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                variants={fadeInUpVariants}
                            >
                                <div className={`w-full md:w-5/12 ${isEven ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                                    <motion.div
                                        className={`bg-slate-800/70 backdrop-blur-sm border border-${currentTheme.iconColor.replace('text-', '')}/20 rounded-xl p-6 shadow-lg`}
                                        whileHover={{
                                            scale: 1.02,
                                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                                        }}
                                    >
                                        <h4 className="font-bold text-lg text-white mb-2">{edu.degree}</h4>
                                        <p className="text-slate-200 font-medium">{edu.institution}</p>
                                        <p className="text-slate-400 text-sm mb-4">{edu.location} • {edu.duration}</p>

                                        {/* Specialization tags */}
                                        {edu.specializations && (
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {edu.specializations.map((spec, i) => (
                                                    <span
                                                        key={i}
                                                        className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${getSpecializationColor(spec)} text-white`}
                                                    >
                                                        {spec}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {edu.thesis && (
                                            <div className={`mt-4 pt-3 border-t border-${currentTheme.iconColor.replace('text-', '')}/20`}>
                                                <div className="flex items-start gap-2">
                                                    <PenTool size={16} className={currentTheme.iconColor + " mt-1 flex-shrink-0"} />
                                                    <div>
                                                        <span className="font-medium text-white">Research:</span>
                                                        <p className="text-slate-300">{edu.thesis}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                </div>

                                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                                    <div className={`w-16 h-16 rounded-full bg-slate-900 border-4 border-${currentTheme.iconColor.replace('text-', '')}/50 flex items-center justify-center z-10`}>
                                        <IconComponent className={`${currentTheme.iconColor} w-6 h-6`} />
                                    </div>
                                </div>

                                <div className="w-full md:w-5/12"></div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Certifications & Industry Training */}
                <motion.div
                    className="mt-16"
                    variants={fadeInUpVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    transition={{ delay: 0.3 }}
                >
                    <h3 className="text-2xl font-semibold text-white mb-8 text-center flex items-center justify-center gap-3">
                        <Award className={currentTheme.iconColor} />
                        <span>Industry Certifications & Specialized Training</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {userData.certifications.map((cert, index) => (
                            <motion.div
                                key={index}
                                className={`bg-gradient-to-br from-slate-800/70 to-slate-900/70 backdrop-blur-sm 
                                    border border-slate-700/30 rounded-lg p-6 text-white relative overflow-hidden`}
                                whileHover={{ y: -5, boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.4)" }}
                                transition={{ duration: 0.2 }}
                            >
                                {/* Corner decoration */}
                                <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${currentTheme.buttonGradient} 
                                    -translate-y-1/2 translate-x-1/2 rotate-45 transform-gpu`} />

                                <div className="flex gap-4 items-start">
                                    <div className={`${currentTheme.iconColor.replace('text-', 'bg-')}/20 p-3 rounded-full ${currentTheme.iconColor}`}>
                                        {cert.type === 'clinical' ? <Microscope size={20} /> :
                                            cert.type === 'research' ? <FlaskConical size={20} /> :
                                                cert.type === 'regulatory' ? <FileText size={20} /> :
                                                    <Briefcase size={20} />}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white">{cert.name}</h4>
                                        <p className="text-sm text-slate-300 mt-1">
                                            {cert.issuer}
                                        </p>
                                        <div className="flex items-center gap-2 text-xs text-slate-400 mt-2">
                                            <span>{cert.year}</span>
                                            {cert.accreditation && (
                                                <>
                                                    <span>•</span>
                                                    <span>{cert.accreditation}</span>
                                                </>
                                            )}
                                        </div>
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