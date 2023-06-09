import { onCall } from 'firebase-functions/v2/https';
import { info } from 'firebase-functions/logger';
import {
  createCompletion,
  createChatCompletion,
  createImage
} from './modules/openai.js';

// end point for text completions
export const textCompletion = onCall(async ({ data }) => {
  const response = await createCompletion(data.prompt);
  info(`Completion request: ${data.prompt}`, {
    prompt: data.prompt,
    response
  });
  return response;
});

// end point for chat completions
export const chatResponse = onCall(async ({ data }) => {
  const response = await createChatCompletion(data.messages);
  info(`Chat request: ${data.messages[data.messages.length - 1]}`, {
    prompt: data.messages,
    response
  });

  return response;
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
