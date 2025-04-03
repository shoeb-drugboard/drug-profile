import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from 'motion/react';
import { GraduationCap, Microscope, FlaskConical, Award, BookOpen, Atom, PenTool, FileText, Briefcase, ChevronDown, X } from 'lucide-react';
import { userData, fadeInUpVariants, fadeInVariants, staggerContainerVariants } from '@/assets/data';
import useTheme from '@/contexts/useTheme';

const EducationSection = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: false, amount: 0.1 });
    const { currentTheme } = useTheme();
    const [expandedEdu, setExpandedEdu] = useState<number | null>(null);
    const [expandedCert, setExpandedCert] = useState<number | null>(null);

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
        if (specialization.toLowerCase().includes("clinical")) return currentTheme.accent;
        if (specialization.toLowerCase().includes("research")) return currentTheme.highlight;
        if (specialization.toLowerCase().includes("analysis")) return currentTheme.secondary;
        return currentTheme.primary;
    };

    return (
        <motion.section
            ref={ref}
            className={`py-24 bg-gradient-to-b ${currentTheme.sectionGradient} relative pt-24`}
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
                        <h2 className={`text-3xl font-bold ${currentTheme.textGradient}`}>Scientific & Professional Qualifications</h2>
                    </div>
                    <p className="max-w-2xl text-center">
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
                    <div className={`absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b ${currentTheme.highlight} ${currentTheme.textGradient}`} />

                    {userData.education.map((edu, index) => {
                        const IconComponent = getDegreeIcon(edu.degree);
                        const isEven = index % 2 === 0;
                        const isExpanded = expandedEdu === index;

                        return (
                            <motion.div
                                key={index}
                                className={`flex items-center mb-16 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                variants={fadeInUpVariants}
                            >
                                <div className={`w-full md:w-5/12 ${isEven ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                                    <motion.div
                                        className={`backdrop-blur-sm border border-${currentTheme.iconColor.replace('text-', '')}/20 rounded-xl p-6 shadow-lg transition-all ${isExpanded ? 'shadow-xl' : ''}`}
                                        whileHover={{
                                            scale: isExpanded ? 1 : 1.02,
                                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                                        }}
                                        onClick={() => setExpandedEdu(isExpanded ? null : index)}
                                    >
                                        <div className="flex justify-between items-start">
                                            <h4 className={`font-bold text-lg ${currentTheme.textGradient} mb-2`}>{edu.degree}</h4>
                                            <motion.div
                                                className={`${currentTheme.iconColor} bg-gradient-to-bl ${currentTheme.buttonGradient} rounded-full p-1 cursor-pointer`}
                                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                            >
                                                {isExpanded ? <X size={16} /> : <ChevronDown size={16} />}
                                            </motion.div>
                                        </div>
                                        <p className={`${currentTheme.textGradient} font-medium`}>{edu.institution}</p>
                                        <p className=" text-sm mb-4">{edu.location} • {edu.duration}</p>

                                        {/* Specialization tags - always visible */}
                                        {edu.specializations && (
                                            <div className={`flex flex-wrap gap-2 mt-3 ${currentTheme.accent}`}>
                                                {edu.specializations.map((spec, i) => (
                                                    <span
                                                        key={i}
                                                        className={`text-xs px-3 py-1 rounded-full bg-gradient-to-br ${getSpecializationColor(spec)} ${currentTheme.buttonGradient}`}
                                                    >
                                                        {spec}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {/* Expanded content */}
                                        <AnimatePresence>
                                            {isExpanded && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="overflow-hidden"
                                                >
                                                    {edu.thesis && (
                                                        <div className={`mt-4 pt-3 border-t border-${currentTheme.iconColor.replace('text-', '')}/20`}>
                                                            <div className="flex items-start gap-2">
                                                                <PenTool size={16} className={`${currentTheme.iconColor} mt-1 flex-shrink-0`} />
                                                                <div className="text-left">
                                                                    <span className={`font-medium ${currentTheme.textGradient}`}>Research:</span>
                                                                    <p className="text-left">{edu.thesis}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Additional expanded content */}
                                                    <div className={`mt-4 text-left pt-3 border-t border-${currentTheme.iconColor.replace('text-', '')}/20 ${currentTheme.textGradient}`}>
                                                        <h5 className={` font-medium mb-2`}>Key Achievements</h5>
                                                        <ul className="space-y-1 list-disc pl-5 text-left">
                                                            <li>Top researcher in the department</li>
                                                            <li>Published {Math.floor(Math.random() * 3) + 1} papers during candidacy</li>
                                                            <li>Collaborated with leading industry partners</li>
                                                        </ul>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                </div>

                                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                                    <div className={`w-16 h-16 rounded-full bg-gradient-to-bl ${currentTheme.buttonGradient} ${currentTheme.iconColor} border-4 border-${currentTheme.buttonGradient.replace('text-', '')}/50 flex items-center justify-center z-10`}>
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
                    <h3 className={`text-2xl font-semibold ${currentTheme.textGradient} mb-8 text-center flex items-center justify-center gap-3`}>
                        <Award className={currentTheme.iconColor} />
                        <span>Industry Certifications & Specialized Training</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {userData.certifications.map((cert, index) => {
                            const isExpanded = expandedCert === index;
                            return (
                                <motion.div
                                    key={index}
                                    className={`bg-gradient-to-br ${currentTheme.altSectionGradient} backdrop-blur-sm 
                                        border border-${currentTheme.iconColor.replace('text-', '')}/30 rounded-lg p-6 text-white relative overflow-hidden
                                        ${isExpanded ? 'md:col-span-3 shadow-2xl' : ''}`}
                                    whileHover={{ y: -5, boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.4)" }}
                                    transition={{ duration: 0.2 }}
                                    onClick={() => setExpandedCert(isExpanded ? null : index)}
                                >
                                    {/* Corner decoration */}
                                    <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${currentTheme.buttonGradient} 
                                        -translate-y-1/2 translate-x-1/2 rotate-45 transform-gpu`} />

                                    <div className={`flex justify-between ${currentTheme.textGradient}`}>
                                        <div className="flex gap-4 items-start">
                                            <div className={`${currentTheme.iconColor.replace('text-', 'bg-')}/20 p-3 rounded-full ${currentTheme.iconColor}`}>
                                                {cert.type === 'clinical' ? <Microscope size={20} /> :
                                                    cert.type === 'research' ? <FlaskConical size={20} /> :
                                                        cert.type === 'regulatory' ? <FileText size={20} /> :
                                                            <Briefcase size={20} />}
                                            </div>
                                            <div>
                                                <h4 className={`font-semibold ${currentTheme.textGradient}`}>{cert.name}</h4>
                                                <p className="text-sm mt-1">
                                                    {cert.issuer}
                                                </p>
                                                <div className="flex items-center gap-2 text-xs  mt-2">
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
                                        <motion.div
                                            className={`${currentTheme.iconColor} bg-gradient-to-bl ${currentTheme.highlight} rounded-full p-1 h-max cursor-pointer mt-1`}
                                            animate={{ rotate: isExpanded ? 180 : 0 }}
                                        >
                                            {isExpanded ? <X size={16} /> : <ChevronDown size={16} />}
                                        </motion.div>
                                    </div>

                                    {/* Expanded certification content */}
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="mt-6 pt-4 border-t border-slate-700/30 overflow-hidden"
                                            >
                                                <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${currentTheme.textGradient} ${currentTheme.accent}`}>
                                                    <div>
                                                        <h5 className={`${currentTheme.textGradient} font-medium mb-3`}>Program Details</h5>
                                                        <p className="mb-4">
                                                            This comprehensive program covers advanced techniques and methodologies in {cert.type}
                                                            with hands-on training and industry best practices.
                                                        </p>

                                                        <h6 className={`${currentTheme.textGradient} font-medium mb-2`}>Key Topics:</h6>
                                                        <ul className="list-disc pl-5 space-y-1">
                                                            <li>Advanced techniques in {cert.type === 'research' ? 'molecular modeling' :
                                                                cert.type === 'clinical' ? 'clinical trials' :
                                                                    cert.type === 'regulatory' ? 'regulatory compliance' : 'business analysis'}</li>
                                                            <li>Modern approaches to {cert.type} challenges</li>
                                                            <li>Practical applications in pharmaceutical industry</li>
                                                        </ul>
                                                    </div>

                                                    <div className={`bg-${currentTheme.iconColor.replace('text-', '')}/20 rounded-lg p-4 ${currentTheme.textGradient}`}>
                                                        <h5 className={`${currentTheme.textGradient} font-medium mb-3`}>Certification Value</h5>
                                                        <div className="space-y-3">
                                                            <div>
                                                                <div className="flex justify-between text-sm mb-1">
                                                                    <span className="">Industry Recognition</span>
                                                                    <span className="">95%</span>
                                                                </div>
                                                                <div className="w-full bg-slate-700/50 rounded-full h-2">
                                                                    <div className={`h-2 rounded-full bg-gradient-to-r ${currentTheme.buttonGradient}`} style={{ width: "95%" }}></div>
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <div className="flex justify-between text-sm mb-1">
                                                                    <span className="">Skill Enhancement</span>
                                                                    <span className="">87%</span>
                                                                </div>
                                                                <div className="w-full bg-slate-700/50 rounded-full h-2">
                                                                    <div className={`h-2 rounded-full bg-gradient-to-r ${currentTheme.buttonGradient}`} style={{ width: "87%" }}></div>
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <div className="flex justify-between text-sm mb-1">
                                                                    <span className="">Career Advancement</span>
                                                                    <span className="">90%</span>
                                                                </div>
                                                                <div className="w-full bg-slate-700/50 rounded-full h-2">
                                                                    <div className={`h-2 rounded-full bg-gradient-to-r ${currentTheme.buttonGradient}`} style={{ width: "90%" }}></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default EducationSection;