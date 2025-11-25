import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Routes
import userRoutes from './routes/user.routes';
import problemRoutes from './routes/problems.routes';

// Middlewares
app.use(cors());
app.use(express.json());

// Health check route
app.use('/api/users', userRoutes);
app.use('/api/problems', problemRoutes);

app.get('/', (req, res) => {
  res.json({ status: 'API running' });
});

export default app;
