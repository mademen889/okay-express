import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });


const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (_req, res) => res.status(200).json({ ok: true }));

// Load all handlers from ../api/*.js and mount under /api/:fileName
// Each handler expects (req, res).
const apiHandlers = {
  analytics: (await import('../api/analytics.js')).default,
  blog: (await import('../api/blog.js')).default,
  contact: (await import('../api/contact.js')).default,
  orders: (await import('../api/orders.js')).default,
  products: (await import('../api/products.js')).default,
  quotes: (await import('../api/quotes.js')).default,
  shipments: (await import('../api/shipments.js')).default,
  testimonials: (await import('../api/testimonials.js')).default,
};

// Register routes
Object.entries(apiHandlers).forEach(([name, handler]) => {
  app.all(`/api/${name}`, async (req, res) => {
    try {
      await handler(req, res);
    } catch (err) {
      console.error(`API handler error for /api/${name}:`, err);
      res.status(500).json({ error: err?.message || 'Internal Server Error' });
    }
  });
});

const port = Number(process.env.PORT || 3001);
app.listen(port, () => {
  console.log(`[api] listening on http://localhost:${port}`);
});
