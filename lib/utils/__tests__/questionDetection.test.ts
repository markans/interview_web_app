import { isQuestion } from '../questionDetection'

describe('isQuestion', () => {
    describe('Direct interrogative questions', () => {
        test('detects what questions', () => {
            expect(isQuestion('What is your name')).toBe(true)
            expect(isQuestion('What are your strengths')).toBe(true)
        })

        test('detects why questions', () => {
            expect(isQuestion('Why do you want this job')).toBe(true)
            expect(isQuestion('Why did you leave your last position')).toBe(true)
        })

        test('detects how questions', () => {
            expect(isQuestion('How do you handle stress')).toBe(true)
            expect(isQuestion('How would you approach this problem')).toBe(true)
        })

        test('detects when/where/who questions', () => {
            expect(isQuestion('When can you start')).toBe(true)
            expect(isQuestion('Where do you see yourself')).toBe(true)
            expect(isQuestion('Who was your mentor')).toBe(true)
        })
    })

    describe('Modal verb questions', () => {
        test('detects can you questions', () => {
            expect(isQuestion('Can you work on weekends')).toBe(true)
            expect(isQuestion('Could you describe your experience')).toBe(true)
        })

        test('detects do you questions', () => {
            expect(isQuestion('Do you have experience with React')).toBe(true)
            expect(isQuestion('Did you work on any projects')).toBe(true)
        })

        test('detects are you questions', () => {
            expect(isQuestion('Are you familiar with TypeScript')).toBe(true)
            expect(isQuestion('Were there any challenges you faced')).toBe(true)
        })
    })

    describe('Imperative/Request patterns', () => {
        test('detects tell me patterns', () => {
            expect(isQuestion('Tell me about yourself')).toBe(true)
            expect(isQuestion('Tell us about your background')).toBe(true)
        })

        test('detects describe patterns', () => {
            expect(isQuestion('Describe your ideal work environment')).toBe(true)
            expect(isQuestion('Describe a challenging project you worked on')).toBe(true)
        })

        test('detects walk me through patterns', () => {
            expect(isQuestion('Walk me through your resume')).toBe(true)
            expect(isQuestion('Walk us through your thought process')).toBe(true)
        })

        test('detects explain patterns', () => {
            expect(isQuestion('Explain how you solved that problem')).toBe(true)
            expect(isQuestion('Explain your approach to testing')).toBe(true)
        })
    })

    describe('STAR method and behavioral questions', () => {
        test('detects give me an example patterns', () => {
            expect(isQuestion('Give me an example of leadership')).toBe(true)
            expect(isQuestion('Give an example of conflict resolution')).toBe(true)
        })

        test('detects share a time patterns', () => {
            expect(isQuestion('Share a time you failed')).toBe(true)
            expect(isQuestion('Share an instance when you led a team')).toBe(true)
        })

        test('detects describe a situation patterns', () => {
            expect(isQuestion('Describe a situation where you had to adapt')).toBe(true)
            expect(isQuestion('Describe a time you disagreed with your manager')).toBe(true)
        })

        test('detects have you ever patterns', () => {
            expect(isQuestion('Have you ever worked remotely')).toBe(true)
            expect(isQuestion('Can you recall a difficult decision')).toBe(true)
        })
    })

    describe('Comparative questions', () => {
        test('detects compare patterns', () => {
            expect(isQuestion('Compare React and Vue')).toBe(true)
            expect(isQuestion('What is the difference between SQL and NoSQL')).toBe(true)
        })

        test('detects preference patterns', () => {
            expect(isQuestion('Which would you prefer and why')).toBe(true)
            expect(isQuestion('How do they differ in your opinion')).toBe(true)
        })
    })

    describe('Hypothetical questions', () => {
        test('detects what would you patterns', () => {
            expect(isQuestion('What would you do in this scenario')).toBe(true)
            expect(isQuestion('How would you handle a difficult client')).toBe(true)
        })

        test('detects what if patterns', () => {
            expect(isQuestion('What if you had unlimited resources')).toBe(true)
            expect(isQuestion('Suppose you were the CEO')).toBe(true)
        })
    })

    describe('Experience and capability questions', () => {
        test('detects experience patterns', () => {
            expect(isQuestion('Do you have experience with AWS')).toBe(true)
            expect(isQuestion('Have you worked with agile methodologies')).toBe(true)
        })

        test('detects familiarity patterns', () => {
            expect(isQuestion('Are you familiar with Docker')).toBe(true)
            expect(isQuestion('Are you comfortable with public speaking')).toBe(true)
        })
    })

    describe('Question marks', () => {
        test('detects questions with question marks', () => {
            expect(isQuestion('What is your salary expectation?')).toBe(true)
            expect(isQuestion('Do you have any questions?')).toBe(true)
        })
    })

    describe('Filler words handling', () => {
        test('removes common filler words', () => {
            expect(isQuestion('So tell me about yourself')).toBe(true)
            expect(isQuestion('Well what are your strengths')).toBe(true)
            expect(isQuestion('Um can you describe your experience')).toBe(true)
        })
    })

    describe('Edge cases and false negatives', () => {
        test('rejects very short statements', () => {
            expect(isQuestion('Hello there')).toBe(false)
            expect(isQuestion('Yes no')).toBe(false)
        })

        test('rejects statements without question patterns', () => {
            expect(isQuestion('I am a software engineer')).toBe(false)
            expect(isQuestion('The project was completed successfully')).toBe(false)
        })

        test('accepts shorter questions (3+ words)', () => {
            expect(isQuestion('What is React')).toBe(true)
            expect(isQuestion('Tell me more')).toBe(true)
        })
    })

    describe('Real-world interview questions', () => {
        test('detects common interview questions', () => {
            expect(isQuestion('Tell me about yourself')).toBe(true)
            expect(isQuestion('What are your greatest strengths')).toBe(true)
            expect(isQuestion('What is your biggest weakness')).toBe(true)
            expect(isQuestion('Why do you want to work here')).toBe(true)
            expect(isQuestion('Where do you see yourself in 5 years')).toBe(true)
            expect(isQuestion('Give me an example of a time you solved a problem')).toBe(true)
            expect(isQuestion('How would you handle a disagreement with a coworker')).toBe(true)
            expect(isQuestion('Do you have experience with TypeScript')).toBe(true)
        })
    })
})
