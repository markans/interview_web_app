import Link from 'next/link'
import { Sparkles, ArrowLeft, ShieldCheck, Lock, Eye, Server, Cpu, Database } from 'lucide-react'

export const metadata = {
    title: 'Security | InterviewAI',
    description: 'Learn about the security architecture and data protection measures of InterviewAI.',
}

export default function SecurityPage() {
    return (
        <div className="relative min-h-screen selection:bg-primary/30 selection:text-white">
            {/* Background Layer */}
            <div className="fixed inset-0 z-[-1]">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
                    style={{ backgroundImage: 'url("/hero-bg.png")' }}
                />
                <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-[8px]" />
            </div>

            <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 border-b border-white/5 backdrop-blur-md bg-black/10">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-3 group cursor-pointer">
                        <div className="relative w-8 h-8 rounded-lg overflow-hidden glass flex items-center justify-center group-hover:animate-glow transition-all duration-300">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-50" />
                            <Sparkles className="w-4 h-4 text-white relative z-10" />
                        </div>
                        <span className="text-lg font-black tracking-tighter text-white uppercase group-hover:text-primary transition-colors">
                            InterviewAI
                        </span>
                    </Link>
                    <Link href="/" className="text-xs font-bold text-white/50 hover:text-white transition-colors uppercase tracking-[0.2em] flex items-center gap-2">
                        <ArrowLeft className="w-3 h-3" />
                        Back Home
                    </Link>
                </div>
            </nav>

            <main className="relative pt-32 pb-20 px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-12">
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
                            Security <span className="text-gradient">Architecture</span>
                        </h1>
                        <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-[10px]">Hardened for Privacy • Last Updated: Feb 2026</p>
                    </div>

                    <div className="grid gap-6 mb-12">
                        {[
                            {
                                title: "Client-Side Processing",
                                desc: "Your transcription and AI analysis can run entirely locally using WebAssembly or local LLM runners like Ollama.",
                                icon: <Cpu className="w-6 h-6 text-primary" />
                            },
                            {
                                title: "End-to-End Encryption",
                                desc: "All traffic between your browser and our optional cloud infrastructure is encrypted using TLS 1.3.",
                                icon: <Lock className="w-6 h-6 text-secondary" />
                            },
                            {
                                title: "Zero Data Retention",
                                desc: "Our cloud processing nodes are stateless. Once your session ends, all temporary processing data is wiped.",
                                icon: <Database className="w-6 h-6 text-accent" />
                            }
                        ].map((item, i) => (
                            <div key={i} className="glass-card p-6 flex gap-6 items-start">
                                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                    <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="glass-card p-8 md:p-12 space-y-10 text-white/70 leading-relaxed max-w-none">
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <ShieldCheck className="w-6 h-6 text-primary" />
                                Vulnerability Disclosure
                            </h2>
                            <p>
                                We value the contributions of security researchers. If you believe you have found a security vulnerability in InterviewAI, please report it to us responsibly through our GitHub repository or via email at security@interviewai.com. We are committed to resolving issues quickly and transparently.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <Server className="w-6 h-6 text-secondary" />
                                Infrastructure Security
                            </h2>
                            <p>
                                Our web application is deployed on Vercel&apos;s hardened edge network, providing built-in DDoS protection, automated SSL management, and global isolation. We follow the principle of least privilege in all our cloud configurations.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <Eye className="w-6 h-6 text-accent" />
                                Auditability
                            </h2>
                            <p>
                                Security through obscurity is not security. Our entire codebase is public, allowing peer review and independent audits of our security controls. We encourage you to inspect our authentication and data handling logic yourself.
                            </p>
                        </section>
                    </div>
                </div>
            </main>

            <footer className="relative py-12 border-t border-white/5 bg-black/20 text-center">
                <p className="text-[10px] font-bold text-white/20 tracking-[0.3em] uppercase">
                    InterviewAI © 2026 • Hardened & Verified
                </p>
            </footer>
        </div>
    )
}
