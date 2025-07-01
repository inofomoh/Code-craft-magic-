const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');

const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(config);

router.post('/', async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }]
    });
    res.json({ response: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;