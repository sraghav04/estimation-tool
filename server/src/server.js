/* This is the main file of the application. It is the entry point of the application. */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');
// const { OpenAIApi } = require('openai');
const mongoose = require('mongoose');

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

// Replace with your actual connection string and DB name
const uri =
  'mongodb+srv://raghavsingh0419:yBpRFupetI28o4It@estimatetool.ojugytx.mongodb.net/?retryWrites=true&w=majority&appName=EstimateTool';

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ Connected to MongoDB Atlas via Mongoose'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Optional: Define a schema and model
const requirementSchema = new mongoose.Schema({
  tableName: String,
  moduleName: String,
  featureName: String,
  assumptions: String,
  comments: String,
  maxEstimatesHours: Number,
  minEstimatesHours: Number,
  maxEstimatesDays: Number,
  minEstimatesDays: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Test = mongoose.model('Requirements', requirementSchema);

// GET endpoint to fetch all requirements
app.get('/getRequirements', async (req, res) => {
  try {
    const response = await Test.find();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/requirements', async (req, res) => {
  const requirements = req.body;

  if (!Array.isArray(requirements) || requirements.length === 0) {
    return res.status(400).json({ error: 'An array of requirements is required' });
  }

  try {
    const savedRequirements = await Promise.all(
      requirements.map(async requirement => {
        const {
          tableName,
          moduleName,
          featureName,
          assumptions,
          comments,
          maxEstimatesHours,
          minEstimatesHours,
          maxEstimatesDays,
          minEstimatesDays,
        } = requirement;

        if (!moduleName || !featureName) {
          throw new Error('Module name and feature name are required');
        }

        const newRequirement = new Test({
          tableName,
          moduleName,
          featureName,
          assumptions,
          comments,
          maxEstimatesHours,
          minEstimatesHours,
          maxEstimatesDays,
          minEstimatesDays,
        });

        return await newRequirement.save();
      }),
    );

    res.status(201).json(savedRequirements);
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Failed to insert data into MongoDB' });
  }
});

app.post('/chat', async (req, res) => {
  const { message } = req.body;
  // createRequirementDoc();
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
