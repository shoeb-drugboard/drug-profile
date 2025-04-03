import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { userData, fadeInUpVariants, fadeInVariants } from "@/assets/data";
import { Copy, ExternalLink, MessageSquare, FileText, MapPin, Calendar } from "lucide-react";
import useTheme from "@/contexts/useTheme";

const ResearchSection = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: false, amount: 0.2 });
    const [activeTab, setActiveTab] = useState("publications");
    const { currentTheme } = useTheme();

    const tabVariants = {
        inactive: { opacity: 0.6, y: 0 },
        active: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3 }
        }
    };

    return (
        <motion.section
            ref={ref}
            className={`py-24 bg-gradient-to-b ${currentTheme.sectionGradient} ${currentTheme.textGradient} pt-24`}
            variants={fadeInVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
        >
            <div className="container mx-auto px-4">
                <motion.h2
                    className="text-3xl font-bold text-center mb-16"
                    variants={fadeInUpVariants}
                >
                    Research & Intellectual Property
                </motion.h2>

                <motion.div
                    className="mb-12 flex justify-center"
                    variants={fadeInUpVariants}
                >
                    <div className={`bg-gradient-to-br ${currentTheme.highlight} backdrop-blur-md rounded-full p-1 border border-slate-700/50 inline-flex`}>
                        <motion.button
                            className={`px-6 py-2 rounded-full text-sm font-medium ${activeTab === "publications" ? `bg-gradient-to-r ${currentTheme.buttonGradient} ${currentTheme.textGradient}` : "text-slate-900"}`}
                            variants={tabVariants}
                            animate={activeTab === "publications" ? "active" : "inactive"}
                            onClick={() => setActiveTab("publications")}
                        >
                            Publications
                        </motion.button>
                        <motion.button
                            className={`px-6 py-2 rounded-full text-sm font-medium ${activeTab === "patents" ? `bg-gradient-to-r ${currentTheme.buttonGradient} ${currentTheme.textGradient}` : "text-slate-900"}`}
                            variants={tabVariants}
                            animate={activeTab === "patents" ? "active" : "inactive"}
                            onClick={() => setActiveTab("patents")}
                        >
                            Patents
                        </motion.button>
                        <motion.button
                            className={`px-6 py-2 rounded-full text-sm font-medium ${activeTab === "presentations" ? `bg-gradient-to-r ${currentTheme.buttonGradient} ${currentTheme.textGradient}` : "text-slate-900"}`}
                            variants={tabVariants}
                            animate={activeTab === "presentations" ? "active" : "inactive"}
                            onClick={() => setActiveTab("presentations")}
                        >
                            Presentations
                        </motion.button>
                    </div>
                </motion.div>

                <AnimatePresence mode="wait">
                    {activeTab === "publications" && (
                        <motion.div
                            key="publications"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {userData.publications.map((pub, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    whileHover={{
                                        y: -5,
                                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                                    }}
                                    className="bg-slate-800/90 backdrop-blur-md rounded-lg border border-slate-700 overflow-hidden shadow-lg"
                                >
                                    <div className={`h-2 bg-gradient-to-r ${currentTheme.buttonGradient}`} />
                                    <div className="p-6">
                                        <h4 className="font-semibold text-lg text-white mb-2">{pub.title}</h4>
                                        <p className="text-sm text-slate-300 mb-4">
                                            {pub.journal} {pub.year}, {pub.volume}, {pub.pages}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <Badge variant="secondary" className={`bg-opacity-50 ${currentTheme.iconColor} border border-opacity-50`}>
                                                {pub.citations} citations
                                            </Badge>
                                            {pub.highlight && (
                                                <Badge variant="outline" className="bg-amber-900/20 text-amber-300 border-amber-800">
                                                    {pub.highlight}
                                                </Badge>
                                            )}
                                        </div>

                                        <div className="flex gap-2 mt-4">
                                            <Button size="sm" variant="outline" className={`gap-1 bg-${currentTheme.buttonGradient} border-slate-600 text-slate-300 hover:bg-slate-700`}>
                                                <Copy size={14} />
                                                <span>Cite</span>
                                            </Button>
                                            <Button size="sm" variant="outline" className={`gap-1 bg-${currentTheme.buttonGradient} border-slate-600 text-slate-300 hover:bg-slate-700`}>
                                                <ExternalLink size={14} />
                                                <span>Read</span>
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    {activeTab === "patents" && (
                        <motion.div
                            key="patents"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-6"
                        >
                            {userData.patents.map((patent, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    whileHover={{
                                        y: -5,
                                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                                    }}
                                    className="bg-slate-800/70 backdrop-blur-md rounded-lg border border-slate-700 overflow-hidden shadow-lg"
                                >
                                    <div className={`h-2 bg-gradient-to-r ${currentTheme.accent}`} />
                                    <div className="p-6">
                                        <h4 className="font-semibold text-lg text-white mb-3">{patent.title}</h4>
                                        <p className="text-sm text-slate-300 mb-4">
                                            {patent.number} • {patent.date}
                                        </p>

                                        <div className="flex gap-2 mt-4">
                                            <Button size="sm" variant="outline" className={`gap-1 bg-${currentTheme.buttonGradient} border-slate-600 text-slate-300 hover:bg-slate-700`}>
                                                <Copy size={14} />
                                                <span>Cite</span>
                                            </Button>
                                            <Button size="sm" variant="outline" className={`gap-1 bg-${currentTheme.buttonGradient} border-slate-600 text-slate-300 hover:bg-slate-700`}>
                                                <ExternalLink size={14} />
                                                <span>View</span>
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    {activeTab === "presentations" && (
                        <motion.div
                            key="presentations"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            {userData.presentations.map((pres, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    whileHover={{
                                        y: -5,
                                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                                    }}
                                    className="bg-slate-800/70 backdrop-blur-md rounded-lg border border-slate-700 overflow-hidden shadow-lg p-6"
                                >
                                    <div className="flex gap-4">
                                        <div className={`p-3 rounded-lg ${pres.type === "Oral" ? "bg-opacity-30" : "bg-opacity-30"} bg-gradient-to-r ${currentTheme.buttonGradient} text-white self-start`}>
                                            {pres.type === "Oral" ? (
                                                <MessageSquare size={24} className="text-white" />
                                            ) : (
                                                <FileText size={24} className="text-white" />
                                            )}
                                        </div>

                                        <div>
                                            <h4 className="font-semibold text-lg text-white mb-2">{pres.title}</h4>
                                            <p className="text-slate-300 mb-3">
                                                {pres.event}
                                            </p>
                                            <div className="flex items-center gap-2 mb-2">
                                                <MapPin size={16} className="text-slate-400" />
                                                <span className="text-slate-300">{pres.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Calendar size={16} className="text-slate-400" />
                                                <span className="text-slate-300">{pres.date}</span>
                                            </div>

                                            <div className="mt-4">
                                                <Badge variant="outline" className={`${pres.type === "Oral" ? "border-amber-800 text-amber-300" : "border-blue-800 text-blue-300"}`}>
                                                    {pres.type} Presentation
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.section>
    );
};

export default ResearchSection;