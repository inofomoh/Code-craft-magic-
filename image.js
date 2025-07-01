const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');

const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(config);

router.post('/', async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "512x512"
    });
    res.json({ image_url: response.data.data[0].url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;