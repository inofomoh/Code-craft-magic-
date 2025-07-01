const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Configuration, OpenAIApi } = require('openai');
const fs = require('fs');

const upload = multer({ dest: 'uploads/' });
const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(config);

router.post('/', upload.single('file'), async (req, res) => {
  const filePath = req.file.path;

  try {
    const transcription = await openai.createTranscription(
      fs.createReadStream(filePath),
      "whisper-1"
    );
    res.json({ transcription: transcription.data.text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    fs.unlinkSync(filePath);
  }
});

module.exports = router;