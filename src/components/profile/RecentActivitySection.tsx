import { useRef } from 'react';
import { Button } from '../ui/button';
import { motion, useInView } from 'motion/react';
import { BookOpen, Calendar, FileCheck, MessageSquare, ChevronDown } from 'lucide-react';
import { userData, fadeInUpVariants, fadeInVariants, staggerContainerVariants } from '@/assets/data';
import useTheme from '@/contexts/useTheme';

const RecentActivitySection = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: false, amount: 0.2 });
    const { currentTheme } = useTheme();

    return (
        <motion.section
            ref={ref}
            className={`py-24 bg-gradient-to-b ${currentTheme.altSectionGradient} ${currentTheme.textGradient} pt-24`}
            variants={fadeInVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
        >
            <div className="container mx-auto px-4">
                <motion.h2
                    className="text-3xl font-bold text-center mb-16"
                    variants={fadeInUpVariants}
                >
                    Recent Activity
                </motion.h2>

                <motion.div
                    className="max-w-3xl mx-auto"
                    variants={staggerContainerVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                >
                    <div className={`relative pl-8 border-l-2 ${currentTheme.iconColor.replace('text-', 'border-')}/30 space-y-8`}>
                        {userData.recentActivity.map((activity, index) => (
                            <motion.div
                                key={index}
                                className="relative"
                                variants={fadeInUpVariants}
                            >
                                {/* Timeline dot */}
                                <div className={`absolute -left-[2.5rem] w-5 h-5 rounded-full bg-gradient-to-r ${currentTheme.buttonGradient} border-4 border-slate-900`} />

                                <motion.div
                                    className="bg-slate-800/70 backdrop-blur-md rounded-lg p-5 border border-slate-700/50"
                                    whileHover={{ x: 5 }}
                                >
                                    <div className="flex gap-4">
                                        <div className={`p-4 flex justify-center items-center rounded-full bg-gradient-to-br ${currentTheme.accent} 
                                          ${activity.type === 'publication' ? ` ${currentTheme.iconColor}` :
                                                activity.type === 'webinar' ? `${currentTheme.iconColor.replace('text-', 'bg-')}/30 ${currentTheme.iconColor}` :
                                                    activity.type === 'forum' ? `${currentTheme.iconColor.replace('text-', 'bg-')}/30 ${currentTheme.iconColor}` :
                                                        `${currentTheme.iconColor.replace('text-', 'bg-')}/30 ${currentTheme.iconColor}`}`}>
                                            {activity.type === 'publication' ? <BookOpen size={18} /> :
                                                activity.type === 'webinar' ? <Calendar size={18} /> :
                                                    activity.type === 'forum' ? <MessageSquare size={18} /> :
                                                        <FileCheck size={18} />}
                                        </div>
                                        <div>
                                            <p className="text-white">{activity.title}</p>
                                            <p className="text-xs text-slate-400 mt-1">{activity.date}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        className="text-center mt-12"
                        variants={fadeInUpVariants}
                    >
                        <Button variant="outline" className={`${currentTheme.iconColor.replace('text-', 'border-')}/30 ${currentTheme.iconColor} hover:bg-opacity-20 hover:bg-slate-700 gap-2`}>
                            View All Activity
                            <ChevronDown size={14} />
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default RecentActivitySection;