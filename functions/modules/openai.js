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
    prompt,
    model: 'dall-e-3'
  });

  return response.data[0].url;
};

// https://platform.openai.com/docs/guides/text-to-speech?lang=node
const getSpeech = async input => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
  const speech = await openai.audio.speech.create({
    model: 'tts-1',
    voice: 'nova',
    input
  });

  return speech;
};

export { createChatCompletion, createImage, getSpeech };
