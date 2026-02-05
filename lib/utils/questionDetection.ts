/**
 * Determines if a given text is likely a question based on comprehensive pattern matching.
 * 
 * Detection criteria:
 * 1. Direct questions (starts with interrogative words)
 * 2. Imperative questions (tell me, describe, explain)
 * 3. STAR method questions (give an example, share a time)
 * 4. Comparative questions (compare, difference between)
 * 5. Hypothetical questions (what would you, how would you)
 * 6. Behavioral questions (have you ever, can you recall)
 * 7. Contains a question mark
 * 8. Has minimum length of 3 words to avoid false positives
 * 
 * @param text - The text to analyze
 * @returns true if the text is likely a question, false otherwise
 */
export function isQuestion(text: string): boolean {
    // Remove common filler words and normalize
    const lowerText = text.toLowerCase().trim()
        .replace(/^(so|well|um|uh|okay|alright),?\s*/i, '')

    // Check minimum length (at least 3 words to catch shorter questions)
    const wordCount = lowerText.split(/\s+/).filter(w => w.length > 0).length
    if (wordCount < 3) return false

    // 1. Direct interrogative questions
    const directQuestionWords = [
        'what', 'why', 'how', 'when', 'where', 'who', 'which', 'whose', 'whom'
    ]

    // 2. Modal verb questions
    const modalQuestions = [
        'can you', 'could you', 'would you', 'will you', 'should you',
        'do you', 'did you', 'have you', 'has', 'had you',
        'are you', 'is there', 'are there', 'was there', 'were there',
        'may i', 'might you', 'shall we', 'must you'
    ]

    // 3. Imperative/Request patterns (common in conversational interviews)
    const imperativePatterns = [
        'tell me', 'tell us', 'describe', 'explain', 'walk me through',
        'walk us through', 'talk about', 'share', 'discuss',
        'elaborate on', 'expand on', 'clarify', 'outline'
    ]

    // 4. STAR method and behavioral question patterns
    const starPatterns = [
        'give me an example', 'give an example', 'give us an example',
        'share a time', 'share an instance', 'share an example',
        'describe a situation', 'describe a time', 'describe an instance',
        'tell me about a time', 'tell us about a time',
        'can you recall', 'think of a time', 'think of an example',
        'have you ever', 'can you think of', 'provide an example'
    ]

    // 5. Comparative question patterns
    const comparativePatterns = [
        'compare', 'what\'s the difference', 'what is the difference',
        'how would you choose', 'which would you prefer',
        'what are the differences', 'how do they differ',
        'contrast', 'versus', 'vs'
    ]

    // 6. Hypothetical question patterns
    const hypotheticalPatterns = [
        'what would you', 'how would you', 'what if', 'suppose',
        'imagine', 'if you were', 'if you had', 'how might you',
        'what could you', 'how should you'
    ]

    // 7. Experience and capability questions
    const experiencePatterns = [
        'do you have experience', 'have you worked with',
        'are you familiar', 'have you used', 'can you work with',
        'do you know', 'are you comfortable', 'have you done'
    ]

    // Check for question mark
    const hasQuestionMark = text.includes('?')

    // Check if starts with any question pattern
    const startsWithDirectQuestion = directQuestionWords.some(word =>
        lowerText.startsWith(word + ' ') || lowerText === word
    )

    const startsWithModal = modalQuestions.some(pattern =>
        lowerText.startsWith(pattern + ' ') || lowerText === pattern
    )

    const startsWithImperative = imperativePatterns.some(pattern =>
        lowerText.startsWith(pattern + ' ') || lowerText === pattern
    )

    const containsStarPattern = starPatterns.some(pattern =>
        lowerText.includes(pattern)
    )

    const containsComparative = comparativePatterns.some(pattern =>
        lowerText.includes(pattern)
    )

    const containsHypothetical = hypotheticalPatterns.some(pattern =>
        lowerText.includes(pattern)
    )

    const containsExperience = experiencePatterns.some(pattern =>
        lowerText.includes(pattern)
    )

    // Return true if any question pattern is detected
    return (
        hasQuestionMark ||
        startsWithDirectQuestion ||
        startsWithModal ||
        startsWithImperative ||
        containsStarPattern ||
        containsComparative ||
        containsHypothetical ||
        containsExperience
    )
}
