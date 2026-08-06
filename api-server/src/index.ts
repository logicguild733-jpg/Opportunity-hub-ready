import express, { Request, Response, NextFunction } from 'express';
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
app.use((req: any, res: Response, next: NextFunction) => {
  req.user = {
    id: 'test-user-1',
    email: 'logicguild733@gmail.com',
    skills: ['teacher'],
    plan: 'basic'
  };
  next();
});

// ✅ Test route (IMPORTANT)
app.get('/test', (req: Request, res: Response) => {
  res.send('Backend working ✅');
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

// Routes
app.use('/api/leads', leadsRouter);

// Default route
app.get('/', (req: Request, res: Response) => {
  res.send('API Server running 🚀');
});

// 🔥 FIX IS HERE (VERY IMPORTANT)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
