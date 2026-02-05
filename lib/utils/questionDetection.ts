/**
 * Determines if a given text is likely a question based on pattern matching.
 * 
 * Detection criteria:
 * 1. Starts with common question words (what, why, how, etc.)
 * 2. Contains a question mark
 * 3. Has minimum length of 5 words to avoid false positives
 * 
 * @param text - The text to analyze
 * @returns true if the text is likely a question, false otherwise
 */
export function isQuestion(text: string): boolean {
    const lowerText = text.toLowerCase().trim()

    // Check for question words at start
    const questionStarters = [
        'what', 'why', 'how', 'when', 'where', 'who', 'which',
        'can you', 'could you', 'would you', 'will you',
        'do you', 'did you', 'have you', 'has',
        'tell me', 'describe', 'explain', 'walk me through',
        'are you', 'is there', 'are there', 'was there',
        'should', 'may i', 'might'
    ]

    const startsWithQuestion = questionStarters.some(starter =>
        lowerText.startsWith(starter + ' ') || lowerText === starter
    )

    // Check for question mark
    const hasQuestionMark = text.includes('?')

    // Check minimum length (at least 5 words to avoid false positives)
    const wordCount = text.split(/\s+/).filter(w => w.length > 0).length
    const hasMinLength = wordCount >= 5

    // Return true if it starts with a question word or has a question mark, AND meets minimum length
    return (startsWithQuestion || hasQuestionMark) && hasMinLength
}
