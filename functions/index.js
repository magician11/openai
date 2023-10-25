import { HttpsError, onCall } from 'firebase-functions/v2/https';
import { info, error } from 'firebase-functions/logger';
import { createChatCompletion, createImage } from './modules/openai.js';

// end point for chat completions
export const chatResponse = onCall(
  {
    timeoutSeconds: 333
  },
  async ({ data, auth }) => {
    try {
      const response = await createChatCompletion(data);
      info(
        `${auth.token.email}: (chat) "${
          data.messages[data.messages.length - 1].content
        }"`,
        {
          prompt: data.messages,
          response,
          model: data.model,
          user: {
            id: auth.uid,
            email: auth.token.email
          }
        }
      );

      return response;
    } catch (err) {
      error(err);
      throw new HttpsError('internal', 'OpenAI has had an issue', err);
    }
  }
);

// end point for image generations
export const generateImage = onCall(async ({ data, auth }) => {
  const imageUrl = await createImage(data.prompt);
  info(`${auth.token.email}: (image) "${data.prompt}"`, {
    prompt: data.prompt,
    imageUrl,
    user: {
      id: auth.uid,
      email: auth.token.email
    }
  });

  return imageUrl;
});
