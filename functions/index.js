import functions from 'firebase-functions';
import { createCompletion } from './modules/openai.js';

export const personaResponse = functions.https.onCall(async (data, context) => {
  const response = await createCompletion(data.prompt);
  functions.logger.log('persona request', {
    ip: context.rawRequest.ip,
    prompt: data.prompt,
    response
  });
  return response;
});
