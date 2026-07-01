import { useState, useEffect } from 'react';
import { LayoutDashboard, Terminal as TerminalIcon, LogOut, FolderCode } from 'lucide-react';
import { router } from '@inertiajs/react';
import type {
    HeroSettings,
    AboutSettings,
    ExperienceItem,
    TechStackItem,
    Project,
    SystemLog,
} from '@/types/portfolio';
import AdminSidebar from './components/AdminSidebar';
import DashboardView from './components/DashboardView';
import HeroConfigView from './components/HeroConfigView';
import ExperienceView from './components/ExperienceView';
import TechStackView from './components/TechStackView';
import AboutMeView from './components/AboutMeView';
import ProjectsView from './components/ProjectsView';

interface Props {
    hero: HeroSettings;
    about: AboutSettings;
    experiences: ExperienceItem[];
    projects: Project[];
    techStacks: TechStackItem[];
    logs?: SystemLog[];
}

export default function AdminDashboard({ hero, about, experiences, projects, techStacks, logs }: Props) {
    const [currentTab, setCurrentTab] = useState('dashboard');
    const [systemLogs, setSystemLogs] = useState<SystemLog[]>(logs || []);

    const [heroData, setHeroData] = useState<HeroSettings>(hero);
    const [aboutData, setAboutData] = useState<AboutSettings>(about);
    const [experienceNodes, setExperienceNodes] = useState<ExperienceItem[]>(experiences);
    const [projectList, setProjectList] = useState<Project[]>(projects);
    const [techStackItems, setTechStackItems] = useState<TechStackItem[]>(techStacks);

    // Keep state synced with Inertia props changes
    useEffect(() => { setHeroData(hero); }, [hero]);
    useEffect(() => { setAboutData(about); }, [about]);
    useEffect(() => { setExperienceNodes(experiences); }, [experiences]);
    useEffect(() => { setProjectList(projects); }, [projects]);
    useEffect(() => { setTechStackItems(techStacks); }, [techStacks]);
    useEffect(() => { setSystemLogs(logs || []); }, [logs]);

    const addLog = (action: string, message: string) => {
        router.post('/admin/logs', { action, message }, { preserveScroll: true });
    };

    const handleLogout = () => {
        router.post('/admin/logout');
    };

    return (
        <div id="portfolio-os-app" className="min-h-screen bg-[#0a0a0a] text-[#e5e1e4] flex flex-col md:flex-row font-sans">
            {/* Mobile TopNav */}
            <nav className="md:hidden bg-[#0a0a0a] w-full border-b border-white/10 flex justify-between items-center px-4 py-3 sticky top-0 z-50">
                <div className="font-bold uppercase tracking-tight text-white font-mono text-sm flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></span>
                    PORTFOLIO_OS
                </div>
                <span className="font-mono text-[9px] text-white/40 uppercase">[ HEALTH: OK ]</span>
            </nav>

            <AdminSidebar
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                onLogout={handleLogout}
                avatarUrl={aboutData.concrete_image}
            />

            <main className="flex-1 overflow-x-hidden p-4 md:p-12 max-w-7xl mx-auto w-full flex flex-col min-h-[calc(100vh-60px)] md:min-h-screen">
                {currentTab === 'dashboard' && (
                    <DashboardView
                        totalProjects={projectList.length}
                        techStackCount={techStackItems.length}
                        totalExperiences={experienceNodes.length}
                        logs={systemLogs}
                        setLogs={setSystemLogs}
                        onCommit={(msg) => addLog('COMMIT', msg)}
                    />
                )}
                {currentTab === 'hero' && (
                    <HeroConfigView heroData={heroData} setHeroData={setHeroData} onCommit={(msg) => addLog('COMMIT', msg)} />
                )}
                {currentTab === 'experience' && (
                    <ExperienceView
                        experienceNodes={experienceNodes}
                        setExperienceNodes={setExperienceNodes}
                        onCommit={(msg) => addLog('COMMIT', msg)}
                    />
                )}
                {currentTab === 'techstack' && (
                    <TechStackView
                        techStacks={techStackItems}
                        setTechStacks={setTechStackItems}
                        onCommit={(msg) => addLog('COMMIT', msg)}
                    />
                )}
                {currentTab === 'aboutme' && (
                    <AboutMeView aboutData={aboutData} setAboutData={setAboutData} onCommit={(msg) => addLog('COMMIT', msg)} />
                )}
                {currentTab === 'projects' && (
                    <ProjectsView
                        projects={projectList}
                        setProjects={setProjectList}
                        onCommit={(msg) => addLog('COMMIT', msg)}
                    />
                )}
            </main>

            {/* Mobile BottomNav */}
            <nav className="md:hidden fixed bottom-0 left-0 w-full bg-[#0a0a0a] border-t border-white/10 py-1 px-2 flex justify-around items-center z-50">
                <button
                    onClick={() => setCurrentTab('dashboard')}
                    className={`flex flex-col items-center p-2 cursor-pointer ${currentTab === 'dashboard' ? 'text-white' : 'text-white/40'}`}
                >
                    <LayoutDashboard size={18} />
                    <span className="text-[9px] font-mono mt-1 font-bold">Dashboard</span>
                </button>
                <button
                    onClick={() => setCurrentTab('techstack')}
                    className={`flex flex-col items-center p-2 cursor-pointer ${currentTab === 'techstack' ? 'text-white' : 'text-white/40'}`}
                >
                    <TerminalIcon size={18} />
                    <span className="text-[9px] font-mono mt-1">Stack</span>
                </button>
                <button
                    onClick={() => setCurrentTab('projects')}
                    className={`flex flex-col items-center p-2 cursor-pointer ${currentTab === 'projects' ? 'text-white' : 'text-white/40'}`}
                >
                    <FolderCode size={18} />
                    <span className="text-[9px] font-mono mt-1">Projects</span>
                </button>
                <button onClick={handleLogout} className="flex flex-col items-center p-2 cursor-pointer text-white/40 hover:text-red-400">
                    <LogOut size={18} />
                    <span className="text-[9px] font-mono mt-1">Logout</span>
                </button>
            </nav>
        </div>
    );
}
