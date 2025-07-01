const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const chatRoute = require('./routes/chat');
const imageRoute = require('./routes/image');
const ttsRoute = require('./routes/tts');
const sttRoute = require('./routes/stt');

app.use('/chat', chatRoute);
app.use('/generate-image', imageRoute);
app.use('/text-to-speech', ttsRoute);
app.use('/speech-to-text', sttRoute);

app.get('/', (req, res) => {
  res.send('Code Craft AI Backend Running ✅');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});