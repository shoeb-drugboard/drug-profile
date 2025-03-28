import { useRef } from "react";
import { Trophy } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { userData, fadeInUpVariants, fadeInVariants, staggerContainerVariants } from '@/assets/data';

const AwardsSection = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: false, amount: 0.2 });

    return (
        <motion.section
            ref={ref}
            className="py-24 bg-gradient-to-b from-slate-800 to-slate-900 pt-24"
            variants={fadeInVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
        >
            <div className="container mx-auto px-4">
                <motion.h2
                    className="text-3xl font-bold text-center mb-16 text-white"
                    variants={fadeInUpVariants}
                >
                    Awards & Recognition
                </motion.h2>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    variants={staggerContainerVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                >
                    {userData.awards.map((award, index) => (
                        <motion.div
                            key={index}
                            className="bg-slate-800/70 backdrop-blur-md border border-amber-700/30 rounded-lg overflow-hidden"
                            variants={fadeInUpVariants}
                            whileHover={{
                                y: -5,
                                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3), 0 10px 30px -15px rgba(251, 191, 36, 0.2)"
                            }}
                        >
                            <div className="h-1.5 bg-gradient-to-r from-amber-500 to-yellow-400" />
                            <div className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-amber-500/20 p-3 rounded-lg text-amber-300">
                                        <Trophy size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-lg text-white mb-2">{award.title}</h4>
                                        <p className="text-slate-300">
                                            {award.issuer} • {award.year}
                                        </p>
                                        {award.detail && (
                                            <p className="text-amber-300/70 text-sm mt-2 font-medium">{award.detail}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
};

export default AwardsSection;