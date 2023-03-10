import functions from 'firebase-functions';
import { createCompletion } from './modules/openai.js';

export const personaResponse = functions.https.onCall(async (data, context) => {
  functions.logger.log('persona request', {
    ip: context.rawRequest.ip,
    prompt: data.prompt
  });
  const response = await createCompletion(data.prompt);
  return response;
});
