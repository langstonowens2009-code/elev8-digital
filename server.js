import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import handler from './api/send.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8000;

// Parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend assets
app.use(express.static(__dirname));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    resendConfigured: Boolean(process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 're_your_resend_api_key_here')
  });
});

// Resend Form Submission Endpoint
app.post('/api/send', async (req, res) => {
  return handler(req, res);
});

// Fallback to index.html for unmatched routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 ELEV8 DIGITAL server running at http://localhost:${PORT}`);
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.includes('your_resend_api_key')) {
    console.warn(`⚠️ Warning: RESEND_API_KEY is not set yet in .env! Get one at https://resend.com/api-keys`);
  } else {
    console.log(`✅ Resend API Key is configured and ready to send to lowensweb@gmail.com.`);
  }
});
