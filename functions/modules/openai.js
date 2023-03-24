import { Configuration, OpenAIApi } from 'openai';
import functions from 'firebase-functions';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

const createCompletion = async prompt => {
  functions.logger.log(`About to complete the prompt "${prompt}"..."`);
  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      temperature: 0.6,
      max_tokens: 333
    });
    functions.logger.log('completion.data', completion.data);
    return completion.data.choices[0].text;
  } catch (error) {
    functions.logger.error('Error completing', error);
  }
};

const createChatCompletion = async messages => {
  functions.logger.log(
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
      // temperature: 0.6,
    });
    functions.logger.log('completion.data', completion.data);
    return completion.data.choices[0].message;
  } catch (error) {
    functions.logger.error('Error completing', error);
  }
};

const createImage = async prompt => {
  functions.logger.log(`Generating an image for "${prompt}"`);
  const response = await openai.createImage({
    prompt
  });

  functions.logger.log(response);

  return response.data.data[0].url;
};

export { createCompletion, createChatCompletion, createImage };
