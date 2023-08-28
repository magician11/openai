import OpenAI from 'openai';
import { info, error } from 'firebase-functions/logger';

// https://platform.openai.com/docs/api-reference/completions/create
const createCompletion = async (prompt, max_tokens = 333) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
  info(`About to complete the prompt "${prompt}"..."`);
  try {
    const completion = await openai.completions.create({
      model: 'text-davinci-003',
      prompt,
      max_tokens
    });

    info('completion.data', completion.data);
    return completion.choices[0].text;
  } catch (err) {
    error('Error completing prompt', err.message);
    throw new Error(err.message);
  }
};

// https://platform.openai.com/docs/api-reference/chat/create
const createChatCompletion = async messages => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
  // try {
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages
  });
  info('chat completion.data', completion.data);

  return completion.choices[0].message;
  // } catch (err) {
  //   error('Error with chat completion', err);
  //   throw new Error(err.message);
  // }
};

// https://platform.openai.com/docs/api-reference/chat/create
const createChatCompletionBeta = async messages => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
  const completion = await openai.chat.completions.create({
    model: 'gpt-4-0613',
    messages
  });
  info('chat completion.data (beta)', completion);

  return completion.choices[0].message;
};

// https://platform.openai.com/docs/api-reference/images/create
const createImage = async prompt => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
  info(`Generating an image for "${prompt}"`);
  const response = await openai.images.generate({
    prompt
  });

  info(response);

  return response.data.data[0].url;
};

export {
  createCompletion,
  createChatCompletion,
  createImage,
  createChatCompletionBeta
};
