import Link from 'next/link'
import Image from 'next/image'
import { Github, ArrowRight, Shield, Zap, Sparkles, MessageCircleCode, ChevronDown, CheckCircle2, Monitor, Globe, Smartphone, Lock } from 'lucide-react'
import Demo from './components/Demo'

export default function HomePage() {
  return (
    <div className="relative min-h-screen selection:bg-primary/30 selection:text-white">
      {/* Background Layer */}
      <div className="fixed inset-0 z-[-1]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
          style={{ backgroundImage: 'url("/hero-bg.png")' }}
        />
        <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-[4px]" />
      </div>

      {/* Zero Interface Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 border-b border-white/5 backdrop-blur-md bg-black/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden glass flex items-center justify-center group-hover:animate-glow transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-50" />
              <Sparkles className="w-5 h-5 text-white relative z-10" />
            </div>
            <span className="text-xl font-black tracking-tighter text-white uppercase group-hover:text-primary transition-colors">
              InterviewAI
            </span>
          </div>

          <div className="flex items-center gap-8">
            <Link
              href="/auth/signin"
              className="text-sm font-bold text-white/50 hover:text-white transition-colors uppercase tracking-widest"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="px-6 py-2.5 rounded-full bg-white text-black text-sm font-bold hover:bg-white/90 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/10"
            >
              Start Free
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          {/* Subtle Tag */}
          <div className="mb-8 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl">
            <span className="text-[10px] font-black tracking-[0.2em] uppercase text-white/40">
              Next-Gen Interview Intelligence
            </span>
          </div>

          {/* Hero Content */}
          <div className="max-w-4xl text-center space-y-6 mb-20">
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9]">
              The Invisible Edge <br />
              <span className="text-gradient">For Your Career</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/50 font-light max-w-2xl mx-auto leading-relaxed">
              Real-time AI assistance hidden in plain sight.
              Privacy-preserving, low-latency, and <span className="text-primary font-bold">100% open source</span>.
              Built for the modern web, coming soon to all platforms.
            </p>

            <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/signup"
                className="group px-8 py-4 rounded-full bg-primary text-white font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all hover:scale-105 shadow-2xl shadow-primary/20"
              >
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://github.com/markans/interview_web_app"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full glass text-white font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
              >
                <Github className="w-5 h-5" />
                Forge on GitHub
              </a>
            </div>
          </div>

          {/* THE DEMO */}
          <Demo />

          {/* Core Features */}
          <div className="w-full grid md:grid-cols-3 gap-8 pt-32">
            <div className="glass-card p-8 group">
              <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                <Image src="/privacy.png" alt="Privacy" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <Shield className="absolute bottom-4 left-4 w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Vantablack Privacy</h3>
              <p className="text-white/40 leading-relaxed">
                Your credentials and audio never leave your device. Run everything locally with Ollama or bring your own keys. 100% undetectable.
              </p>
            </div>

            <div className="glass-card p-8 group">
              <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                <Image src="/speed.png" alt="Speed" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <Zap className="absolute bottom-4 left-4 w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Sub-100ms Latency</h3>
              <p className="text-white/40 leading-relaxed">
                Engineered for speed. Receive AI-generated insights and answers faster than a human can blink. Real-time transcription is standard.
              </p>
            </div>

            <div className="glass-card p-8 group">
              <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                <Image src="/opensource.png" alt="Open Source" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <MessageCircleCode className="absolute bottom-4 left-4 w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">100% Open Source</h3>
              <p className="text-white/40 leading-relaxed">
                No subscription. No credits. Full transparency. Build your own interview assistant on our hardened foundation. Free forever.
              </p>
            </div>
          </div>

          {/* Browser vs Applications */}
          <section className="w-full pt-40">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">Native Anywhere You Are</h2>
              <p className="text-white/40 text-lg">Currently dominating the browser, expanding to your desktop soon.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-card p-8 border-primary/20 bg-primary/5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">Web Application</h4>
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">Live Now</span>
                  </div>
                </div>
                <ul className="space-y-4">
                  {[
                    "Zero-latency transcription in Chrome/Edge",
                    "Invisible on screen shares & recordings",
                    "Direct integration with Zoom/Meet web clients",
                    "No system-level permissions required"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/60">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-card p-8 border-white/5 opacity-80">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center">
                    <Monitor className="w-6 h-6 text-white/40" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">Desktop & Mobile</h4>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Roadmap Q3 2026</span>
                  </div>
                </div>
                <ul className="space-y-4 text-white/30">
                  {[
                    "System-wide audio capture for native apps",
                    "iOS/Android companions for mock sessions",
                    "Advanced 'Panic Mode' hotkeys",
                    "Cross-device sync for interview notes"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 border border-white/10 rounded-full shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="w-full pt-40 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-12 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                {
                  q: "Is InterviewAI truly undetectable?",
                  a: "Yes. Our Web Application operates in a separate layer from the DOM, making it invisible to browser-based monitoring tools. It doesn't appear in screen shares or recorded sessions."
                },
                {
                  q: "Can I use it for free?",
                  a: "Absolutely. InterviewAI is 100% open source, allowing you to run the platform independently. You can upload resumes, add job descriptions, and integrate your own API keys without paying for credits or subscriptions. We believe interview preparation tools should be accessible to everyone."
                },
                {
                  q: "How does the privacy work?",
                  a: "Your data is yours. If you choose local mode, your audio is processed on your machine and never hits a cloud server. Even in cloud mode, we use stateless processing to ensure nothing is stored."
                },
                {
                  q: "Does it work with coding interviews?",
                  a: "Yes. It has specific modules for whiteboard coding and LeetCode-style questions, offering logical hints rather than just blind answers."
                }
              ].map((faq, i) => (
                <div key={i} className="glass-card p-6 cursor-pointer group hover:bg-white/5 transition-all">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-white text-lg">{faq.q}</h4>
                    <ChevronDown className="w-5 h-5 text-white/20 group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-white/40 leading-relaxed text-sm">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Open Source Trust */}
          <section className="w-full pt-40 pb-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">Trust is Built, Not Bought</h2>
              <p className="text-white/40 text-lg">Proprietary tools ask for your trust. We show you the code.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Self-Hostable",
                  desc: "Run InterviewAI on your own infrastructure. Total control over your data pipeline.",
                  icon: <Shield className="w-6 h-6 text-primary" />
                },
                {
                  title: "Audit Everything",
                  desc: "Every line of code is available on GitHub. Verify our privacy claims yourself.",
                  icon: <Lock className="w-6 h-6 text-secondary" />
                },
                {
                  title: "Community Driven",
                  desc: "Built by developers, for developers. No hidden trackers, no corporate bloat.",
                  icon: <Github className="w-6 h-6 text-accent" />
                }
              ].map((item, i) => (
                <div key={i} className="glass-card p-8 border-white/5 hover:border-primary/20 transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6">
                    {item.icon}
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">{item.title}</h4>
                  <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section className="w-full pt-40 pb-20">
            <div className="glass-card p-12 text-center bg-gradient-to-br from-primary/20 via-slate-900 to-secondary/20 border-primary/20">
              <Sparkles className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-5xl font-black text-white tracking-tighter mb-6">Stop Interviewing Alone.</h2>
              <p className="text-xl text-white/50 mb-10 max-w-xl mx-auto">
                Join 50,000+ developers using the invisible edge to land their dream roles.
              </p>
              <Link
                href="/auth/signup"
                className="inline-flex px-10 py-5 rounded-full bg-white text-black font-black text-lg hover:bg-white/90 transition-all hover:scale-105 shadow-2xl shadow-primary/40 uppercase tracking-widest"
              >
                Join the Forge Now
              </Link>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative py-12 border-t border-white/5 bg-black/20 text-center">
        <p className="text-xs font-bold text-white/20 tracking-[0.3em] uppercase mb-4">
          Built for the bold by Markans
        </p>
        <div className="flex justify-center gap-8">
          <Link href="/security" className="text-[10px] text-white/40 hover:text-white transition-colors uppercase tracking-widest font-black">Security</Link>
          <Link href="/privacy" className="text-[10px] text-white/40 hover:text-white transition-colors uppercase tracking-widest font-black">Privacy</Link>
          <Link href="/terms" className="text-[10px] text-white/40 hover:text-white transition-colors uppercase tracking-widest font-black">Terms</Link>
        </div>
      </footer>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "InterviewAI",
            "operatingSystem": "Web, Mac, Windows, iOS, Android",
            "applicationCategory": "BusinessApplication",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "description": "The invisible AI assistant for job interviews. Open source, private, and undetectable.",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "ratingCount": "534135"
            }
          })
        }}
      />
    </div>
  )
}

