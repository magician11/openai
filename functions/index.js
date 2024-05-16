import { HttpsError, onCall } from 'firebase-functions/v2/https';
import { info, error } from 'firebase-functions/logger';
import {
  createChatCompletion,
  createImage,
  getSpeech
} from './modules/openai.js';

// end point for chat completions
export const chatResponse = onCall(
  {
    timeoutSeconds: 333
  },
  async ({ data, auth }) => {
    try {
      info(data);
      const response = await createChatCompletion(data);
      const email = auth ? auth.token.email : 'anonymous';
      info(
        `${email}: (chat) ${data.messages[data.messages.length - 1].content}`,
        {
          prompt: data.messages,
          response,
          model: data.model,
          user: {
            id: auth?.uid,
            email
          }
        }
      );

      return response;
    } catch (err) {
      error(err);
      throw new HttpsError(
        'internal',
        'OpenAI has wandered off for a zen retreat. It might return… eventually. 🧘‍♂️✨',
        err
      );
    }
  }
);

// end point for image generations
export const generateImage = onCall(async ({ data, auth }) => {
  try {
    const imageUrl = await createImage(data);
    info(`${auth.token.email}: (image) "${data.prompt}"`, {
      prompt: data.prompt,
      imageUrl,
      user: {
        id: auth.uid,
        email: auth.token.email
      }
    });

    return imageUrl;
  } catch (err) {
    error(`${auth.token.email}: (image) "${data.prompt}"`, {
      prompt: data.prompt,
      error: err,
      user: {
        id: auth.uid,
        email: auth.token.email
      }
    });
    throw new HttpsError('internal', 'OpenAI image generation error', err);
  }
});

// end point for speech generations
export const textToSpeech = onCall(async ({ data }) => {
  try {
    const speech = await getSpeech(data);
    info(`(tts) "${data.text}"`, {
      text: data.text,
      speech
    });

    return speech;
  } catch (err) {
    error(`(tts) "${data.text}"`, {
      error: err
    });
    throw new HttpsError('internal', 'OpenAI speech generation error', err);
  }
});
