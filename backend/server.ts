import app from './app';
import dotenv from 'dotenv';
import { db } from './db';

dotenv.config();

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
