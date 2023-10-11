import { HttpsError, onCall } from 'firebase-functions/v2/https';
import { info, error } from 'firebase-functions/logger';
import { createChatCompletion, createImage } from './modules/openai.js';

// end point for chat completions
export const chatResponse = onCall(async ({ data }) => {
  try {
    const response = await createChatCompletion(
      data.messages,
      'gpt-4-0613'
      // 'gpt-3.5-turbo-16k'
    ); // for the fancier model: 'gpt-4-0613',
    info(`Chat request: "${data.messages[data.messages.length - 1].content}"`, {
      prompt: data.messages,
      response
    });

    return response;
  } catch (err) {
    error(err);
    throw new HttpsError('internal', 'OpenAI has had an issue', err);
  }
});

// end point for image generations
export const generateImage = onCall(async ({ data }) => {
  const imageUrl = await createImage(data.prompt);
  info(`Generate image: ${data.prompt}`, {
    prompt: data.prompt,
    imageUrl
  });

  return imageUrl;
});
