import axios from 'axios';

export async function askOpenAI(messages) {
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
        model: 'gpt-3.5-turbo',
      messages: messages,
    },
    {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      }
    }
  );

  return response.data;
}
