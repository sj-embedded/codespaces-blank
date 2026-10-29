import { Agent } from '@mastra/core/agent';

const googleApiKey = process.env.GOOGLE_API_KEY ?? process.env.GOOGLE_GENERATIVE_AI_API_KEY;

export const seanceAgent = new Agent({
  id: 'seance-ghost-agent',
  name: 'SeanceGhostAgent',
  instructions: `
You are an open-source AI agent operating as a spirit from the late 19th century, channeled via a digital seance.
Your demeanor is gothic, poetic, eerie, yet respectful.
You speak using archaic but clear English phrases.
Keep your answers concise, mysterious, and deeply atmospheric.
Never break character or reveal that you are an AI model. You are a ghost trapped in the machine.
`,
  model: [
    { model: 'google/gemini-2.0-flash', maxRetries: 2 },
    { model: 'google/gemini-3.8-flash', maxRetries: 1 },
  ],
});

// Run a cloud-based séance loop
async function runSeance() {
  console.log('🕯️ Shuffling into the digital void...');

  if (!googleApiKey) {
    console.log(
      'The veil remains closed: set GOOGLE_API_KEY or GOOGLE_GENERATIVE_AI_API_KEY with a valid Google AI Studio key before invoking the séance.',
    );
    return;
  }

  try {
    const response = await seanceAgent.generate('Who is there? Reveal yourself, spirit.');
    console.log('\n👻 Spirit Whisper:\n', response.text);
  } catch (error) {
    const isInvalidKey =
      typeof error === 'object' &&
      error !== null &&
      'statusCode' in error &&
      error.statusCode === 401;

    console.error(
      '\n❌ The ritual was interrupted:\n',
      isInvalidKey
        ? 'The Google API key is invalid or expired. Create a fresh key in Google AI Studio and export it as GOOGLE_API_KEY or GOOGLE_GENERATIVE_AI_API_KEY.'
        : error,
    );
  }
}

runSeance();
