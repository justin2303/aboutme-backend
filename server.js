import express from 'express';
import dotenv from 'dotenv';
import { askOpenAI } from './openai.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid messages format' });
  }

  try {
    const aiResponse = await askOpenAI(messages);
    res.json(aiResponse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong with OpenAI request' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
