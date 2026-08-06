import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import leadsRouter from './routes/leads';
import { fetchRSSLeads } from './services/rssLeads';

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Dummy auth middleware
app.use((req: any, res, next) => {
  req.user = {
    id: 'test-user-1',
    email: 'logicguild733@gmail.com',
    skills: ['teacher'],
    plan: 'basic'
  };
  next();
});

// ✅ TEMP TEST ROUTE (IMPORTANT — to confirm working)
app.get('/api/leads', (req, res) => {
  res.json([{ title: 'Plan A working 🚀' }]);
});

// Run RSS import when server starts
async function startImporters() {
  try {
    console.log('Starting RSS importer...');
    await fetchRSSLeads();
    console.log('RSS importer finished');
  } catch (err) {
    console.error('RSS importer failed:', err);
  }
}

startImporters();

// Run every hour
setInterval(async () => {
  try {
    console.log('Running scheduled RSS import...');
    await fetchRSSLeads();
  } catch (err) {
    console.error(err);
  }
}, 60 * 60 * 1000);

// (Keep router too, but test route will override for now)
app.use('/api/leads', leadsRouter);

// Default route
app.get('/', (req, res) => res.send('API Server running'));

// ❗ FIXED STRING (this was broken before)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
