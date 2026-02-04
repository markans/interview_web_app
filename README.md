# Real-time Interview Assistant

An open-source clone of Parakeet AI, a real-time job interview assistant. Built with Next.js, Supabase, and a "Bring Your Own Key" (BYOK) model.

## 🚀 Key Features
- **Real-time Transcription**: Supports Browser Web Speech API (Free) and Deepgram (Paid).
- **AI-Powered Suggestions**: Context-aware interview answers based on your resume and job description.
- **BYOK Model**: No credit system—use your own API keys for OpenAI, Anthropic, or local LLMs (Ollama).
- **Privacy First**: All configurations and context are stored locally in your browser.
- **Modern UI**: Sleek glassmorphism design with responsive support.

## 🛠️ Tech Stack
- **Frontend**: Next.js 14 (App Router), React, TailwindCSS, Zustand.
- **Backend/Auth**: Supabase.
- **AI Integration**: OpenAI SDK, Anthropic SDK, and Ollama support.

---

## 🏃 Local Setup Guide

### 1. Prerequisites
- Node.js (v18.0 or later)
- npm, yarn, or pnpm
- A Supabase account (Free tier is fine)
- (Optional) API keys for OpenAI, Anthropic, or Deepgram

### 2. Clone the Repository
```bash
git clone https://github.com/markans/interview_web_app.git
cd interview_web_app
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Environment Variables
Create a `.env.local` file in the root directory and add your Supabase credentials:
```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 5. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the application.

---

## ⚙️ Configuration

### Supabase Setup
1. Create a new project on [Supabase](https://supabase.com/).
2. Enable **Email/Password** and **Google** authentication providers in the Auth settings.
3. Configure Redirect URLs for local development (e.g., `http://localhost:3000/auth/callback`).

### AI Providers
Once signed in, navigate to **Settings** to configure:
- **LLM Provider**: Choose between OpenAI, Anthropic, or Ollama.
- **STT Provider**: Use the built-in browser API for free or Deepgram for high accuracy.

---

## 📄 License
This project is open-source. Feel free to use and contribute!

