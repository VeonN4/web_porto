import { router } from '@inertiajs/react';
import { Search, Plus, Trash2, Edit, X, FolderGit2 } from 'lucide-react';
import { useState } from 'react';
import type { Project } from '@/types/portfolio';

interface Props {
    projects: Project[];
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
    onCommit: (msg: string) => void;
}

export default function ProjectsView({ projects, setProjects, onCommit }: Props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterTag, setFilterTag] = useState('ALL');
    const [sortOrder, setSortOrder] = useState<'DATE_DESC' | 'NAME_ASC'>('DATE_DESC');
    const [isAdding, setIsAdding] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newTagsInput, setNewTagsInput] = useState('');
    const [newStatus, setNewStatus] = useState('production');
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editTagsInput, setEditTagsInput] = useState('');
    const [editStatus, setEditStatus] = useState('');

    const allTags = ['ALL', ...Array.from(new Set(projects.flatMap((p) => p.tags)))];

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();

        if (!newTitle.trim()) {
return;
}

        const tags = newTagsInput.split(',').map((t) => t.trim()).filter(Boolean);
        router.post(
            '/admin/projects',
            { title: newTitle.trim().toUpperCase(), description: newDescription.trim(), tags, status: newStatus },
            {
                preserveScroll: true,
                onSuccess: (page) => {
                    const created = (page.props as { flash?: { project?: Project } }).flash?.project;

                    if (created) {
setProjects((prev) => [created, ...prev]);
}

                    onCommit(`Created project: "${newTitle.toUpperCase()}"`);
                    setNewTitle(''); setNewDescription(''); setNewTagsInput(''); setIsAdding(false);
                },
            },
        );
    };

    const handleSaveEdit = (id: number) => {
        const tags = editTagsInput.split(',').map((t) => t.trim()).filter(Boolean);
        router.put(
            `/admin/projects/${id}`,
            { title: editTitle.toUpperCase(), description: editDescription, tags, status: editStatus },
            {
                preserveScroll: true,
                onSuccess: (page) => {
                    const updated = (page.props as { flash?: { project?: Project } }).flash?.project;

                    if (updated) {
setProjects((prev) => prev.map((p) => (p.id === id ? updated : p)));
}

                    onCommit(`Updated project: "${editTitle.toUpperCase()}"`);
                    setEditingId(null);
                },
            },
        );
    };

    const handleDelete = (id: number, title: string) => {
        router.delete(`/admin/projects/${id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setProjects((prev) => prev.filter((p) => p.id !== id));
                onCommit(`Removed project: "${title}"`);
            },
        });
    };

    const filteredProjects = projects
        .filter((p) => {
            const q = searchQuery.toLowerCase();

            return (
                (p.title.toLowerCase().includes(q) ||
                    p.description.toLowerCase().includes(q) ||
                    p.tags.some((t) => t.toLowerCase().includes(q))) &&
                (filterTag === 'ALL' || p.tags.includes(filterTag))
            );
        })
        .sort((a, b) => (sortOrder === 'NAME_ASC' ? a.title.localeCompare(b.title) : b.id - a.id));

    return (
        <div id="projects-view-root" className="flex flex-col gap-10">
            <header className="border-b border-white/10 pb-6 text-left">
                <h2 className="text-3xl font-bold text-white uppercase tracking-tight mb-3">Projects Log</h2>
                <p className="text-sm text-white/40 font-mono">// Manage and index portfolio projects. Direct database access.</p>
            </header>

            <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="w-full md:w-96 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/20">
                        <Search size={14} />
                    </div>
                    <input
                        type="text"
                        placeholder="grep 'project_name' or 'tech'..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full pl-9 pr-3 py-2 border-b border-white/10 bg-transparent text-white focus:outline-none focus:border-white font-mono text-xs transition-colors placeholder:text-white/20"
                    />
                </div>
                <div className="flex gap-2 font-mono text-xs">
                    <button
                        onClick={() => {
 const i = allTags.indexOf(filterTag); setFilterTag(allTags[(i + 1) % allTags.length]); 
}}
                        className="px-3.5 py-2 border border-white/10 text-white/40 hover:text-white hover:border-white/40 transition-colors uppercase cursor-pointer"
                    >
                        Filter: {filterTag}
                    </button>
                    <button
                        onClick={() => setSortOrder((p) => (p === 'DATE_DESC' ? 'NAME_ASC' : 'DATE_DESC'))}
                        className="px-3.5 py-2 border border-white/10 text-white/40 hover:text-white hover:border-white/40 transition-colors uppercase cursor-pointer"
                    >
                        Sort: {sortOrder}
                    </button>
                </div>
                <div className="md:ml-auto w-full md:w-auto">
                    <button
                        onClick={() => setIsAdding(!isAdding)}
                        className="w-full md:w-auto bg-white text-black hover:bg-neutral-200 border border-white px-5 py-2 uppercase font-mono text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                        {isAdding ? <X size={14} /> : <Plus size={14} />}
                        {isAdding ? 'CANCEL' : 'NEW_PROJECT'}
                    </button>
                </div>
            </div>

            {isAdding && (
                <form onSubmit={handleCreate} className="border border-white p-6 bg-[#111] text-left flex flex-col gap-6 font-mono text-xs">
                    <div className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2 flex items-center gap-2">
                        <FolderGit2 size={16} /> DATABASE INJECTION FORM
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-white/40 uppercase font-bold">Project Title</label>
                            <input
                                type="text"
                                placeholder="NEURAL_NET_API"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                className="bg-black border border-white/20 focus:border-white text-white p-2 focus:ring-0 rounded-none uppercase outline-none"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-white/40 uppercase font-bold">Status</label>
                            <select
                                value={newStatus}
                                onChange={(e) => setNewStatus(e.target.value)}
                                className="bg-black border border-white/20 focus:border-white text-white p-2 focus:ring-0 rounded-none outline-none"
                            >
                                <option value="production">production</option>
                                <option value="unavailable">unavailable</option>
                                <option value="wip">wip</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-white/40 uppercase font-bold">Tags (comma-separated)</label>
                            <input
                                type="text"
                                placeholder="React, Tailwind"
                                value={newTagsInput}
                                onChange={(e) => setNewTagsInput(e.target.value)}
                                className="bg-black border border-white/20 focus:border-white text-white p-2 focus:ring-0 rounded-none outline-none"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-white/40 uppercase font-bold">Description</label>
                        <input
                            type="text"
                            placeholder="Concise project description..."
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                            className="bg-black border border-white/20 focus:border-white text-white p-2.5 focus:ring-0 rounded-none outline-none"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => setIsAdding(false)}
                            className="border border-white/10 text-white/40 hover:text-white hover:border-white/40 px-4 py-2 uppercase cursor-pointer"
                        >
                            Close
                        </button>
                        <button type="submit" className="bg-white text-black hover:bg-neutral-200 px-6 py-2 uppercase font-bold cursor-pointer">
                            Inject Record
                        </button>
                    </div>
                </form>
            )}

            <div className="flex flex-col border-t border-white/10 text-left">
                {filteredProjects.length === 0 ? (
                    <div className="p-12 text-center text-white/30 font-mono uppercase">[ NO PROJECT NODES FOUND ]</div>
                ) : (
                    filteredProjects.map((p) => {
                        const isEditing = editingId === p.id;

                        return (
                            <div
                                key={p.id}
                                className="group flex flex-col border-b border-white/10 py-5 hover:bg-[#111] transition-all px-3 -mx-3"
                            >
                                {isEditing ? (
                                    <div className="flex flex-col gap-5 font-mono text-xs">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-white/40 uppercase font-bold">Title</label>
                                                <input
                                                    type="text"
                                                    value={editTitle}
                                                    onChange={(e) => setEditTitle(e.target.value)}
                                                    className="bg-black border border-white/20 focus:border-white text-white p-1.5 focus:ring-0 rounded-none uppercase outline-none"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-white/40 uppercase font-bold">Status</label>
                                                <select
                                                    value={editStatus}
                                                    onChange={(e) => setEditStatus(e.target.value)}
                                                    className="bg-black border border-white/20 focus:border-white text-white p-1.5 focus:ring-0 rounded-none outline-none"
                                                >
                                                    <option value="production">production</option>
                                                    <option value="unavailable">unavailable</option>
                                                    <option value="wip">wip</option>
                                                </select>
                                            </div>
                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-white/40 uppercase font-bold">Tags</label>
                                                <input
                                                    type="text"
                                                    value={editTagsInput}
                                                    onChange={(e) => setEditTagsInput(e.target.value)}
                                                    className="bg-black border border-white/20 focus:border-white text-white p-1.5 focus:ring-0 rounded-none outline-none"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-white/40 uppercase font-bold">Description</label>
                                            <input
                                                type="text"
                                                value={editDescription}
                                                onChange={(e) => setEditDescription(e.target.value)}
                                                className="bg-black border border-white/20 focus:border-white text-white p-2 focus:ring-0 rounded-none outline-none"
                                            />
                                        </div>
                                        <div className="flex justify-end gap-2.5">
                                            <button
                                                onClick={() => setEditingId(null)}
                                                className="border border-white/10 text-white/40 hover:text-white hover:border-white/40 px-3 py-1.5 uppercase cursor-pointer"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={() => handleSaveEdit(p.id)}
                                                className="bg-white text-black hover:bg-neutral-200 px-5 py-1.5 uppercase font-bold cursor-pointer"
                                            >
                                                Commit specs
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full justify-between">
                                        <div className="w-full md:w-1/4 shrink-0">
                                            <h3 className="text-base font-bold font-mono text-white truncate uppercase">{p.title}</h3>
                                            <div className="text-[10px] font-mono text-white/30 mt-1 uppercase tracking-widest">
                                                ID: {p.id} ·{' '}
                                                <span
                                                    className={
                                                        p.status === 'production'
                                                            ? 'text-green-400'
                                                            : p.status === 'wip'
                                                              ? 'text-yellow-400'
                                                              : 'text-red-400'
                                                    }
                                                >
                                                    {p.status}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex-grow min-w-0">
                                            <p className="text-xs text-white/60 font-mono leading-relaxed line-clamp-1">{p.description}</p>
                                        </div>
                                        <div className="flex flex-wrap gap-1.5 w-full md:w-auto shrink-0 justify-start md:justify-end">
                                            {p.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="font-mono text-[10px] text-white/30 border border-white/10 px-1.5 py-0.5 bg-black uppercase"
                                                >
                                                    [ {tag} ]
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-1 shrink-0 md:ml-4 md:opacity-0 md:group-hover:opacity-100 transition-opacity justify-end w-full md:w-auto">
                                            <button
                                                onClick={() => {
                                                    setEditingId(p.id);
                                                    setEditTitle(p.title);
                                                    setEditDescription(p.description);
                                                    setEditTagsInput(p.tags.join(', '));
                                                    setEditStatus(p.status);
                                                }}
                                                className="p-1.5 text-white/20 hover:text-white border border-transparent transition-all cursor-pointer"
                                            >
                                                <Edit size={14} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(p.id, p.title)}
                                                className="p-1.5 text-white/20 hover:text-red-500 border border-transparent transition-all cursor-pointer"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
