import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useInView } from 'motion/react';
import { Briefcase, ChevronDown } from 'lucide-react';
import { userData, fadeInUpVariants, fadeInVariants } from '@/assets/data';
import useTheme from '@/contexts/useTheme';

const ExperienceSection = () => {
    const [isClient, setIsClient] = useState(false);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const { scrollY } = useScroll();
    const ref = useRef(null);
    const inView = useInView(ref, { once: false, amount: 0.1 });
    const { currentTheme } = useTheme();

    useEffect(() => {
        setIsClient(true);
    }, []);

    const toggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <motion.section
            ref={ref}
            className={`py-24 bg-gradient-to-br ${currentTheme.sectionGradient} ${currentTheme.textGradient} relative overflow-hidden pt-24`}
            variants={fadeInVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
        >
            {/* Background decoration */}
            <motion.div
                className="absolute top-0 left-0 w-full h-full z-0 opacity-5"
                style={isClient ? {
                    backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMCAxLjEtLjkgMi0yIDJzLTItLjktMi0yIC45LTIgMi0yIDIgLjkgMiAyem0wLTE3YzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptMTcgMTdjMCAxLjEtLjkgMi0yIDJzLTItLjktMi0yIC45LTIgMi0yIDIgLjkgMiAyem0wLTE3YzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptLTE3IDM0YzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptMCA0MmMwIDEuMS0uOSAyLTIgMnMtMi0uOS0yLTIgLjktMiAyLTIgMiAuOSAyIDJ6bTE3LTE3YzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptMC00MmMwIDEuMS0uOSAyLTIgMnMtMi0uOS0yLTIgLjktMiAyLTIgMiAuOSAyIDJ6bTAtMzRjMCAxLjEtLjkgMi0yIDJzLTItLjktMi0yIC45LTIgMi0yIDIgLjkgMiAyem0tMzQgMTdjMCAxLjEtLjkgMi0yIDJzLTItLjktMi0yIC45LTIgMi0yIDIgLjkgMiAyem0wLTE3YzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptLTE3IDE3YzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptMC0xN2MwIDEuMS0uOSAyLTIgMnMtMi0uOS0yLTIgLjktMiAyLTIgMiAuOSAyIDJ6bTE3IDUxYzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptLTE3LTE3YzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptMCAxN2MwIDEuMS0uOSAyLTIgMnMtMi0uOS0yLTIgLjktMiAyLTIgMiAuOSAyIDJ6bTE3LTI2YzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptMC0zNGMwIDEuMS0uOSAyLTIgMnMtMi0uOS0yLTIgLjktMiAyLTIgMiAuOSAyIDJ6bTM0IDM0YzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptMC04YzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptMC05YzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptMC0xN2MwIDEuMS0uOSAyLTIgMnMtMi0uOS0yLTIgLjktMiAyLTIgMiAuOSAyIDJ6bTAgMzRjMCAxLjEtLjkgMi0yIDJzLTItLjktMi0yIC45LTIgMi0yIDIgLjkgMiAyem0wIDhjMCAxLjEtLjkgMi0yIDJzLTItLjktMi0yIC45LTIgMi0yIDIgLjkgMiAyem0wIDljMCAxLjEtLjkgMi0yIDJzLTItLjktMi0yIC45LTIgMi0yIDIgLjkgMiAyem0wLTQyYzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptLTI2LTdoMTl2MmgtMTl6bTAtMzRoMTl2MmgtMTl6bTAgNTFoMTl2MmgtMTl6TTM0IDhoMTl2MkgzNHpNMTcgMjVoMjZ2MkgxN3ptMCA4aDI2djJIMTd6bTAgOGgyNnYySDE3eiIvPjwvZz48L2c+PC9zdmc+')",
                    backgroundRepeat: "repeat",
                    backgroundSize: "60px 60px",
                    y: scrollY
                } : {
                    backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMCAxLjEtLjkgMi0yIDJzLTItLjktMi0yIC45LTIgMi0yIDIgLjkgMiAyem0wLTE3YzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptMTcgMTdjMCAxLjEtLjkgMi0yIDJzLTItLjktMi0yIC45LTIgMi0yIDIgLjkgMiAyem0wLTE3YzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptLTE3IDM0YzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptMCA0MmMwIDEuMS0uOSAyLTIgMnMtMi0uOS0yLTIgLjktMiAyLTIgMiAuOSAyIDJ6bTE3LTE3YzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptMC00MmMwIDEuMS0uOSAyLTIgMnMtMi0uOS0yLTIgLjktMiAyLTIgMiAuOSAyIDJ6bTAtMzRjMCAxLjEtLjkgMi0yIDJzLTItLjktMi0yIC45LTIgMi0yIDIgLjkgMiAyem0tMzQgMTdjMCAxLjEtLjkgMi0yIDJzLTItLjktMi0yIC45LTIgMi0yIDIgLjkgMiAyem0wLTE3YzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptLTE3IDE3YzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptMC0xN2MwIDEuMS0uOSAyLTIgMnMtMi0uOS0yLTIgLjktMiAyLTIgMiAuOSAyIDJ6bTE3IDUxYzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptLTE3LTE3YzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptMCAxN2MwIDEuMS0uOSAyLTIgMnMtMi0uOS0yLTIgLjktMiAyLTIgMiAuOSAyIDJ6bTE3LTI2YzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptMC0zNGMwIDEuMS0uOSAyLTIgMnMtMi0uOS0yLTIgLjktMiAyLTIgMiAuOSAyIDJ6bTM0IDM0YzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptMC04YzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptMC05YzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptMC0xN2MwIDEuMS0uOSAyLTIgMnMtMi0uOS0yLTIgLjktMiAyLTIgMiAuOSAyIDJ6bTAgMzRjMCAxLjEtLjkgMi0yIDJzLTItLjktMi0yIC45LTIgMi0yIDIgLjkgMiAyem0wIDhjMCAxLjEtLjkgMi0yIDJzLTItLjktMi0yIC45LTIgMi0yIDIgLjkgMiAyem0wIDljMCAxLjEtLjkgMi0yIDJzLTItLjktMi0yIC45LTIgMi0yIDIgLjkgMiAyem0wLTQyYzAgMS4xLS45IDItMiAycy0yLS45LTItMiAuOS0yIDItMiAyIC45IDIgMnptLTI2LTdoMTl2MmgtMTl6bTAtMzRoMTl2MmgtMTl6bTAgNTFoMTl2MmgtMTl6TTM0IDhoMTl2MkgzNHpNMTcgMjVoMjZ2MkgxN3ptMCA4aDI2djJIMTd6bTAgOGgyNnYySDE3eiIvPjwvZz48L2c+PC9zdmc+')",
                    backgroundRepeat: "repeat",
                    backgroundSize: "60px 60px"
                }}
            />

            <div className="container mx-auto px-4 relative z-10">
                <motion.h2
                    className="text-3xl font-bold text-center mb-16"
                    variants={fadeInUpVariants}
                >
                    Professional Journey
                </motion.h2>

                <div className="relative">
                    {/* Tree trunk */}
                    <motion.div
                        className={`absolute left-1/2 top-0 bottom-0 w-8 rounded-full bg-gradient-to-b ${currentTheme.buttonGradient} transform -translate-x-1/2`}
                        initial={{ height: 0 }}
                        animate={inView ? { height: "100%" } : { height: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />

                    <div className="grid grid-cols-1 gap-20 relative">
                        {userData.experience.map((exp, index) => (
                            <motion.div
                                key={index}
                                className={`relative ${index % 2 === 0 ? 'md:mr-auto md:ml-0 md:pr-12' : 'md:ml-auto md:mr-0 md:pl-12'} md:w-5/12 w-full`}
                                initial={{ opacity: 0 }}
                                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.3 }}
                            >
                                {/* Branch */}
                                <motion.div
                                    className={`absolute top-8 h-1 bg-gradient-to-r ${currentTheme.buttonGradient} ${index % 2 === 0 ? 'right-0 md:w-[calc(50vw/2)]' : 'left-0 md:w-[calc(50vw/2)]'}`}
                                    initial={{ width: 0 }}
                                    animate={inView ? { width: "calc(50vw/2)" } : { width: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 + index * 0.3 }}
                                />

                                {/* Leaf node */}
                                <motion.div
                                    className={`absolute top-6 w-6 h-6 rounded-full bg-gradient-to-b ${currentTheme.accent} border-2 border-white z-10 ${index % 2 === 0 ? 'right-0 -mr-3' : 'left-0 -ml-3'}`}
                                    initial={{ scale: 0 }}
                                    animate={inView ? { scale: 1 } : { scale: 0 }}
                                    transition={{ duration: 0.4, delay: 0.6 + index * 0.3 }}
                                />

                                {/* Accordion 3D Card */}
                                <motion.div
                                    className={`p-6 rounded-xl bg-gradient-to-bl ${currentTheme.accent} backdrop-blur-xl border border-${currentTheme.iconColor.replace('text-', '')}/50 ${currentTheme.textGradient} shadow-lg overflow-hidden transition-all duration-300 ${expandedIndex === index ? `border-${currentTheme.iconColor.replace('text-', '')}/70` : ''}`}
                                    onClick={() => toggleExpand(index)}
                                    whileHover={{
                                        y: -5,
                                        boxShadow: "0 25px 50px -12px rgba(6, 78, 59, 0.3)"
                                    }}
                                    transition={{ duration: 0.2 }}
                                    layout
                                >
                                    {/* Card top decoration - leaf shapes */}
                                    <div className={`absolute -top-1 left-0 right-0 h-1 bg-gradient-to-r ${currentTheme.highlight} `}></div>
                                    <div className={`absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r ${currentTheme.accent} transform -translate-y-1/2`}></div>

                                    {/* Duration pill */}
                                    <div className="absolute top-2 right-3 transform">
                                        <div className={`bg-gradient-to-br ${currentTheme.accent} ${currentTheme.textGradient} text-xs font-bold rounded-full px-3 py-1 shadow-md`}>
                                            {exp.duration}
                                        </div>
                                    </div>

                                    <div className="pt-2">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className={`font-bold text-xl ${currentTheme.textGradient}`}>{exp.role}</h4>
                                            <motion.div
                                                animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                                                className={`${currentTheme.iconColor.replace('text-', 'bg-')}/20 rounded-full p-1 cursor-pointer`}
                                            >
                                                <ChevronDown size={16} className={currentTheme.iconColor} />
                                            </motion.div>
                                        </div>

                                        <div className="flex items-center mb-4 gap-1">
                                            <Briefcase size={16} className={currentTheme.iconColor} />
                                            <span>{exp.company}, {exp.location}</span>
                                        </div>

                                        {/* Accordion content */}
                                        <AnimatePresence>
                                            {expandedIndex === index && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className={`overflow-hidden ${currentTheme.textGradient}`}
                                                >
                                                    {/* Content that appears when expanded */}
                                                    <div className={`mt-4 border-t border-${currentTheme.iconColor.replace('text-', '')}/30 pt-4`}>
                                                        <p className="">{exp.description}</p>

                                                        {/* Additional details section */}
                                                        <div className="mt-4 grid grid-cols-1 gap-3">
                                                            <div className={`bg-${currentTheme.iconColor.replace('text-', '')}/20 p-3 rounded-lg border border-${currentTheme.iconColor.replace('text-', '')}/20`}>
                                                                <h5 className="${currentTheme.textGradient} text-sm font-semibold mb-2">Key Responsibilities</h5>
                                                                <ul className="list-disc list-inside  text-sm space-y-1">
                                                                    {[1, 2, 3].map(item => (
                                                                        <li key={item} className="text-sm">
                                                                            {`Sample responsibility ${item} for ${exp.role}`}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>

                                                            <div className={`bg-${currentTheme.iconColor.replace('text-', '')}/20 p-3 rounded-lg border border-${currentTheme.iconColor.replace('text-', '')}/20`}>
                                                                <h5 className="${currentTheme.textGradient} text-sm font-semibold mb-2">Technologies Used</h5>
                                                                <div className="flex flex-wrap gap-2">
                                                                    {['React', 'TypeScript', 'Node.js'].map(tech => (
                                                                        <span key={tech} className={`px-2 py-1 bg-${currentTheme.iconColor.replace('text-', '')}/30 ${currentTheme.textGradient} text-xs rounded-full`}>
                                                                            {tech}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* Gradient leaf-like decoration at bottom when collapsed */}
                                        {expandedIndex !== index && (
                                            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-900/10 to-transparent"></div>
                                        )}
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default ExperienceSection;