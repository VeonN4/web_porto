import { router } from '@inertiajs/react';
import { Save, Check, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import type { HeroSettings } from '@/types/portfolio';

interface Props {
    heroData: HeroSettings;
    setHeroData: (data: HeroSettings) => void;
    onCommit: (msg: string) => void;
}

export default function HeroConfigView({ heroData, setHeroData, onCommit }: Props) {
    const [form, setForm] = useState({ ...heroData });
    const [newStatus, setNewStatus] = useState('');
    const [newStack, setNewStack] = useState('');
    const [saved, setSaved] = useState(false);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        router.put('/admin/hero', form, {
            preserveScroll: true,
            onSuccess: () => {
                setHeroData(form);
                setSaved(true);
                onCommit(`Updated Hero: "${form.headline.substring(0, 30)}"`);
                setTimeout(() => setSaved(false), 2500);
            },
        });
    };

    const addStatus = () => {
        if (!newStatus.trim()) {
return;
}

        setForm((f) => ({ ...f, status: [...f.status, newStatus.trim()] }));
        setNewStatus('');
    };

    const addStack = () => {
        if (!newStack.trim()) {
return;
}

        setForm((f) => ({ ...f, core_stack: [...f.core_stack, newStack.trim()] }));
        setNewStack('');
    };

    return (
        <div id="hero-config-view" className="flex flex-col gap-10">
            <header className="border-b border-white/10 pb-8">
                <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-wider text-white/40">
                    <span>/ ADMIN / SECTIONS /</span>
                    <span className="text-white">HERO</span>
                </div>
                <h2 className="text-3xl font-bold text-white uppercase tracking-tight">Hero Configuration</h2>
            </header>

            <form onSubmit={handleSave} className="flex flex-col gap-8 max-w-2xl">
                <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase font-mono tracking-wider text-white/40">Headline</label>
                    <input
                        type="text"
                        value={form.headline}
                        onChange={(e) => setForm((f) => ({ ...f, headline: e.target.value }))}
                        className="w-full bg-transparent border-b border-white/20 focus:border-white focus:ring-0 text-white font-mono text-base px-0 py-2.5 uppercase transition-colors outline-none"
                        required
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase font-mono tracking-wider text-white/40">Subheadline</label>
                    <input
                        type="text"
                        value={form.subheadline}
                        onChange={(e) => setForm((f) => ({ ...f, subheadline: e.target.value }))}
                        className="w-full bg-transparent border-b border-white/20 focus:border-white focus:ring-0 text-white font-mono text-sm px-0 py-2.5 transition-colors outline-none"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase font-mono tracking-wider text-white/40">Tagline</label>
                    <input
                        type="text"
                        value={form.tagline}
                        onChange={(e) => setForm((f) => ({ ...f, tagline: e.target.value }))}
                        className="w-full bg-transparent border-b border-white/20 focus:border-white focus:ring-0 text-white font-mono text-sm px-0 py-2.5 transition-colors outline-none"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase font-mono tracking-wider text-white/40">Description</label>
                    <textarea
                        value={form.description}
                        onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                        rows={4}
                        className="w-full bg-transparent border border-white/20 focus:border-white focus:ring-0 text-white font-mono text-sm px-3 py-2.5 resize-none transition-colors leading-relaxed outline-none"
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <label className="text-xs uppercase font-mono tracking-wider text-white/40">Status Lines</label>
                    {form.status.map((s, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <input
                                type="text"
                                value={s}
                                onChange={(e) =>
                                    setForm((f) => ({ ...f, status: f.status.map((x, j) => (j === i ? e.target.value : x)) }))
                                }
                                className="flex-grow bg-transparent border-b border-white/10 focus:border-white focus:ring-0 text-white font-mono text-xs px-0 py-1.5 transition-colors outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => setForm((f) => ({ ...f, status: f.status.filter((_, j) => j !== i) }))}
                                className="text-white/20 hover:text-red-500 transition-colors cursor-pointer"
                            >
                                <Trash2 size={13} />
                            </button>
                        </div>
                    ))}
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addStatus())}
                            placeholder="Add status line..."
                            className="flex-grow bg-transparent border-b border-white/10 focus:border-white focus:ring-0 text-white font-mono text-xs px-0 py-1.5 transition-colors outline-none"
                        />
                        <button type="button" onClick={addStatus} className="text-white/40 hover:text-white cursor-pointer">
                            <Plus size={14} />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <label className="text-xs uppercase font-mono tracking-wider text-white/40">Core Stack</label>
                    <div className="flex flex-wrap gap-2">
                        {form.core_stack.map((s, i) => (
                            <span
                                key={i}
                                className="flex items-center gap-1.5 font-mono text-xs text-white border border-white/20 px-2 py-1 bg-black"
                            >
                                {s}
                                <button
                                    type="button"
                                    onClick={() => setForm((f) => ({ ...f, core_stack: f.core_stack.filter((_, j) => j !== i) }))}
                                    className="text-white/20 hover:text-red-400 cursor-pointer"
                                >
                                    x
                                </button>
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newStack}
                            onChange={(e) => setNewStack(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addStack())}
                            placeholder="Add tech (e.g. React)..."
                            className="flex-grow bg-transparent border-b border-white/10 focus:border-white focus:ring-0 text-white font-mono text-xs px-0 py-1.5 transition-colors outline-none"
                        />
                        <button type="button" onClick={addStack} className="text-white/40 hover:text-white cursor-pointer">
                            <Plus size={14} />
                        </button>
                    </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                    <button
                        type="submit"
                        className={`w-full border flex items-center justify-center gap-2 py-3.5 font-mono text-sm uppercase transition-all cursor-pointer ${
                            saved
                                ? 'bg-green-950 border-green-500 text-green-300'
                                : 'bg-transparent border-white text-white hover:bg-white hover:text-black'
                        }`}
                    >
                        {saved ? <Check size={16} /> : <Save size={16} />}
                        {saved ? 'COMMIT SUCCESSFUL' : 'COMMIT CHANGES'}
                    </button>
                </div>
            </form>
        </div>
    );
}
