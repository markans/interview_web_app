import Link from 'next/link'
import { Sparkles, ArrowLeft } from 'lucide-react'

export const metadata = {
    title: 'Terms of Service | InterviewAI',
    description: 'Read the terms and conditions for using InterviewAI.',
}

export default function TermsPage() {
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
                            Terms of <span className="text-gradient">Service</span>
                        </h1>
                        <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-[10px]">Last Updated: February 6, 2026</p>
                    </div>

                    <div className="glass-card p-8 md:p-12 space-y-10 text-white/70 leading-relaxed prose prose-invert max-w-none">
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                            <p>
                                By accessing or using InterviewAI, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not use our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
                            <p>
                                InterviewAI provides an AI-powered platform for interview preparation and real-time assistance. Our service is provided "as is" and is intended for educational and preparation purposes.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">3. Ethical Use & Career Integrity</h2>
                            <p>
                                InterviewAI is designed for preparation, learning, and accessibility. While our tool can provide real-time assistance, users are responsible for using it ethically and in accordance with the policies of their respective employers or interviewers. We do not condone or encourage deceptive practices in professional evaluations.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">4. Open Source & Contributions</h2>
                            <p>
                                The core of InterviewAI is open-source. Contributions to our codebase are welcome and subject to our specific licensing terms available in our GitHub repository.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">5. Limitation of Liability</h2>
                            <p>
                                InterviewAI and its contributors shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">6. Changes to Terms</h2>
                            <p>
                                We reserve the right to modify these terms at any time. We will notify users of any significant changes by updating the "Last Updated" date at the top of this page.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">7. Termination</h2>
                            <p>
                                We reserve the right to terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever.
                            </p>
                        </section>
                    </div>
                </div>
            </main>

            <footer className="relative py-12 border-t border-white/5 bg-black/20 text-center">
                <p className="text-[10px] font-bold text-white/20 tracking-[0.3em] uppercase">
                    InterviewAI © 2026 • Build for the Bold
                </p>
            </footer>
        </div>
    )
}
