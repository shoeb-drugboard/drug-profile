import { motion, useScroll, useTransform } from 'motion/react';
import HeroSection from './profile/HeroSection';
import FloatingMolecules from './FloatingMolecules';
import StatsOverview from './profile/StatsOverview';
import SkillsSection from './profile/SkillsSection';
import AwardsSection from './profile/AwardsSection';
import MolecularNavigation from './MolecularNavigation';
import ResearchSection from './profile/ResearchSection';
import EducationSection from './profile/EducationSection';
import ExperienceSection from './profile/ExperienceSection';
import RecentActivitySection from './profile/RecentActivitySection';
import RelatedResearchersSection from './profile/RelatedResearchersSection';
import useTheme from '@/contexts/useTheme';
import React from 'react';

const UserPage = () => {
    const { currentTheme } = useTheme();

    // Create scroll animations for each section
    return (
        <div className={`min-h-screen bg-gradient-to-b space-y-0 ${currentTheme.name === "Clinical White" ? 'bg-white' : `${currentTheme.secondary} text-white`}`}>
            <FloatingMolecules
                count={12}
                color={`var(--${currentTheme.iconColor.replace('text-', '')})`}
                secondaryColor="rgba(0, 242, 254, 0.8)"
                speed={0.8}
                minSize={80}
                maxSize={200}
            />
            <MolecularNavigation />

            {/* Theme Selector Button */}

            {/* Profile Section */}
            <section id="hero" className={`min-h-screen flex items-center justify-center relative bg-opacity-30`}>
                <ParallaxSection>
                    <HeroSection />
                </ParallaxSection>
            </section>

            {/* Stats Section */}
            <section id="stats" className={`min-h-screen flex items-center justify-center relative bg-opacity-50`}>
                <ParallaxSection>
                    <StatsOverview />
                </ParallaxSection>
            </section>

            {/* Experience Section */}
            <section id="experience" className={`min-h-screen flex items-center justify-center relative bg-opacity-30`}>
                <ParallaxSection speed={0.3}>
                    <ExperienceSection />
                </ParallaxSection>
            </section>

            {/* Education Section */}
            <section id="education" className={`min-h-screen flex items-center justify-center relative bg-opacity-50`}>
                <ParallaxSection speed={0.3}>
                    <EducationSection />
                </ParallaxSection>
            </section>

            {/* Skills Section */}
            <section id="skills" className={`min-h-screen flex items-center justify-center relative bg-opacity-30`}>
                <ParallaxSection>
                    <SkillsSection />
                </ParallaxSection>
            </section>

            {/* Research Section */}
            <section id="research" className={`min-h-screen flex items-center justify-center relative bg-opacity-50`}>
                <ParallaxSection speed={0.3}>
                    <ResearchSection />
                </ParallaxSection>
            </section>

            {/* Awards Section */}
            <section id="awards" className={`min-h-screen flex items-center justify-center relative bg-opacity-30`}>
                <ParallaxSection>
                    <AwardsSection />
                </ParallaxSection>
            </section>

            {/* Activity Section */}
            <section id="activity" className={`min-h-screen flex items-center justify-center relative bg-opacity-50`}>
                <ParallaxSection speed={0.3}>
                    <RecentActivitySection />
                </ParallaxSection>
            </section>

            {/* Connect Section */}
            <section id="connect" className={`min-h-screen flex items-center justify-center relative bg-opacity-30`}>
                <ParallaxSection>
                    <RelatedResearchersSection />
                </ParallaxSection>
            </section>

            {/* Footer */}
            <footer className={`py-8 text-center`}>
                <div className="container mx-auto px-4">
                    <p>© {new Date().getFullYear()} User Profile. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

// Reusable Parallax Section component using motion/react
const ParallaxSection = ({ children, speed = 1 }: { children?: React.ReactElement; speed?: number }) => {
    const { scrollYProgress } = useScroll();
    // Reduced parallax effect to prevent content from moving too far
    const y = useTransform(scrollYProgress, [0, 1], [0, speed * 50]);

    return (
        <motion.div
            className="w-full"
            style={{ y }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, margin: "0px 0px -400px 0px" }}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.div>
    );
};

export default UserPage;
