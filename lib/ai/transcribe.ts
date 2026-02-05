// Browser-based Speech Recognition using Web Speech API
export class BrowserSTT {
    private recognition: any
    private onTranscriptCallback?: (text: string) => void
    private isActive: boolean = false

    constructor() {
        if (typeof window !== 'undefined') {
            const SpeechRecognition =
                (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
            if (SpeechRecognition) {
                this.recognition = new SpeechRecognition()
                this.recognition.continuous = true
                this.recognition.interimResults = true
                this.recognition.lang = 'en-US'
            }
        }
    }

    start(onTranscript: (text: string) => void) {
        if (!this.recognition) {
            throw new Error('Speech recognition not supported in this browser')
        }

        this.onTranscriptCallback = onTranscript

        this.recognition.onresult = (event: any) => {
            let finalTranscript = ''
            let interimTranscript = ''

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript
                if (event.results[i].isFinal) {
                    finalTranscript += transcript + ' '
                } else {
                    interimTranscript += transcript
                }
            }

            // Only trigger callback when we have final results
            // This prevents duplicate entries from interim results
            const textToSend = finalTranscript.trim() || interimTranscript.trim()
            if (textToSend && this.onTranscriptCallback) {
                this.onTranscriptCallback(textToSend)
            }
        }

        this.recognition.onerror = (event: any) => {
            console.error('Speech recognition error:', event.error)
            // Don't auto-restart on certain errors
            if (event.error === 'no-speech' || event.error === 'audio-capture') {
                // These are recoverable, will restart via onend
            } else if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
                // Permission denied, stop trying
                this.isActive = false
            }
        }

        this.recognition.onend = () => {
            // Auto-restart if still active
            if (this.isActive) {
                try {
                    this.recognition.start()
                } catch (err) {
                    console.error('Failed to restart recognition:', err)
                    // Will try again on next onend
                }
            }
        }

        this.isActive = true
        this.recognition.start()
    }

    stop() {
        this.isActive = false
        if (this.recognition) {
            this.recognition.stop()
        }
    }
}

// Deepgram STT (requires API key)
export class DeepgramSTT {
    private apiKey: string
    private socket?: WebSocket
    private onTranscriptCallback?: (text: string) => void

    constructor(apiKey: string) {
        this.apiKey = apiKey
    }

    async start(onTranscript: (text: string) => void) {
        this.onTranscriptCallback = onTranscript

        // Get microphone stream
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const mediaRecorder = new MediaRecorder(stream, {
            mimeType: 'audio/webm',
        })

        // Connect to Deepgram
        this.socket = new WebSocket('wss://api.deepgram.com/v1/listen', [
            'token',
            this.apiKey,
        ])

        this.socket.onopen = () => {
            mediaRecorder.addEventListener('dataavailable', (event) => {
                if (event.data.size > 0 && this.socket?.readyState === WebSocket.OPEN) {
                    this.socket.send(event.data)
                }
            })

            mediaRecorder.start(250) // Send data every 250ms
        }

        this.socket.onmessage = (message) => {
            const data = JSON.parse(message.data)
            const transcript = data.channel?.alternatives?.[0]?.transcript

            if (transcript && this.onTranscriptCallback) {
                this.onTranscriptCallback(transcript)
            }
        }

        this.socket.onerror = (error) => {
            console.error('Deepgram WebSocket error:', error)
        }
    }

    stop() {
        if (this.socket) {
            this.socket.close()
        }
    }
}
