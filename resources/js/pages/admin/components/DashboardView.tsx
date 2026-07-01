import { router } from '@inertiajs/react';
import { FolderOpen, Cpu, Terminal as TerminalIcon, Loader2, Server, Database, Briefcase, FileCode, Check } from 'lucide-react';
import { useState } from 'react';
import type { SystemLog } from '@/types/portfolio';

interface Props {
    totalProjects: number;
    techStackCount: number;
    totalExperiences: number;
    logs: SystemLog[];
    onCommit: (msg: string) => void;
}

export default function DashboardView({
    totalProjects,
    techStackCount,
    totalExperiences,
    logs,
    onCommit,
}: Props) {
    const [isClearingCache, setIsClearingCache] = useState(false);
    const [isRunningTests, setIsRunningTests] = useState(false);
    
    // Quick Add Modal States
    const [activeModal, setActiveModal] = useState<'project' | 'experience' | 'tech' | null>(null);

    // Form inputs
    const [projTitle, setProjTitle] = useState('');
    const [projDesc, setProjDesc] = useState('');
    const [projTags, setProjTags] = useState('');

    const [expRole, setExpRole] = useState('');
    const [expCompany, setExpCompany] = useState('');
    const [expPeriod, setExpPeriod] = useState('');

    const [techName, setTechName] = useState('');
    const [techType, setTechType] = useState('core');

    const handleAddProject = (e: React.FormEvent) => {
        e.preventDefault();

        if (!projTitle.trim()) {
return;
}

        const tags = projTags.split(',').map(t => t.trim()).filter(Boolean);
        router.post(
            '/admin/projects',
            { title: projTitle.trim().toUpperCase(), description: projDesc.trim(), tags, status: 'production' },
            {
                preserveScroll: true,
                onSuccess: () => {
                    onCommit(`Injected Project: "${projTitle.toUpperCase()}"`);
                    setProjTitle(''); setProjDesc(''); setProjTags('');
                    setActiveModal(null);
                }
            }
        );
    };

    const handleAddExperience = (e: React.FormEvent) => {
        e.preventDefault();

        if (!expRole.trim()) {
return;
}

        router.post(
            '/admin/experiences',
            { role: expRole.trim(), company: expCompany.trim(), period: expPeriod.trim(), bullets: ['New entry created via dashboard'], technologies: [] },
            {
                preserveScroll: true,
                onSuccess: () => {
                    onCommit(`Injected Experience: "${expRole}"`);
                    setExpRole(''); setExpCompany(''); setExpPeriod('');
                    setActiveModal(null);
                }
            }
        );
    };

    const handleAddTech = (e: React.FormEvent) => {
        e.preventDefault();

        if (!techName.trim()) {
return;
}

        router.post(
            '/admin/tech-stacks',
            { name: techName.trim(), type: techType },
            {
                preserveScroll: true,
                onSuccess: () => {
                    onCommit(`Registered Tech: "${techName}"`);
                    setTechName('');
                    setActiveModal(null);
                }
            }
        );
    };

    return (
        <div id="dashboard-view-root" className="flex flex-col gap-10">
            <header className="hidden md:flex justify-between items-end border-b border-white/10 pb-4">
                <div>
                    <h2 className="text-3xl font-bold text-white uppercase tracking-tight">/Dashboard</h2>
                    <p className="text-xs text-white/40 font-mono mt-2">// System overview & metrics</p>
                </div>
                <span className="text-xs text-white/40 font-mono uppercase tracking-wider">[ SYSTEM_HEALTH: OK ]</span>
            </header>

            {/* Metrics and Info Grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-white/10 p-6 relative group bg-[#111] hover:border-white/30 transition-all">
                    <div className="absolute top-4 right-4 text-white/20 group-hover:text-white/60 transition-colors">
                        <FolderOpen size={20} />
                    </div>
                    <h3 className="text-xs text-white/40 font-mono uppercase tracking-widest mb-4">Total Projects</h3>
                    <div className="text-5xl font-bold text-white">{totalProjects}</div>
                    <div className="mt-4 text-xs text-white/30 font-mono">From database</div>
                </div>
                <div className="border border-white/10 p-6 relative group bg-[#111] hover:border-white/30 transition-all">
                    <div className="absolute top-4 right-4 text-white/20 group-hover:text-white/60 transition-colors">
                        <Cpu size={20} />
                    </div>
                    <h3 className="text-xs text-white/40 font-mono uppercase tracking-widest mb-4">Tech Stack Items</h3>
                    <div className="text-5xl font-bold text-white">{techStackCount}</div>
                    <div className="mt-4 text-xs text-white/30 font-mono">Active dependencies</div>
                </div>
                <div className="border border-white/10 p-6 relative group bg-[#111] hover:border-white/30 transition-all">
                    <div className="absolute top-4 right-4 text-white/20 group-hover:text-white/60 transition-colors">
                        <Briefcase size={20} />
                    </div>
                    <h3 className="text-xs text-white/40 font-mono uppercase tracking-widest mb-4">Experiences</h3>
                    <div className="text-5xl font-bold text-white">{totalExperiences}</div>
                    <div className="mt-4 text-xs text-white/30 font-mono">Work timeline history</div>
                </div>
            </section>

            {/* Middle row: System Details & Logs */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* System Specs & Details */}
                <div className="border border-white/10 flex flex-col bg-[#111] p-6 justify-between gap-6">
                    <div>
                        <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-4 flex items-center gap-2">
                            <Server size={14} /> System Registry Info
                        </h3>
                        <div className="space-y-4 font-mono text-[11px] text-white/70">
                            <div className="flex justify-between border-b border-white/5 pb-2">
                                <span className="text-white/40">APPLICATION ENV</span>
                                <span className="text-green-400">production</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-2">
                                <span className="text-white/40">DATABASE DRIVER</span>
                                <span>sqlite</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-2">
                                <span className="text-white/40">GATEWAY SYSTEM</span>
                                <span>Inertia.js v3.0</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-2">
                                <span className="text-white/40">ENGINE ENGINE</span>
                                <span>Laravel / React</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="border-t border-white/10 pt-4">
                        <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-3 flex items-center gap-2">
                            <Database size={14} /> Database Integrity
                        </h3>
                        <div className="flex items-center gap-2 bg-black border border-white/10 p-2.5 rounded font-mono text-[10px] text-white/50">
                            <Check size={12} className="text-green-400" />
                            <span>SCHEMA SYNCHRONIZED & READY</span>
                        </div>
                    </div>
                </div>

                {/* System Logs */}
                <div className="lg:col-span-2 border border-white/10 flex flex-col h-[320px] lg:h-[auto] bg-black">
                    <div className="border-b border-white/10 p-4 bg-[#111] flex justify-between items-center">
                        <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                            <TerminalIcon size={14} /> System Logs
                        </h3>
                        <div className="flex gap-1.5">
                            <span className="w-2.5 h-2.5 border border-white/20 rounded-full" />
                            <span className="w-2.5 h-2.5 border border-white/20 rounded-full" />
                            <span className="w-2.5 h-2.5 bg-white rounded-full" />
                        </div>
                    </div>
                    <div className="p-6 overflow-y-auto flex-grow font-mono text-xs space-y-3">
                        {logs.length === 0 && <p className="text-white/30 uppercase">// No logs yet — make a change.</p>}
                        {logs.map((log) => (
                            <div key={log.id} className={`flex gap-4 items-start ${log.isOpacityReduced ? 'opacity-40' : ''}`}>
                                <span className="text-white/20 shrink-0 select-none">{log.time}</span>
                                <span
                                    className={`font-bold uppercase shrink-0 ${
                                        log.action === 'COMMIT'
                                            ? 'text-white'
                                            : log.action === 'DEPLOY'
                                              ? 'text-green-400'
                                              : log.action === 'WARN'
                                                ? 'text-yellow-500'
                                                : 'text-blue-400'
                                    }`}
                                >
                                    {log.action}:
                                </span>
                                <span className="text-white/70 break-all">{log.message}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom row: Actions & Management */}
            <section className="grid grid-cols-1 gap-8">
                {/* Actions Panel */}
                <div className="border border-white/10 p-6 flex flex-col bg-[#111]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-4 border-b border-white/10 pb-2">
                                Quick Injections
                            </h3>
                            <div className="flex flex-col gap-2.5">
                                <button
                                    onClick={() => setActiveModal('project')}
                                    className="w-full border border-white/10 hover:border-white hover:bg-white hover:text-black py-2.5 font-mono text-[11px] uppercase cursor-pointer transition-all flex items-center justify-between px-3"
                                >
                                    <span>[ + PROJECT ]</span>
                                    <FileCode size={12} />
                                </button>
                                <button
                                    onClick={() => setActiveModal('experience')}
                                    className="w-full border border-white/10 hover:border-white hover:bg-white hover:text-black py-2.5 font-mono text-[11px] uppercase cursor-pointer transition-all flex items-center justify-between px-3"
                                >
                                    <span>[ + EXPERIENCE ]</span>
                                    <Briefcase size={12} />
                                </button>
                                <button
                                    onClick={() => setActiveModal('tech')}
                                    className="w-full border border-white/10 hover:border-white hover:bg-white hover:text-black py-2.5 font-mono text-[11px] uppercase cursor-pointer transition-all flex items-center justify-between px-3"
                                >
                                    <span>[ + TECH STACK ]</span>
                                    <Cpu size={12} />
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between">
                            <div>
                                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-4 border-b border-white/10 pb-2">
                                    Quick Actions
                                </h3>
                                <div className="flex gap-4 text-xs font-mono mt-4">
                                    <button
                                        onClick={() => {
                                            setIsClearingCache(true);
                                            router.post('/admin/actions/clear-cache', {}, {
                                                preserveScroll: true,
                                                onFinish: () => setIsClearingCache(false)
                                            });
                                        }}
                                        disabled={isClearingCache}
                                        className="border border-white/10 px-4 py-2.5 text-white/60 hover:border-white hover:text-white transition-colors cursor-pointer uppercase text-[11px] flex items-center gap-1.5"
                                    >
                                        {isClearingCache ? <><Loader2 size={12} className="animate-spin" /> CLEARING</> : '[ Clear Cache ]'}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsRunningTests(true);
                                            router.post('/admin/actions/run-tests', {}, {
                                                preserveScroll: true,
                                                onFinish: () => setIsRunningTests(false)
                                            });
                                        }}
                                        disabled={isRunningTests}
                                        className="border border-white/10 px-4 py-2.5 text-white/60 hover:border-white hover:text-white transition-colors cursor-pointer uppercase text-[11px] flex items-center gap-1.5"
                                    >
                                        {isRunningTests ? <><Loader2 size={12} className="animate-spin" /> TESTING</> : '[ Run Tests ]'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Add Modals */}
            {activeModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 font-mono text-xs">
                    <div className="w-full max-w-md border border-white/20 bg-[#111] p-6 relative">
                        <button
                            onClick={() => setActiveModal(null)}
                            className="absolute top-4 right-4 text-white/40 hover:text-white cursor-pointer"
                        >
                            [X]
                        </button>
                        
                        {activeModal === 'project' && (
                            <form onSubmit={handleAddProject} className="flex flex-col gap-4">
                                <h3 className="text-sm font-bold text-white uppercase border-b border-white/10 pb-2">Quick Add Project</h3>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-white/40 font-bold uppercase text-[10px]">Project Title</label>
                                    <input type="text" value={projTitle} onChange={e => setProjTitle(e.target.value)} required className="bg-black border border-white/20 text-white p-2 outline-none uppercase" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-white/40 font-bold uppercase text-[10px]">Description</label>
                                    <input type="text" value={projDesc} onChange={e => setProjDesc(e.target.value)} required className="bg-black border border-white/20 text-white p-2 outline-none" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-white/40 font-bold uppercase text-[10px]">Tags (comma-separated)</label>
                                    <input type="text" value={projTags} onChange={e => setProjTags(e.target.value)} className="bg-black border border-white/20 text-white p-2 outline-none" />
                                </div>
                                <button type="submit" className="bg-white text-black hover:bg-neutral-200 py-2.5 font-bold uppercase mt-2">Inject Record</button>
                            </form>
                        )}

                        {activeModal === 'experience' && (
                            <form onSubmit={handleAddExperience} className="flex flex-col gap-4">
                                <h3 className="text-sm font-bold text-white uppercase border-b border-white/10 pb-2">Quick Add Experience</h3>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-white/40 font-bold uppercase text-[10px]">Role / Title</label>
                                    <input type="text" value={expRole} onChange={e => setExpRole(e.target.value)} required className="bg-black border border-white/20 text-white p-2 outline-none" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-white/40 font-bold uppercase text-[10px]">Company Name</label>
                                    <input type="text" value={expCompany} onChange={e => setExpCompany(e.target.value)} required className="bg-black border border-white/20 text-white p-2 outline-none" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-white/40 font-bold uppercase text-[10px]">Period</label>
                                    <input type="text" value={expPeriod} onChange={e => setExpPeriod(e.target.value)} placeholder="e.g. 2025 - Present" required className="bg-black border border-white/20 text-white p-2 outline-none" />
                                </div>
                                <button type="submit" className="bg-white text-black hover:bg-neutral-200 py-2.5 font-bold uppercase mt-2">Inject Record</button>
                            </form>
                        )}

                        {activeModal === 'tech' && (
                            <form onSubmit={handleAddTech} className="flex flex-col gap-4">
                                <h3 className="text-sm font-bold text-white uppercase border-b border-white/10 pb-2">Quick Add Tech Item</h3>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-white/40 font-bold uppercase text-[10px]">Component Name</label>
                                    <input type="text" value={techName} onChange={e => setTechName(e.target.value)} required className="bg-black border border-white/20 text-white p-2 outline-none" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-white/40 font-bold uppercase text-[10px]">Category / Type</label>
                                    <select value={techType} onChange={e => setTechType(e.target.value)} className="bg-black border border-white/20 text-white p-2 outline-none">
                                        <option value="core">Core Stack</option>
                                        <option value="featured">Featured Stack</option>
                                        <option value="backend">Backend Components</option>
                                        <option value="infrastructure">Infrastructure</option>
                                        <option value="tooling">Tooling</option>
                                    </select>
                                </div>
                                <button type="submit" className="bg-white text-black hover:bg-neutral-200 py-2.5 font-bold uppercase mt-2">Inject Record</button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
