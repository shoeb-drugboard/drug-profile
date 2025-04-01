import { useRef } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { UserPlus } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { relatedResearchers, fadeInUpVariants, fadeInVariants, staggerContainerVariants } from '@/assets/data';
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import useTheme from "@/contexts/useTheme";

const RelatedResearchersSection = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: false, amount: 0.2 });
    const { currentTheme } = useTheme();

    return (
        <motion.section
            ref={ref}
            className={`py-24 bg-gradient-to-b ${currentTheme.sectionGradient} pt-24`}
            variants={fadeInVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
        >
            <div className="container mx-auto px-4">
                <motion.h2
                    className="text-3xl font-bold text-center mb-16 text-white"
                    variants={fadeInUpVariants}
                >
                    Connect with Related Researchers
                </motion.h2>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
                    variants={staggerContainerVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                >
                    {relatedResearchers.map((researcher) => (
                        <motion.div
                            key={researcher.id}
                            className="bg-slate-800/70 backdrop-blur-md border border-slate-700/50 rounded-lg p-6"
                            variants={fadeInUpVariants}
                            whileHover={{
                                y: -5,
                                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)"
                            }}
                        >
                            <div className="flex flex-col items-center text-center">
                                <Avatar className={`h-20 w-20 mb-4 border-2 border-opacity-30 ${currentTheme.iconColor.replace('text-', 'border-')}`}>
                                    <AvatarImage src={researcher.avatar} alt={researcher.name} />
                                    <AvatarFallback className={`bg-gradient-to-br ${currentTheme.accent}`}>
                                        {researcher.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                </Avatar>
                                <h4 className="font-semibold text-lg text-white mb-1">{researcher.name}</h4>
                                <p className="text-slate-400 text-sm mb-3">{researcher.title}</p>

                                <Badge variant="outline" className={`${currentTheme.iconColor.replace('text-', 'bg-')}/30 ${currentTheme.iconColor} border-opacity-50 border mb-4`}>
                                    {researcher.match}% match
                                </Badge>

                                <Button size="sm" className={`gap-2 bg-gradient-to-r ${currentTheme.buttonGradient} hover:opacity-90 border-none`}>
                                    <UserPlus size={14} />
                                    Connect
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
};

export default RelatedResearchersSection;