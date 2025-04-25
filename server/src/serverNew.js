const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const OpenAI = require('openai');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // or gpt-4
      messages: [{ role: 'user', content: message }],
    });

    res.json({
      reply: chatCompletion.choices[0].message.content,
    });
  } catch (error) {
    console.error('OpenAI Error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
