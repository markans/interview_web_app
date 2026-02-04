'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface AIConfig {
    llmProvider: 'openai' | 'anthropic' | 'ollama'
    llmApiKey?: string
    llmModel?: string
    ollamaUrl?: string
    sttProvider: 'deepgram' | 'browser'
    sttApiKey?: string
    systemPrompt?: string
}

export default function SettingsPage() {
    const [config, setConfig] = useState<AIConfig>({
        llmProvider: 'openai',
        llmModel: 'gpt-4o-mini',
        sttProvider: 'browser',
        systemPrompt:
            'You are an AI interview assistant. Provide concise, professional answers to interview questions. Use the STAR method when appropriate.',
    })
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        // Load config from localStorage
        const savedConfig = localStorage.getItem('aiConfig')
        if (savedConfig) {
            setConfig(JSON.parse(savedConfig))
        }
    }, [])

    const handleSave = () => {
        setSaving(true)
        localStorage.setItem('aiConfig', JSON.stringify(config))
        setSaved(true)
        setSaving(false)
        setTimeout(() => setSaved(false), 3000)
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
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
                    <p className="text-gray-300">Configure your AI providers and preferences</p>
                </div>

                <div className="space-y-6">
                    {/* LLM Provider */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                        <h2 className="text-2xl font-bold text-white mb-4">LLM Provider</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">Provider</label>
                                <select
                                    value={config.llmProvider}
                                    onChange={(e) =>
                                        setConfig({ ...config, llmProvider: e.target.value as any })
                                    }
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    <option value="openai">OpenAI</option>
                                    <option value="anthropic">Anthropic</option>
                                    <option value="ollama">Ollama (Local)</option>
                                </select>
                            </div>

                            {config.llmProvider !== 'ollama' && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-200 mb-2">
                                            API Key
                                        </label>
                                        <input
                                            type="password"
                                            value={config.llmApiKey || ''}
                                            onChange={(e) => setConfig({ ...config, llmApiKey: e.target.value })}
                                            placeholder="sk-..."
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-200 mb-2">Model</label>
                                        <input
                                            type="text"
                                            value={config.llmModel || ''}
                                            onChange={(e) => setConfig({ ...config, llmModel: e.target.value })}
                                            placeholder={
                                                config.llmProvider === 'openai'
                                                    ? 'gpt-4o-mini'
                                                    : 'claude-3-5-sonnet-20241022'
                                            }
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                        />
                                    </div>
                                </>
                            )}

                            {config.llmProvider === 'ollama' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-200 mb-2">
                                        Ollama URL
                                    </label>
                                    <input
                                        type="text"
                                        value={config.ollamaUrl || ''}
                                        onChange={(e) => setConfig({ ...config, ollamaUrl: e.target.value })}
                                        placeholder="http://localhost:11434"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* STT Provider */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                        <h2 className="text-2xl font-bold text-white mb-4">Speech-to-Text</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">Provider</label>
                                <select
                                    value={config.sttProvider}
                                    onChange={(e) =>
                                        setConfig({ ...config, sttProvider: e.target.value as any })
                                    }
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    <option value="browser">Browser Native (Free)</option>
                                    <option value="deepgram">Deepgram (Paid)</option>
                                </select>
                            </div>

                            {config.sttProvider === 'deepgram' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-200 mb-2">
                                        Deepgram API Key
                                    </label>
                                    <input
                                        type="password"
                                        value={config.sttApiKey || ''}
                                        onChange={(e) => setConfig({ ...config, sttApiKey: e.target.value })}
                                        placeholder="Enter your Deepgram API key"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* System Prompt */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                        <h2 className="text-2xl font-bold text-white mb-4">System Prompt</h2>
                        <textarea
                            value={config.systemPrompt || ''}
                            onChange={(e) => setConfig({ ...config, systemPrompt: e.target.value })}
                            rows={6}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Customize how the AI responds to interview questions..."
                        />
                    </div>

                    {/* Save Button */}
                    <div className="flex gap-4">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 transition-all"
                        >
                            {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Settings'}
                        </button>
                        <Link
                            href="/dashboard"
                            className="px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all border border-white/20"
                        >
                            Cancel
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
