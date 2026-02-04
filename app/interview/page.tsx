'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { BrowserSTT, DeepgramSTT } from '@/lib/ai/transcribe'
import { generateAnswer } from '@/lib/ai/generate'

export default function InterviewPage() {
    const [isRecording, setIsRecording] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const [transcript, setTranscript] = useState('')
    const [aiResponse, setAiResponse] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [config, setConfig] = useState<any>(null)
    const [context, setContext] = useState<any>(null)

    const sttRef = useRef<BrowserSTT | DeepgramSTT | null>(null)
    const transcriptTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        // Load config and context from localStorage
        const savedConfig = localStorage.getItem('aiConfig')
        const savedContext = localStorage.getItem('resumeContext')

        if (savedConfig) {
            setConfig(JSON.parse(savedConfig))
        } else {
            setError('Please configure your AI settings first')
        }

        if (savedContext) {
            setContext(JSON.parse(savedContext))
        }
    }, [])

    const handleStartRecording = async () => {
        try {
            setError(null)
            setIsRecording(true)

            if (!config) {
                throw new Error('AI configuration not found')
            }

            // Initialize STT based on config
            if (config.sttProvider === 'deepgram') {
                if (!config.sttApiKey) {
                    throw new Error('Deepgram API key not configured')
                }
                sttRef.current = new DeepgramSTT(config.sttApiKey)
            } else {
                sttRef.current = new BrowserSTT()
            }

            // Start transcription
            await sttRef.current.start((text) => {
                setTranscript(text)

                // Debounce AI generation - wait for 2 seconds of silence
                // Only schedule if not paused
                if (transcriptTimeoutRef.current) {
                    clearTimeout(transcriptTimeoutRef.current)
                }

                transcriptTimeoutRef.current = setTimeout(() => {
                    // Check if paused before generating
                    if (!isPaused) {
                        handleGenerateAnswer(text)
                    }
                }, 2000)
            })
        } catch (err: any) {
            setError(err.message)
            setIsRecording(false)
        }
    }

    const handleStopRecording = () => {
        if (sttRef.current) {
            sttRef.current.stop()
        }
        if (transcriptTimeoutRef.current) {
            clearTimeout(transcriptTimeoutRef.current)
        }
        setIsRecording(false)
    }

    const handleGenerateAnswer = async (question: string) => {
        if (!question.trim() || !config) return

        setLoading(true)
        setError(null)

        try {
            const answer = await generateAnswer({
                config,
                prompt: question,
                context,
            })
            setAiResponse(answer)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Navigation */}
            <nav className="border-b border-white/10 backdrop-blur-lg bg-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/dashboard" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg"></div>
                            <span className="text-xl font-bold text-white">InterviewAI</span>
                        </Link>
                        <div className="flex items-center gap-4">
                            {isRecording && (
                                <>
                                    <div className="flex items-center gap-2 px-3 py-1 bg-red-500/20 border border-red-500/50 rounded-full">
                                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                        <span className="text-red-200 text-sm font-medium">Recording</span>
                                    </div>
                                    <button
                                        onClick={() => setIsPaused(!isPaused)}
                                        className={`px-4 py-2 font-semibold rounded-lg transition-all flex items-center gap-2 ${isPaused
                                            ? 'bg-green-600 hover:bg-green-700 text-white'
                                            : 'bg-yellow-600 hover:bg-yellow-700 text-white'
                                            }`}
                                    >
                                        {isPaused ? (
                                            <>
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                                Resume AI
                                            </>
                                        ) : (
                                            <>
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                                Pause AI
                                            </>
                                        )}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {error && (
                    <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
                        {error}
                        {error.includes('configure') && (
                            <Link
                                href="/config/settings"
                                className="ml-2 underline hover:text-red-100"
                            >
                                Go to Settings
                            </Link>
                        )}
                    </div>
                )}

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Transcript Panel */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-white">Live Transcript</h2>
                            {!isRecording ? (
                                <button
                                    onClick={handleStartRecording}
                                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all flex items-center gap-2"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                                        />
                                    </svg>
                                    Start
                                </button>
                            ) : (
                                <button
                                    onClick={handleStopRecording}
                                    className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all flex items-center gap-2"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
                                        />
                                    </svg>
                                    Stop
                                </button>
                            )}
                        </div>

                        <div className="min-h-[400px] max-h-[600px] overflow-y-auto p-4 bg-black/20 rounded-lg">
                            {transcript ? (
                                <p className="text-gray-200 leading-relaxed">{transcript}</p>
                            ) : (
                                <p className="text-gray-500 text-center mt-20">
                                    Click &quot;Start&quot; to begin transcribing...
                                </p>
                            )}
                        </div>
                    </div>

                    {/* AI Response Panel */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-white">AI Suggestion</h2>
                            <div className="flex items-center gap-2">
                                {isPaused && (
                                    <div className="flex items-center gap-2 px-3 py-1 bg-yellow-500/20 border border-yellow-500/50 rounded-full">
                                        <svg
                                            className="w-4 h-4 text-yellow-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <span className="text-yellow-200 text-sm font-medium">Paused</span>
                                    </div>
                                )}
                                {loading && (
                                    <div className="flex items-center gap-2 text-purple-400">
                                        <svg
                                            className="animate-spin h-5 w-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        <span className="text-sm">Generating...</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="min-h-[400px] max-h-[600px] overflow-y-auto p-4 bg-black/20 rounded-lg">
                            {aiResponse ? (
                                <div className="text-gray-200 leading-relaxed whitespace-pre-wrap">
                                    {aiResponse}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center mt-20">
                                    AI suggestions will appear here...
                                </p>
                            )}
                        </div>

                        {aiResponse && (
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(aiResponse)
                                }}
                                className="mt-4 w-full py-2 px-4 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all border border-white/20 flex items-center justify-center gap-2"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                    />
                                </svg>
                                Copy to Clipboard
                            </button>
                        )}
                    </div>
                </div>
            </div >
        </div >
    )
}
