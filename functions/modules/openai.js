import { Configuration, OpenAIApi } from 'openai';
import { info, error } from 'firebase-functions/logger';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

// https://platform.openai.com/docs/api-reference/completions/create
const createCompletion = async prompt => {
  info(`About to complete the prompt "${prompt}"..."`);
  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 333
    });
    info('completion.data', completion.data);
    return completion.data.choices[0].text;
  } catch (err) {
    error('Error completing prompt', err);
    throw new Error(err.message);
  }
};

// https://platform.openai.com/docs/api-reference/chat/create
const createChatCompletion = async messages => {
  info(
    `About to complete for the messages "${JSON.stringify(
      messages,
      null,
      2
    )}"..."`
  );

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages
    });
    info('chat completion.data', completion.data);

    return completion.data.choices[0].message;
  } catch (err) {
    error('Error with chat completion', err);
    throw new Error(err.message);
  }
};

// https://platform.openai.com/docs/api-reference/images/create
const createImage = async prompt => {
  info(`Generating an image for "${prompt}"`);
  const response = await openai.createImage({
    prompt
  });

  info(response);

  return response.data.data[0].url;
};

export { createCompletion, createChatCompletion, createImage };
