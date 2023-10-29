import OpenAI from 'openai';

// https://platform.openai.com/docs/api-reference/chat/create
const createChatCompletion = async ({ messages, model = 'gpt-3.5-turbo' }) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
  const completion = await openai.chat.completions.create({
    model,
    messages
  });

  return completion.choices[0].message;
};

// https://platform.openai.com/docs/api-reference/images/create
const createImage = async prompt => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
  const response = await openai.images.generate({
    prompt
  });

  return response.data[0].url;
};

export { createChatCompletion, createImage };
