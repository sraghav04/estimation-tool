/* This is the main file of the application. It is the entry point of the application. */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');
// const { OpenAIApi } = require('openai');

const { router } = require('./routes');
const { httpLogger, errorHandler } = require('./middleware');
const { errorDictionary } = require('./config/error.config');
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
// remove powered by header to prevent exposing the technology used (Express in this case)
app.disable('x-powered-by');
app.use(httpLogger);
app.use('/api/ms-trigger', router);
const axios = require('axios');
dotenv.config();

// const openai = new OpenAIApi({
//   apiKey: process.env.OPENAI_API_KEY,
// });

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('OpenAI Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to connect to OpenAI' });
  }
});

/* This is the error handler. It is the last middleware in the stack. It will catch any error that is not caught by the
other middlewares. */
app.use((err, req, res, next) => {
  errorHandler(err, req, res, next, errorDictionary);
});

module.exports = app;
