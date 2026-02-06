import Link from 'next/link'
import { Sparkles, ArrowLeft } from 'lucide-react'

export const metadata = {
    title: 'Privacy Policy | InterviewAI',
    description: 'Learn how we protect your data and ensure your privacy while using InterviewAI.',
}

export default function PrivacyPage() {
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
                            Privacy <span className="text-gradient">Policy</span>
                        </h1>
                        <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-[10px]">Last Updated: February 6, 2026</p>
                    </div>

                    <div className="glass-card p-8 md:p-12 space-y-10 text-white/70 leading-relaxed prose prose-invert max-w-none">
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">1. Our Commitment to Privacy</h2>
                            <p>
                                At InterviewAI, privacy isn&apos;t just a feature; it&apos;s our core philosophy. We believe that your interview preparation should remain your business. As an open-source project, we are committed to transparency and the highest standards of data protection.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">2. Data We Collect (And What We Don&apos;t)</h2>
                            <p>
                                Our philosophy is simple: we only touch the data necessary to provide our service, and we prefer not to touch it at all.
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong className="text-white">Local Mode:</strong> When running in local mode, your audio, video, and screen data never leave your device. All processing happens locally on your machine.</li>
                                <li><strong className="text-white">Cloud Mode:</strong> If you use our cloud-based features, we process your audio stream in real-time. This processing is stateless; we do not store your audio recordings or transcripts on our servers once the session ends.</li>
                                <li><strong className="text-white">Account Information:</strong> If you create an account, we store your email address and basic profile information to manage your access and preferences.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">3. Security Measures</h2>
                            <p>
                                We implement industry-standard security measures to protect your information. This includes end-to-end encryption for all data in transit and robust access controls for any data we must store.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">4. Third-Party Services</h2>
                            <p>
                                InterviewAI may integrate with third-party AI providers (like OpenAI or Anthropic) if you choose to use their API keys. In these cases, your data is subject to their respective privacy policies. We recommend reviewing the policies of any third-party providers you choose to link.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">5. Open Source Transparency</h2>
                            <p>
                                Because our codebase is open source, you don&apos;t have to take our word for it. You can audit our data handling practices yourself on our GitHub repository.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">6. Contact Us</h2>
                            <p>
                                If you have questions about this Privacy Policy, please reach out to us at privacy@interviewai.com or through our GitHub community.
                            </p>
                        </section>
                    </div>
                </div>
            </main>

            <footer className="relative py-12 border-t border-white/5 bg-black/20 text-center">
                <p className="text-[10px] font-bold text-white/20 tracking-[0.3em] uppercase">
                    InterviewAI © 2026 • Secure & Private
                </p>
            </footer>
        </div>
    )
}
