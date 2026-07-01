import { router } from '@inertiajs/react';
import { Plus, Trash2, Check, List, Save, PlusCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import type { ExperienceItem } from '@/types/portfolio';

interface Props {
    experienceNodes: ExperienceItem[];
    setExperienceNodes: React.Dispatch<React.SetStateAction<ExperienceItem[]>>;
    onCommit: (msg: string) => void;
}

export default function ExperienceView({ experienceNodes, setExperienceNodes, onCommit }: Props) {
    const [saveStatus, setSaveStatus] = useState<string | null>(null);

    const handleAddPosition = () => {
        router.post(
            '/admin/experiences',
            { role: 'New Position', company: 'New Company Inc.', period: '2025 - Present', bullets: ['Describe your key accomplishments...'], technologies: [] },
            {
                preserveScroll: true,
                onSuccess: (page) => {
                    const newExp = (page.props as { flash?: { experience?: ExperienceItem } }).flash?.experience;

                    if (newExp) {
setExperienceNodes((prev) => [newExp, ...prev]);
}

                    onCommit('Added new experience position');
                },
            },
        );
    };

    const handleDeletePosition = (id: number, role: string) => {
        router.delete(`/admin/experiences/${id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setExperienceNodes((prev) => prev.filter((n) => n.id !== id));
                onCommit(`Removed experience: "${role}"`);
            },
        });
    };

    const handleSaveAll = () => {
        setSaveStatus('SAVING');
        const updates = experienceNodes.map((n) =>
            new Promise<void>((resolve) => {
                router.put(
                    `/admin/experiences/${n.id}`,
                    { role: n.role, company: n.company, period: n.period, bullets: n.bullets, technologies: n.technologies },
                    { preserveScroll: true, onSuccess: () => resolve() },
                );
            }),
        );
        Promise.all(updates).then(() => {
            onCommit('Committed career timeline changes');
            setSaveStatus('SUCCESS');
            setTimeout(() => setSaveStatus(null), 2500);
        });
    };

    const updateField = (id: number, field: keyof Pick<ExperienceItem, 'role' | 'company' | 'period'>, value: string) =>
        setExperienceNodes((prev) => prev.map((n) => (n.id === id ? { ...n, [field]: value } : n)));

    const updateBullet = (id: number, index: number, value: string) =>
        setExperienceNodes((prev) =>
            prev.map((n) => {
                if (n.id !== id) {
return n;
}

                const b = [...n.bullets];
                b[index] = value;

                return { ...n, bullets: b };
            }),
        );

    return (
        <div id="experience-view-root" className="flex flex-col gap-10">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-4 gap-6">
                <div>
                    <h2 className="text-3xl font-bold text-white uppercase tracking-tight">Experience Manager</h2>
                    <p className="text-xs text-white/40 mt-2 font-mono">// Manage career nodes and accomplishments.</p>
                </div>
                <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                    <button
                        onClick={handleAddPosition}
                        className="border border-white text-white hover:bg-white hover:text-black px-5 py-2.5 font-mono text-xs uppercase cursor-pointer transition-all flex items-center gap-2"
                    >
                        <Plus size={14} /> Add Position
                    </button>
                    <button
                        onClick={handleSaveAll}
                        className={`px-5 py-2.5 font-mono text-xs uppercase cursor-pointer transition-all border flex items-center gap-2 ${
                            saveStatus === 'SUCCESS'
                                ? 'bg-green-950 border-green-500 text-green-300'
                                : 'bg-white border-white text-black hover:bg-neutral-200'
                        }`}
                    >
                        {saveStatus === 'SUCCESS' ? <Check size={14} /> : <Save size={14} />}
                        {saveStatus === 'SAVING' ? 'SAVING...' : saveStatus === 'SUCCESS' ? 'COMMIT STABLE' : 'COMMIT TIMELINE'}
                    </button>
                </div>
            </header>

            <div className="relative pl-0 md:pl-12 flex flex-col gap-12 before:hidden md:before:block before:absolute before:left-[15px] before:top-4 before:bottom-4 before:w-[1px] before:bg-white/10">
                {experienceNodes.length === 0 ? (
                    <div className="border border-white/10 p-8 text-center bg-[#111] text-white/40 flex flex-col items-center gap-3">
                        <AlertCircle size={24} className="text-white/20" />
                        <p className="font-mono text-sm uppercase">No experience entries in database</p>
                    </div>
                ) : (
                    experienceNodes.map((node) => (
                        <article key={node.id} className="relative flex flex-col gap-4 group">
                            <div className="hidden md:block absolute -left-12 top-6 w-2.5 h-2.5 bg-black border-2 border-white group-hover:bg-white transition-all z-10" />
                            <div className="border border-white/10 hover:border-white/30 transition-colors bg-black flex flex-col">
                                <div className="border-b border-white/10 p-5 md:p-6 flex flex-col md:flex-row gap-5 justify-between bg-[#111]">
                                    <div className="flex flex-col gap-1 flex-1">
                                        <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-bold">Role Title</label>
                                        <input
                                            type="text"
                                            value={node.role}
                                            onChange={(e) => updateField(node.id, 'role', e.target.value)}
                                            className="text-white text-base font-bold bg-transparent border-0 border-b border-transparent focus:border-white focus:ring-0 px-0 pb-1 w-full transition-all outline-none"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1 flex-1">
                                        <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-bold">Company</label>
                                        <input
                                            type="text"
                                            value={node.company}
                                            onChange={(e) => updateField(node.id, 'company', e.target.value)}
                                            className="text-white/70 text-sm font-mono bg-transparent border-0 border-b border-transparent focus:border-white focus:ring-0 px-0 pb-1 w-full transition-all outline-none"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1 md:w-44">
                                        <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-bold">Duration</label>
                                        <input
                                            type="text"
                                            value={node.period}
                                            onChange={(e) => updateField(node.id, 'period', e.target.value)}
                                            className="text-white/40 text-xs font-mono bg-transparent border-0 border-b border-transparent focus:border-white focus:ring-0 px-0 pb-1 w-full transition-all outline-none"
                                        />
                                    </div>
                                    <div className="flex items-center self-end md:self-center">
                                        <button
                                            onClick={() => handleDeletePosition(node.id, node.role)}
                                            className="text-white/20 hover:text-red-500 p-2 border border-transparent hover:border-red-900 transition-all cursor-pointer"
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                </div>

                                <div className="p-5 md:p-6 flex flex-col gap-5">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-bold flex items-center gap-2">
                                            <List size={12} /> Accomplishments
                                        </span>
                                        <button
                                            onClick={() =>
                                                setExperienceNodes((prev) =>
                                                    prev.map((n) =>
                                                        n.id === node.id ? { ...n, bullets: [...n.bullets, 'Enter key bullet...'] } : n,
                                                    ),
                                                )
                                            }
                                            className="text-white/20 hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-mono uppercase"
                                        >
                                            <PlusCircle size={14} /> Add bullet
                                        </button>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        {node.bullets.map((bullet, index) => (
                                            <div key={index} className="flex gap-4 items-start group/bullet">
                                                <span className="text-white mt-2 text-sm font-bold select-none">*</span>
                                                <textarea
                                                    value={bullet}
                                                    onChange={(e) => updateBullet(node.id, index, e.target.value)}
                                                    rows={2}
                                                    className="flex-grow bg-transparent border-0 border-b border-white/10 focus:border-white focus:ring-0 px-0 py-1 font-mono text-xs leading-relaxed text-[#e5e1e4] resize-none transition-all outline-none"
                                                />
                                                <button
                                                    onClick={() =>
                                                        setExperienceNodes((prev) =>
                                                            prev.map((n) =>
                                                                n.id === node.id
                                                                    ? { ...n, bullets: n.bullets.filter((_, i) => i !== index) }
                                                                    : n,
                                                            ),
                                                        )
                                                    }
                                                    className="opacity-0 group-hover/bullet:opacity-100 text-white/20 hover:text-red-500 transition-all p-1 mt-1 cursor-pointer"
                                                >
                                                    <Trash2 size={12} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))
                )}
            </div>
        </div>
    );
}
