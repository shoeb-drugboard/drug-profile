import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
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

const UserPage = () => {
    return (
        <ParallaxProvider scrollAxis='vertical'>
            <div className="min-h-screen space-y-10 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
                <FloatingMolecules
                    count={12}
                    color="rgba(79, 172, 254, 0.8)"
                    secondaryColor="rgba(0, 242, 254, 0.8)"
                    speed={0.8}
                    minSize={80}
                    maxSize={200}
                />
                <MolecularNavigation />

                {/* Profile Section */}
                <section id="hero" className="min-h-screen flex items-center justify-center relative">
                    <Parallax translateY={[-20, 20]} className="w-full" >
                        <HeroSection />
                    </Parallax>
                </section>

                {/* Stats Section */}
                <section id="stats" className="min-h-screen flex items-center justify-center relative bg-slate-800/50">
                    <Parallax translateY={[-20, 20]} className="w-full h-full">
                        <StatsOverview />
                    </Parallax>
                </section>

                {/* Experience Section */}
                <section id="experience" className="flex items-center justify-center relative">
                    <Parallax translateY={[-10, 10]} className="w-full h-max">
                        <ExperienceSection />
                    </Parallax>
                </section>

                {/* Education Section */}
                <section id="education" className="min-h-screen flex items-center justify-center relative bg-slate-800/50">
                    <Parallax translateY={[-15, 15]} className="w-full">
                        <EducationSection />
                    </Parallax>
                </section>

                {/* Skills Section */}
                <section id="skills" className="min-h-screen flex items-center justify-center relative">
                    <Parallax translateY={[-20, 20]} className="w-full">
                        <SkillsSection />
                    </Parallax>
                </section>

                {/* Research Section */}
                <section id="research" className="min-h-screen flex items-center justify-center relative bg-slate-800/50">
                    <Parallax translateY={[-15, 15]} className="w-full">
                        <ResearchSection />
                    </Parallax>
                </section>

                {/* Awards Section */}
                <section id="awards" className="min-h-screen flex items-center justify-center relative">
                    <Parallax translateY={[-20, 20]} className="w-full">
                        <AwardsSection />
                    </Parallax>
                </section>

                {/* Activity Section */}
                <section id="activity" className="min-h-screen flex items-center justify-center relative bg-slate-800/50">
                    <Parallax translateY={[-15, 15]} className="w-full">
                        <RecentActivitySection />
                    </Parallax>
                </section>

                {/* Connect Section */}
                <section id="connect" className="min-h-screen flex items-center justify-center relative">
                    <Parallax translateY={[-20, 20]} className="w-full">
                        <RelatedResearchersSection />
                    </Parallax>
                </section>

                {/* Footer */}
                <footer className="bg-slate-900 py-8 text-center text-slate-400">
                    <div className="container mx-auto px-4">
                        <p>© {new Date().getFullYear()} User Profile. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </ParallaxProvider>
    );
};

export default UserPage;
