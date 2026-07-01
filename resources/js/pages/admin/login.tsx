import { useForm } from '@inertiajs/react';
import { Lock, ShieldAlert } from 'lucide-react';
import { useState } from 'react';

export default function AdminLogin() {
    const [typingDone] = useState(true);
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/login');
    };

    return (
        <div
            id="lockscreen-root"
            className="min-h-screen bg-black text-[#e5e1e4] flex items-center justify-center p-4 font-mono select-none"
        >
            <div className="w-full max-w-md border border-white/20 bg-[#111] p-8 relative">
                <div className="absolute top-2 right-2 flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 opacity-60"></span>
                    <span className="w-2 h-2 rounded-full bg-yellow-500 opacity-60"></span>
                    <span className="w-2 h-2 rounded-full bg-green-500 opacity-60"></span>
                </div>

                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 border border-white/20 flex items-center justify-center mb-4 bg-[#1a1a1a] text-white">
                        {errors.email || errors.password ? (
                            <ShieldAlert size={32} className="text-red-500 animate-pulse" />
                        ) : (
                            <Lock size={32} />
                        )}
                    </div>
                    <h1 className="text-lg font-bold tracking-wider uppercase">SYSTEM LOCKOUT</h1>
                    <p className="text-xs text-white/40 mt-1 uppercase">[ SECURITY: RESTRICTED ]</p>
                </div>

                <div className="bg-black border border-white/10 p-4 text-xs leading-relaxed text-white/40 min-h-[72px] mb-6 whitespace-pre-line">
                    PORTFOLIO_OS SECURE GATEWAY V1.1.0...{'\n'}
                    SECURITY STATUS: ENCRYPTED...{'\n'}
                    ENTER ADMIN CREDENTIALS TO ESTABLISH SESSION...
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs uppercase text-white/60 mb-2" htmlFor="email-field">
                            Admin Email:
                        </label>
                        <input
                            id="email-field"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full bg-black border border-white/20 focus:border-white focus:ring-0 text-white font-mono text-sm px-3 py-2 text-center outline-none"
                            required
                            disabled={processing}
                            autoFocus
                        />
                        {errors.email && <p className="text-red-400 text-[11px] mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-xs uppercase text-white/60 mb-2" htmlFor="password-field">
                            Password:
                        </label>
                        <input
                            id="password-field"
                            type="password"
                            placeholder="Type password..."
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full bg-black border border-white/20 focus:border-white focus:ring-0 text-white font-mono text-sm px-3 py-2 text-center outline-none"
                            required
                            disabled={processing}
                        />
                        {errors.password && <p className="text-red-400 text-[11px] mt-1">{errors.password}</p>}
                    </div>

                    {(errors as Record<string, string>).auth && (
                        <div className="bg-red-950 border border-red-800 text-red-200 text-xs px-4 py-2 text-center uppercase tracking-wider">
                            ACCESS DENIED: {(errors as Record<string, string>).auth}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-white text-black hover:bg-neutral-200 py-3 uppercase text-xs font-bold font-mono transition-colors tracking-widest cursor-pointer disabled:opacity-50"
                    >
                        {processing ? 'AUTHENTICATING...' : 'Decrypt & Access'}
                    </button>
                </form>

                <div className="mt-6 text-center text-[10px] text-white/30 uppercase">
                    Default:{' '}
                    <span className="text-white/60 font-bold">admin@example.com</span> /{' '}
                    <span className="text-white/60 font-bold">admin</span>
                </div>
            </div>
        </div>
    );
}
