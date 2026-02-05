'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { BrowserSTT, DeepgramSTT } from '@/lib/ai/transcribe'
import { generateAnswer } from '@/lib/ai/generate'
import { isQuestion } from '@/lib/utils/questionDetection'

interface ConversationEntry {
    id: string
    question: string
    answer: string
    loading: boolean
    timestamp: Date
    isPredefined?: boolean
}

// Predefined interview questions
const PREDEFINED_QUESTIONS = [
    "Tell me about yourself",
    "What are your greatest strengths?",
    "What is your biggest weakness?",
    "Why do you want to work here?",
    "Where do you see yourself in 5 years?"
]

export default function InterviewPage() {
    const [isRecording, setIsRecording] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const [currentTranscript, setCurrentTranscript] = useState('')
    const [fullTranscript, setFullTranscript] = useState('')
    const [conversations, setConversations] = useState<ConversationEntry[]>([])
    const [error, setError] = useState<string | null>(null)
    const [config, setConfig] = useState<any>(null)
    const [context, setContext] = useState<any>(null)

    const sttRef = useRef<BrowserSTT | DeepgramSTT | null>(null)
    const transcriptTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const isPausedRef = useRef(false)
    const lastProcessedTranscriptRef = useRef('')
    const isProcessingRef = useRef(false)
    const currentTranscriptRef = useRef('')

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

    // Helper function to check if a question matches a predefined question
    const matchesPredefinedQuestion = (text: string): string | null => {
        const lowerText = text.toLowerCase().trim()
        for (const predefinedQ of PREDEFINED_QUESTIONS) {
            const lowerPredefined = predefinedQ.toLowerCase()
            // Check for exact match or if the predefined question is contained in the text
            if (lowerText === lowerPredefined || lowerText.includes(lowerPredefined)) {
                return predefinedQ
            }
        }
        return null
    }

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
                const trimmedText = text.trim()

                // Update current transcript display
                setCurrentTranscript(trimmedText)
                currentTranscriptRef.current = trimmedText

                // Debounce - wait for 5 seconds of silence before creating new entry
                if (transcriptTimeoutRef.current) {
                    clearTimeout(transcriptTimeoutRef.current)
                }

                transcriptTimeoutRef.current = setTimeout(() => {
                    // After 5 seconds of silence, create a new conversation entry
                    const finalText = currentTranscriptRef.current.trim()

                    // Only create entry if:
                    // 1. We have text
                    // 2. It's different from the last processed transcript
                    // 3. We're not already processing an entry
                    if (finalText &&
                        finalText !== lastProcessedTranscriptRef.current &&
                        !isProcessingRef.current) {

                        // Add to full transcript (all speech)
                        setFullTranscript(prev => prev ? prev + '\n\n' + finalText : finalText)

                        // Check if it's a question
                        if (isQuestion(finalText)) {
                            // It's a question - create conversation entry with AI response
                            isProcessingRef.current = true
                            lastProcessedTranscriptRef.current = finalText
                            handleCreateConversationEntry(finalText)
                        } else {
                            // Not a question - just update the last processed to avoid reprocessing
                            lastProcessedTranscriptRef.current = finalText
                        }

                        // Clear current transcript for next question
                        setCurrentTranscript('')
                        currentTranscriptRef.current = ''
                    }
                }, 5000)
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

        // Reset all tracking refs for clean state
        lastProcessedTranscriptRef.current = ''
        isProcessingRef.current = false
        currentTranscriptRef.current = ''

        setIsRecording(false)
        setCurrentTranscript('')
    }

    const handleCreateConversationEntry = async (question: string) => {
        if (!question.trim() || !config) {
            isProcessingRef.current = false
            return
        }

        // Check if this matches a predefined question
        const matchedQuestion = matchesPredefinedQuestion(question)
        const isPredefined = matchedQuestion !== null
        const displayQuestion = isPredefined ? matchedQuestion : question.trim()

        // Create new entry with loading state
        const newEntry: ConversationEntry = {
            id: Date.now().toString(),
            question: displayQuestion,
            answer: '',
            loading: true,
            timestamp: new Date(),
            isPredefined,
        }

        setConversations(prev => [...prev, newEntry])

        // Generate answer if not paused
        if (!isPausedRef.current) {
            try {
                const answer = await generateAnswer({
                    config,
                    prompt: displayQuestion,
                    context,
                })

                // Update the entry with the answer
                setConversations(prev =>
                    prev.map(entry =>
                        entry.id === newEntry.id
                            ? { ...entry, answer, loading: false }
                            : entry
                    )
                )
            } catch (err: any) {
                setError(err.message)
                // Update entry to show error
                setConversations(prev =>
                    prev.map(entry =>
                        entry.id === newEntry.id
                            ? { ...entry, answer: 'Error generating answer', loading: false }
                            : entry
                    )
                )
            } finally {
                // Reset processing flag after answer is generated
                isProcessingRef.current = false
            }
        } else {
            // If paused, just mark as not loading without generating
            setConversations(prev =>
                prev.map(entry =>
                    entry.id === newEntry.id
                        ? { ...entry, loading: false }
                        : entry
                )
            )
            // Reset processing flag
            isProcessingRef.current = false
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
                                        onClick={() => {
                                            const newPausedState = !isPaused
                                            setIsPaused(newPausedState)
                                            isPausedRef.current = newPausedState
                                        }}
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
                            <Link
                                href="/config/settings"
                                className="text-gray-300 hover:text-white transition-colors"
                            >
                                Settings
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Single Conversation Panel */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold text-white">Interview Session</h2>
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
                                    <span className="text-yellow-200 text-sm font-medium">AI Paused</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="mb-6 flex items-center justify-center gap-4">
                        {!isRecording ? (
                            <button
                                onClick={handleStartRecording}
                                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all flex items-center gap-2"
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
                                Start Interview
                            </button>
                        ) : (
                            <button
                                onClick={handleStopRecording}
                                className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all flex items-center gap-2"
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
                                        d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
                                    />
                                </svg>
                                Stop Interview
                            </button>
                        )}
                    </div>

                    {/* Full Transcript Section */}
                    {fullTranscript && (
                        <div className="mb-6">
                            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-sm font-semibold text-blue-300">Full Transcript</h3>
                                    <span className="text-xs text-gray-400">All captured speech</span>
                                </div>
                                <div className="text-sm text-gray-300 whitespace-pre-wrap max-h-40 overflow-y-auto">
                                    {fullTranscript}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Conversation History */}
                    <div className="min-h-[500px] max-h-[700px] overflow-y-auto p-4 bg-black/20 rounded-lg space-y-6">
                        {conversations.length === 0 && !currentTranscript ? (
                            <p className="text-gray-500 text-center mt-20">
                                Click &quot;Start Interview&quot; to begin. Your questions will appear here after 5 seconds of silence.
                            </p>
                        ) : (
                            <>
                                {/* Show conversation history */}
                                {conversations.map((conv) => (
                                    <div key={conv.id} className="space-y-3">
                                        {/* Question */}
                                        <div className="flex justify-end">
                                            <div className="max-w-[80%] bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-500/50 rounded-lg p-4">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <p className="text-sm text-purple-300">Question</p>
                                                    {conv.isPredefined && (
                                                        <span className="text-xs px-2 py-0.5 bg-blue-500/30 border border-blue-400/50 rounded-full text-blue-200">
                                                            Interviewer
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-white">{conv.question}</p>
                                            </div>
                                        </div>

                                        {/* Answer */}
                                        <div className="flex justify-start">
                                            <div className="max-w-[80%] bg-white/10 border border-white/20 rounded-lg p-4">
                                                <div className="flex items-center justify-between mb-2">
                                                    <p className="text-sm text-gray-400">AI Answer</p>
                                                    {conv.answer && !conv.loading && (
                                                        <button
                                                            onClick={() => navigator.clipboard.writeText(conv.answer)}
                                                            className="text-xs px-2 py-1 bg-white/10 hover:bg-white/20 rounded transition-all"
                                                            title="Copy to clipboard"
                                                        >
                                                            Copy
                                                        </button>
                                                    )}
                                                </div>
                                                {conv.loading ? (
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
                                                        <span className="text-sm">Generating answer...</span>
                                                    </div>
                                                ) : conv.answer ? (
                                                    <p className="text-gray-200 whitespace-pre-wrap">{conv.answer}</p>
                                                ) : (
                                                    <p className="text-gray-500 italic">No answer generated (AI was paused)</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Current transcript (being spoken) */}
                                {currentTranscript && (
                                    <div className="flex justify-end">
                                        <div className="max-w-[80%] bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-lg p-4 animate-pulse">
                                            <p className="text-sm text-purple-300 mb-1">Speaking...</p>
                                            <p className="text-white/80">{currentTranscript}</p>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* Info Message */}
                    {isRecording && (
                        <p className="mt-4 text-center text-sm text-gray-400">
                            All speech is captured. AI will auto-generate answers for detected questions after 5 seconds of silence.
                        </p>
                    )}
                </div>

                {error && (
                    <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
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
            </div>
        </div>
    )
}
