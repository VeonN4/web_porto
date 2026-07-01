import { router } from '@inertiajs/react';
import { Save, Check, MapPin, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import type { AboutSettings } from '@/types/portfolio';

interface Props {
    aboutData: AboutSettings;
    setAboutData: (data: AboutSettings) => void;
    onCommit: (msg: string) => void;
}

export default function AboutMeView({ aboutData, setAboutData, onCommit }: Props) {
    const [form, setForm] = useState({ ...aboutData });
    const [saved, setSaved] = useState(false);
    const [newCompetency, setNewCompetency] = useState('');

    const handleSave = () => {
        router.put('/admin/about', form, {
            preserveScroll: true,
            onSuccess: () => {
                setAboutData(form);
                setSaved(true);
                onCommit('Committed about.md updates');
                setTimeout(() => setSaved(false), 2500);
            },
        });
    };

    return (
        <div id="about-me-view-root" className="flex flex-col h-full">
            <header className="w-full border-b border-white/10 flex justify-between items-center pb-4 mb-8 shrink-0">
                <h2 className="text-xl font-bold text-white uppercase tracking-tight font-mono">~ / system / about.md</h2>
                <button
                    onClick={handleSave}
                    className={`px-5 py-2.5 font-mono text-xs uppercase cursor-pointer transition-all border flex items-center gap-2 ${
                        saved ? 'bg-green-950 border-green-500 text-green-300' : 'bg-white border-white text-black hover:bg-neutral-200'
                    }`}
                >
                    {saved ? <Check size={14} /> : <Save size={14} />}
                    {saved ? 'COMMIT_SUCCESS' : 'COMMIT CHANGES'}
                </button>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start text-left flex-grow">
                <div className="xl:col-span-8 flex flex-col gap-6">
                    {/* Bio Paragraphs */}
                    <div className="border border-white/10 bg-black">
                        <div className="border-b border-white/10 bg-[#111] px-4 py-2.5 flex justify-between items-center">
                            <span className="text-xs font-mono text-white uppercase tracking-wider">Bio Paragraphs</span>
                            <button
                                onClick={() => setForm((f) => ({ ...f, paragraphs: [...f.paragraphs, ''] }))}
                                className="text-white/40 hover:text-white cursor-pointer"
                            >
                                <Plus size={14} />
                            </button>
                        </div>
                        <div className="p-5 flex flex-col gap-5">
                            {form.paragraphs.map((para, i) => (
                                <div key={i} className="flex gap-3 items-start">
                                    <span className="text-white/30 font-mono text-xs mt-3 select-none">{i + 1}.</span>
                                    <textarea
                                        value={para}
                                        onChange={(e) =>
                                            setForm((f) => ({ ...f, paragraphs: f.paragraphs.map((p, j) => (j === i ? e.target.value : p)) }))
                                        }
                                        rows={3}
                                        className="flex-grow bg-transparent border border-white/10 focus:border-white focus:ring-0 text-white font-mono text-xs p-3 resize-none leading-relaxed transition-colors outline-none"
                                    />
                                    <button
                                        onClick={() => setForm((f) => ({ ...f, paragraphs: f.paragraphs.filter((_, j) => j !== i) }))}
                                        className="text-white/20 hover:text-red-500 mt-2 cursor-pointer"
                                    >
                                        <Trash2 size={13} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Competencies */}
                    <div className="border border-white/10 bg-black">
                        <div className="border-b border-white/10 bg-[#111] px-4 py-2.5">
                            <span className="text-xs font-mono text-white uppercase tracking-wider">Core Competencies</span>
                        </div>
                        <div className="p-5 flex flex-col gap-3">
                            {form.competencies.map((c, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <span className="text-white/30 font-mono text-xs">›</span>
                                    <input
                                        type="text"
                                        value={c}
                                        onChange={(e) =>
                                            setForm((f) => ({
                                                ...f,
                                                competencies: f.competencies.map((x, j) => (j === i ? e.target.value : x)),
                                            }))
                                        }
                                        className="flex-grow bg-transparent border-b border-white/10 focus:border-white focus:ring-0 text-white font-mono text-xs px-0 py-1.5 transition-colors outline-none"
                                    />
                                    <button
                                        onClick={() => setForm((f) => ({ ...f, competencies: f.competencies.filter((_, j) => j !== i) }))}
                                        className="text-white/20 hover:text-red-500 cursor-pointer"
                                    >
                                        <Trash2 size={12} />
                                    </button>
                                </div>
                            ))}
                            <div className="flex gap-2 mt-1">
                                <input
                                    type="text"
                                    value={newCompetency}
                                    onChange={(e) => setNewCompetency(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();

                                            if (!newCompetency.trim()) {
return;
}

                                            setForm((f) => ({ ...f, competencies: [...f.competencies, newCompetency.trim()] }));
                                            setNewCompetency('');
                                        }
                                    }}
                                    placeholder="Add competency..."
                                    className="flex-grow bg-transparent border-b border-white/10 focus:border-white focus:ring-0 text-white font-mono text-xs px-0 py-1.5 transition-colors outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (!newCompetency.trim()) {
return;
}

                                        setForm((f) => ({ ...f, competencies: [...f.competencies, newCompetency.trim()] }));
                                        setNewCompetency('');
                                    }}
                                    className="text-white/40 hover:text-white cursor-pointer"
                                >
                                    <Plus size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Metadata */}
                <div className="xl:col-span-4 space-y-6">
                    <div className="border border-white/10 bg-black">
                        <div className="border-b border-white/10 bg-[#111] px-4 py-2.5">
                            <span className="text-xs font-mono text-white uppercase tracking-wider">Section Headers</span>
                        </div>
                        <div className="p-5 flex flex-col gap-5">
                            {[
                                { label: 'Header', key: 'header' as keyof AboutSettings },
                                { label: 'Competencies Header', key: 'competencies_header' as keyof AboutSettings },
                            ].map(({ label, key }) => (
                                <div key={key} className="flex flex-col gap-2">
                                    <label className="text-xs font-mono text-white/40 uppercase tracking-widest font-bold">{label}</label>
                                    <input
                                        type="text"
                                        value={form[key] as string}
                                        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                                        className="bg-transparent border-b border-white/10 focus:border-white focus:ring-0 text-white font-mono text-sm px-0 pb-2 transition-colors outline-none"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border border-white/10 bg-black">
                        <div className="border-b border-white/10 bg-[#111] px-4 py-2.5">
                            <span className="text-xs font-mono text-white uppercase tracking-wider">System Config</span>
                        </div>
                        <div className="p-5 space-y-5">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-mono text-white/40 uppercase tracking-widest font-bold flex items-center gap-1">
                                    <MapPin size={11} /> Location
                                </label>
                                <input
                                    type="text"
                                    value={form.sys_config_location}
                                    onChange={(e) => setForm((f) => ({ ...f, sys_config_location: e.target.value }))}
                                    className="bg-transparent border-b border-white/10 focus:border-white focus:ring-0 text-white font-mono text-sm px-0 pb-2 transition-colors outline-none"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-mono text-white/40 uppercase tracking-widest font-bold">Timezone</label>
                                <input
                                    type="text"
                                    value={form.sys_config_timezone}
                                    onChange={(e) => setForm((f) => ({ ...f, sys_config_timezone: e.target.value }))}
                                    className="bg-transparent border-b border-white/10 focus:border-white focus:ring-0 text-white font-mono text-sm px-0 pb-2 transition-colors outline-none"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-mono text-white/40 uppercase tracking-widest font-bold">Status</label>
                                <select
                                    value={form.sys_config_status}
                                    onChange={(e) => setForm((f) => ({ ...f, sys_config_status: e.target.value }))}
                                    className="bg-[#111] border border-white/10 focus:border-white focus:ring-0 p-2 font-mono text-xs text-white rounded-none cursor-pointer outline-none"
                                >
                                    <option>Available</option>
                                    <option>Not Available</option>
                                    <option>Open to Work</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-mono text-white/40 uppercase tracking-widest font-bold">Concrete Image URL</label>
                                <input
                                    type="text"
                                    value={form.concrete_image}
                                    onChange={(e) => setForm((f) => ({ ...f, concrete_image: e.target.value }))}
                                    placeholder="https://..."
                                    className="bg-transparent border-b border-white/10 focus:border-white focus:ring-0 text-white font-mono text-xs px-0 pb-2 transition-colors outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
