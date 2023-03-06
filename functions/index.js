import functions from 'firebase-functions';
import { createCompletion } from './modules/openai.js';

export const personaResponse = functions.https.onCall(async (data, context) => {
  const { persona, prompt } = data;
  const response = await createCompletion(persona, prompt);
  return response;
});
