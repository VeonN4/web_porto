import { router } from '@inertiajs/react';
import { Plus, Trash2, Save, Check } from 'lucide-react';
import { useState } from 'react';
import type { TechStackItem } from '@/types/portfolio';

interface Props {
    techStacks: TechStackItem[];
    setTechStacks: React.Dispatch<React.SetStateAction<TechStackItem[]>>;
    onCommit: (msg: string) => void;
}

const TYPE_LABELS: Record<string, string> = {
    core: 'Core',
    featured: 'Featured',
    backend: 'Backend',
    infrastructure: 'Infrastructure',
    tooling: 'Tooling',
};

export default function TechStackView({ techStacks, setTechStacks, onCommit }: Props) {
    const [showAddForm, setShowAddForm] = useState(false);
    const [newName, setNewName] = useState('');
    const [newType, setNewType] = useState('core');
    const [committed, setCommitted] = useState(false);

    const types = Array.from(new Set(techStacks.map((t) => t.type)));

    const handleDelete = (id: number, name: string) => {
        router.delete(`/admin/tech-stacks/${id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setTechStacks((prev) => prev.filter((t) => t.id !== id));
                onCommit(`Removed "${name}" from stack`);
            },
        });
    };

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();

        if (!newName.trim()) {
return;
}

        router.post(
            '/admin/tech-stacks',
            { type: newType, name: newName.trim() },
            {
                preserveScroll: true,
                onSuccess: (page) => {
                    const created = (page.props as { flash?: { techStack?: TechStackItem } }).flash?.techStack;

                    if (created) {
setTechStacks((prev) => [...prev, created]);
}

                    onCommit(`Registered "${newName}" in stack`);
                    setNewName('');
                    setShowAddForm(false);
                },
            },
        );
    };

    const handleCommit = () => {
        setCommitted(true);
        onCommit('Updated system components registry');
        setTimeout(() => setCommitted(false), 2000);
    };

    return (
        <div id="tech-stack-view-root" className="flex flex-col gap-10">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-4 gap-6">
                <div>
                    <h2 className="text-3xl font-bold text-white uppercase tracking-tight">Tech Stack</h2>
                    <p className="text-xs text-white/40 mt-2 font-mono">// SYSTEM.COMPONENTS.REGISTRY</p>
                </div>
                <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="border border-white text-white hover:bg-white hover:text-black px-5 py-2.5 font-mono text-xs uppercase cursor-pointer transition-all flex items-center gap-2"
                    >
                        <Plus size={14} /> Add Stack Item
                    </button>
                    <button
                        onClick={handleCommit}
                        className={`px-5 py-2.5 font-mono text-xs uppercase cursor-pointer transition-all border flex items-center gap-2 ${
                            committed ? 'bg-green-950 border-green-500 text-green-300' : 'bg-white border-white text-black hover:bg-neutral-200'
                        }`}
                    >
                        {committed ? <Check size={14} /> : <Save size={14} />}
                        {committed ? 'STACK SYNCED' : 'COMMIT STACK'}
                    </button>
                </div>
            </header>

            {showAddForm && (
                <form
                    onSubmit={handleAdd}
                    className="border border-white p-5 bg-[#111] font-mono text-xs flex flex-col gap-4 max-w-lg"
                >
                    <div className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
                        Add Stack Item
                    </div>
                    <div className="flex gap-3">
                        <div className="flex flex-col gap-1.5 flex-grow">
                            <label className="text-white/40 uppercase font-bold text-[10px]">Name</label>
                            <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                placeholder="e.g. React"
                                className="bg-black border border-white/20 focus:border-white text-white p-2 focus:ring-0 rounded-none outline-none"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-white/40 uppercase font-bold text-[10px]">Type</label>
                            <select
                                value={newType}
                                onChange={(e) => setNewType(e.target.value)}
                                className="bg-black border border-white/20 text-white p-2 focus:ring-0 rounded-none font-mono text-xs outline-none"
                            >
                                {Object.entries(TYPE_LABELS).map(([v, l]) => (
                                    <option key={v} value={v}>
                                        {l}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={() => setShowAddForm(false)}
                            className="text-white/40 hover:text-white uppercase py-1.5 px-3 border border-white/10 hover:border-white cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button type="submit" className="bg-white text-black hover:bg-neutral-200 px-5 py-1.5 uppercase font-bold cursor-pointer">
                            Inject
                        </button>
                    </div>
                </form>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl text-left">
                {(types.length > 0 ? types : Object.keys(TYPE_LABELS)).map((type) => {
                    const items = techStacks.filter((t) => t.type === type);

                    return (
                        <div
                            key={type}
                            className="border border-white/10 bg-[#0d0d0d] flex flex-col group hover:border-white/30 transition-all duration-300"
                        >
                            <div className="p-5 border-b border-white/10 flex justify-between items-center bg-[#111]">
                                <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono">
                                    {TYPE_LABELS[type] ?? type}
                                </h3>
                                <span className="text-xs font-mono text-white/30 opacity-70">
                                    [ {String(items.length).padStart(2, '0')} ]
                                </span>
                            </div>
                            <div className="p-6 flex-grow flex flex-col gap-3">
                                {items.length === 0 ? (
                                    <p className="text-xs font-mono text-white/20 uppercase">[ no items ]</p>
                                ) : (
                                    <ul className="flex flex-col gap-3">
                                        {items.map((item) => (
                                            <li
                                                key={item.id}
                                                className="flex justify-between items-center group/item hover:bg-black py-1 px-2 -mx-2 rounded"
                                            >
                                                <div className="flex items-center gap-2 font-mono text-sm text-[#e5e1e4]">
                                                    <button
                                                        onClick={() => handleDelete(item.id, item.name)}
                                                        className="opacity-0 group-hover/item:opacity-100 text-white/20 hover:text-red-500 transition-all p-1 cursor-pointer"
                                                    >
                                                        <Trash2 size={12} />
                                                    </button>
                                                    <span className="font-bold">{item.name}</span>
                                                </div>
                                                {item.description && (
                                                    <span className="text-[10px] text-white/30 font-mono truncate max-w-[140px]">
                                                        {item.description}
                                                    </span>
                                                )}
                                                {item.role && !item.description && (
                                                    <span className="text-[10px] text-white/30 font-mono uppercase">{item.role}</span>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
