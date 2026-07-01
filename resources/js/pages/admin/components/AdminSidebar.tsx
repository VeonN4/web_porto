import { LayoutDashboard, User, Briefcase, Cpu, FileText, FolderCode, LogOut } from 'lucide-react';

interface Props {
    currentTab: string;
    setCurrentTab: (tab: string) => void;
    onLogout: () => void;
    avatarUrl: string;
}

const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'hero', label: 'Hero', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'techstack', label: 'Tech Stack', icon: Cpu },
    { id: 'aboutme', label: 'About Me', icon: FileText },
    { id: 'projects', label: 'Projects', icon: FolderCode },
];

export default function AdminSidebar({ currentTab, setCurrentTab, onLogout, avatarUrl }: Props) {
    return (
        <aside className="hidden md:flex flex-col h-screen w-64 border-r border-white/10 bg-[#0a0a0a] py-8 px-6 sticky top-0 shrink-0 z-40">
            <div className="mb-12 flex flex-col gap-4">
                <div className="w-12 h-12 border border-white/20 overflow-hidden flex items-center justify-center bg-[#1a1a1a]">
                    {avatarUrl ? (
                        <img alt="Admin Avatar" className="object-cover w-full h-full grayscale opacity-80" src={avatarUrl} />
                    ) : (
                        <span className="text-white/40 font-mono text-xs">OS</span>
                    )}
                </div>
                <div>
                    <h1 className="text-xl font-bold text-white tracking-tight uppercase">DEV_ROOT</h1>
                    <p className="text-xs text-white/40 uppercase font-mono tracking-widest mt-1">v1.0.0-stable</p>
                </div>
            </div>

            <nav className="flex-grow">
                <ul className="flex flex-col gap-5 uppercase text-sm font-mono font-medium">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = currentTab === item.id;
                        return (
                            <li key={item.id}>
                                <button
                                    onClick={() => setCurrentTab(item.id)}
                                    className={`w-full flex items-center gap-3 text-left transition-all duration-150 cursor-pointer ${
                                        isActive ? 'text-white font-bold translate-x-1' : 'text-white/40 hover:text-white hover:translate-x-1'
                                    }`}
                                >
                                    <span className={`w-5 transition-all ${isActive ? 'opacity-100' : 'opacity-0'}`}>-&gt;</span>
                                    <Icon size={16} className={isActive ? 'text-white' : 'text-white/40'} />
                                    <span>{item.label}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className="mt-auto pt-6 border-t border-white/10">
                <button
                    onClick={onLogout}
                    className="w-full flex items-center justify-between text-left text-xs font-mono font-bold text-white/40 hover:text-white border border-white/10 hover:border-white py-2.5 px-3 uppercase transition-all cursor-pointer"
                >
                    <span>LOG_OUT</span>
                    <LogOut size={14} />
                </button>
            </div>
        </aside>
    );
}
