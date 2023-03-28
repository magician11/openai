import functions from 'firebase-functions';
import {
  createCompletion,
  createChatCompletion,
  createImage
} from './modules/openai.js';

export const textCompletion = functions.https.onCall(async (data, context) => {
  const response = await createCompletion(data.prompt);
  functions.logger.log('completion request', {
    ip: context.rawRequest.ip,
    prompt: data.prompt,
    response
  });
  return response;
});

export const chatResponse = functions.https.onCall(async (data, context) => {
  const response = await createChatCompletion(data.messages);
  functions.logger.log('chat request', {
    ip: context.rawRequest.ip,
    prompt: data.messages,
    response
  });

  functions.logger.log(
    data.messages[data.messages.length - 1],
    response,
    context.rawRequest.ip,
    'Q&A'
  );
  return response;
});

export const generateImage = functions.https.onCall(async (data, context) => {
  const imageUrl = await createImage(data.prompt);
  functions.logger.log('chat request', {
    ip: context.rawRequest.ip,
    prompt: data.prompt,
    imageUrl
  });

  return imageUrl;
});
