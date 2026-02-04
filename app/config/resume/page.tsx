'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ResumePage() {
    const [resumeText, setResumeText] = useState('')
    const [jobDescription, setJobDescription] = useState('')
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)

    // Load saved data from localStorage on mount
    useEffect(() => {
        const savedContext = localStorage.getItem('resumeContext')
        if (savedContext) {
            const { resumeText: savedResume, jobDescription: savedJob } = JSON.parse(savedContext)
            if (savedResume) setResumeText(savedResume)
            if (savedJob) setJobDescription(savedJob)
        }
    }, [])

    const handleSave = () => {
        setSaving(true)
        localStorage.setItem('resumeContext', JSON.stringify({ resumeText, jobDescription }))
        setSaved(true)
        setSaving(false)
        setTimeout(() => setSaved(false), 3000)
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = (event) => {
            const text = event.target?.result as string
            setResumeText(text)
        }
        reader.readAsText(file)
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
                    <h1 className="text-4xl font-bold text-white mb-2">Resume & Context</h1>
                    <p className="text-gray-300">
                        Add your resume and job description for personalized AI responses
                    </p>
                </div>

                <div className="space-y-6">
                    {/* Resume Upload */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                        <h2 className="text-2xl font-bold text-white mb-4">Resume</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    Upload Resume (Text/PDF)
                                </label>
                                <input
                                    type="file"
                                    accept=".txt,.pdf"
                                    onChange={handleFileUpload}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    Or paste your resume text
                                </label>
                                <textarea
                                    value={resumeText}
                                    onChange={(e) => setResumeText(e.target.value)}
                                    rows={10}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="Paste your resume here..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Job Description */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                        <h2 className="text-2xl font-bold text-white mb-4">Job Description</h2>
                        <textarea
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            rows={8}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Paste the job description you're interviewing for..."
                        />
                    </div>

                    {/* Save Button */}
                    <div className="flex gap-4">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 transition-all"
                        >
                            {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Context'}
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
