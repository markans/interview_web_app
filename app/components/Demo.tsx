'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { MessageSquare, Shield, Zap, Sparkles, Mic, Video, Settings, Github } from 'lucide-react'
import Link from 'next/link'

const demoSteps = [
  {
    interviewer: "Tell me about a challenging project you've worked on recently.",
    candidate: "Sure! I recently led the migration of a legacy monolithic system to a microservices architecture...",
    advice: "Great detail. Try to emphasize the specific impact on system performance and team velocity.",
    feature: "Real-time AI Guidance"
  },
  {
    interviewer: "How do you handle conflict within a development team?",
    candidate: "I believe in open communication. For example, when we had a disagreement about the UI framework...",
    advice: "Good focus on communication. Mention the specific conflict resolution framework you used (e.g., STAR).",
    feature: "Behavioral Coaching"
  },
  {
    interviewer: "What's your experience with cloud-native technologies?",
    candidate: "I've worked extensively with AWS and Kubernetes. In my last role, I built a...",
    advice: "Strong technical keywords. Highlight your cost-optimization strategies in the cloud.",
    feature: "Technical Deep-dive"
  }
]

export default function Demo() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % demoSteps.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full max-w-5xl mx-auto aspect-video mb-20 group">
      {/* Glow Effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-[2rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Main Glass Container */}
      <div className="relative h-full w-full glass-card rounded-2xl overflow-hidden flex flex-col">
        {/* Top bar */}
        <div className="h-12 border-b border-white/10 flex items-center justify-between px-6 bg-white/5">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <span className="ml-4 text-xs font-medium text-white/40 tracking-widest uppercase">Live Interview Session</span>
          </div>
          <div className="flex items-center gap-4 text-white/40">
            <Settings className="w-4 h-4 hover:text-white transition-colors cursor-pointer" />
            <div className="px-2 py-0.5 rounded bg-red-500/20 text-[10px] font-bold text-red-400 border border-red-500/30 animate-pulse">REC</div>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Main Content Area */}
          <div className="flex-1 p-8 flex flex-col gap-6 overflow-hidden">
            {/* Transcription Feed */}
            <div className="flex-1 space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`interviewer-${step}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex gap-4"
                >
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Video className="w-4 h-4 text-white/60" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-tighter">Interviewer</p>
                    <p className="text-lg text-white/90 leading-relaxed italic">{demoSteps[step].interviewer}</p>
                  </div>
                </motion.div>

                <motion.div
                  key={`candidate-${step}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex gap-4"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 border border-primary/30">
                    <Mic className="w-4 h-4 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-primary shadow-primary/50 uppercase tracking-tighter">Your Response</p>
                    <p className="text-lg text-white/70 leading-relaxed font-light">{demoSteps[step].candidate}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* AI Sidebar */}
          <div className="w-80 border-l border-white/10 bg-white/5 p-6 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-xs font-bold text-white/60 uppercase tracking-widest">AI Intelligence</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`advice-${step}`}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-4 rounded-xl bg-accent/10 border border-accent/20 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-accent uppercase">{demoSteps[step].feature}</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                </div>
                <p className="text-sm text-accent/90 leading-snug">
                  {demoSteps[step].advice}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-auto space-y-4">
               <div className="p-3 rounded-lg border border-white/5 bg-white/5 space-y-2">
                  <div className="flex justify-between text-[10px] text-white/40">
                    <span>AI Confidence</span>
                    <span>94%</span>
                  </div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-white/20"
                      initial={{ width: "0%" }}
                      animate={{ width: "94%" }}
                      transition={{ duration: 1 }}
                    />
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="h-16 border-t border-white/10 bg-black/20 flex items-center justify-between px-8">
           <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Latency</span>
                <span className="text-xs text-green-400 font-mono">140ms</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Words/Min</span>
                <span className="text-xs text-white/70 font-mono">124</span>
              </div>
           </div>
           
           <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-xs text-white/60 font-medium">InterviewAI Engine v2.0</span>
           </div>
        </div>
      </div>
    </div>
  )
}
