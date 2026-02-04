interface AIConfig {
    llmProvider: 'openai' | 'anthropic' | 'ollama'
    llmApiKey?: string
    llmModel?: string
    ollamaUrl?: string
    systemPrompt?: string
}

interface GenerateOptions {
    config: AIConfig
    prompt: string
    context?: {
        resumeText?: string
        jobDescription?: string
    }
}

export async function generateAnswer(options: GenerateOptions): Promise<string> {
    const { config, prompt, context } = options

    // Build the full prompt with context
    let fullPrompt = config.systemPrompt || 'You are a helpful interview assistant.'

    if (context?.resumeText) {
        fullPrompt += `\n\nCandidate's Resume:\n${context.resumeText}`
    }

    if (context?.jobDescription) {
        fullPrompt += `\n\nJob Description:\n${context.jobDescription}`
    }

    fullPrompt += `\n\nInterview Question: ${prompt}\n\nProvide a concise, professional answer:`

    // Route to appropriate provider
    switch (config.llmProvider) {
        case 'openai':
            return await generateWithOpenAI(config, fullPrompt)
        case 'anthropic':
            return await generateWithAnthropic(config, fullPrompt)
        case 'ollama':
            return await generateWithOllama(config, fullPrompt)
        default:
            throw new Error('Invalid LLM provider')
    }
}

async function generateWithOpenAI(config: AIConfig, prompt: string): Promise<string> {
    if (!config.llmApiKey) {
        throw new Error('OpenAI API key not configured')
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${config.llmApiKey}`,
        },
        body: JSON.stringify({
            model: config.llmModel || 'gpt-4o-mini',
            messages: [
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: 500,
        }),
    })

    if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.choices[0].message.content
}

async function generateWithAnthropic(config: AIConfig, prompt: string): Promise<string> {
    if (!config.llmApiKey) {
        throw new Error('Anthropic API key not configured')
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': config.llmApiKey,
            'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
            model: config.llmModel || 'claude-3-5-sonnet-20241022',
            max_tokens: 500,
            messages: [
                {
                    role: 'user',
                    content: prompt,
                },
            ],
        }),
    })

    if (!response.ok) {
        throw new Error(`Anthropic API error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.content[0].text
}

async function generateWithOllama(config: AIConfig, prompt: string): Promise<string> {
    const ollamaUrl = config.ollamaUrl || 'http://localhost:11434'

    const response = await fetch(`${ollamaUrl}/api/generate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: config.llmModel || 'llama2',
            prompt: prompt,
            stream: false,
        }),
    })

    if (!response.ok) {
        throw new Error(`Ollama API error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.response
}
