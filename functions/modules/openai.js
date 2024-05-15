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

  return {
    role: 'assistant',
    content: [{ type: 'text', text: completion.choices[0].message.content }]
  };
};

// https://platform.openai.com/docs/api-reference/images/create
const createImage = async ({ prompt, size }) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
  const response = await openai.images.generate({
    prompt,
    size,
    quality: 'hd',
    model: 'dall-e-3'
  });

  return response.data[0].url;
};

// https://platform.openai.com/docs/guides/text-to-speech?lang=node
const getSpeech = async ({ text: input, voice = 'nova' }) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
  const speech = await openai.audio.speech.create({
    model: 'tts-1',
    voice,
    input
  });

  const buffer = Buffer.from(await speech.arrayBuffer());
  const base64 = buffer.toString('base64');

  return base64;
};

export { createChatCompletion, createImage, getSpeech };
