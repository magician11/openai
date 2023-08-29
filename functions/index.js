import { HttpsError, onCall } from 'firebase-functions/v2/https';
import { info, error } from 'firebase-functions/logger';
import { createChatCompletion, createImage } from './modules/openai.js';

// end point for chat completions
export const chatResponse = onCall(async ({ data }) => {
  try {
    const response = await createChatCompletion(data.messages);
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

/*
// end point for text completions
export const textCompletion = onCall(async ({ data }) => {
  const response = await createCompletion(data.prompt, data.maxTokens);
  info(`Completion request: ${data.prompt}`, {
    prompt: data.prompt,
    response
  });
  return response;
});

export const chatResponseBeta = onCall(
  {
    timeoutSeconds: 11 * 60
  },
  async ({ data }) => {
    try {
      const response = await createChatCompletionBeta(data.messages);
      info(
        `Chat request (beta): "${
          data.messages[data.messages.length - 1].content
        }"`,
        {
          prompt: data.messages,
          response
        }
      );

      return response;
    } catch (err) {
      error(err);
      throw new HttpsError('internal', 'OpenAI has had an issue (beta)', err);
    }
  }
);
*/
