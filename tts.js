const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');

const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(config);

router.post('/', async (req, res) => {
  const { text, voice } = req.body;
  try {
    const response = await openai.createSpeech({
      input: text,
      voice: voice || "nova",
      model: "tts-1",
      response_format: "mp3"
    }, { responseType: 'arraybuffer' });

    res.set('Content-Type', 'audio/mpeg');
    res.send(Buffer.from(response.data));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;