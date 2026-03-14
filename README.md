# SpeakEasy: Voice-First English Learning MVP

SpeakEasy is a prototype English coaching application built for a hackathon. It focuses entirely on a **voice-first** user experience tailormade for newcomers and refugees with low literacy. This application avoids heavy reading and writing dependencies, relying instead on spoken AI interactions, simulated environments, and clear visual cues.

## Key Features

- **Split-Screen Speaking Assessment:** Easily gauge the learner's incoming level with simple, voice-based prompt questions.
- **Scenario-Based Conversation Practice:** The AI adapts its tone and speaking style based on real-world personas (e.g., Friend, Manager, Professor, Customer) while interacting dynamically with the learner's input.
- **AI-Generated Vocabulary:** Fresh vocabulary words are dynamically generated and surfaced depending on how the conversation flowed. 
- **Voice Output Built for ElevenLabs:** The interface is built anticipating integration with speech-to-text engines and modern Text-to-Speech voices like ElevenLabs to simulate immersive audio feedback.
- **Goal Tracking & Gamification:** Daily streaks, check-in calendars, and vocabulary quizzes encourage habit formation based on Duolingo's successful gamification loop.
- **Full Bilingual Support (English & Rohingya):** A seamless language toggle makes the entire UI instantly comprehensible for native Rohingya speakers. 

## Tech Stack
- **Framework:** Next.js (App Router) & React
- **Language:** TypeScript
- **Styling:** Tailwind CSS 
- **Icons:** Lucide React

## Running Locally

Clone the repository and install dependencies:

```bash
git clone https://github.com/maggiemajiayi-cell/AI-data-hackathon.git
cd AI-data-hackathon
npm install
```

Start the development server:
```bash
npm run dev
```
Navigate to `http://localhost:3000` to view the MVP in action!

## Future Hackathon Priorities
1. **API Integration**: Swap mockup hooks with live backend inference calls.
2. **Text-To-Speech (TTS):** Integrate ElevenLabs standard voices for AI character outputs.
3. **Speech-To-Text (STT):** Plug in a browser MediaRecorder or a Whisper endpoint to ingest microphone answers automatically. 
4. **Backend State:** Implement user authentication and persistent progress saving.
