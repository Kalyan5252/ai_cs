import { Request, Response } from 'express';
import { db } from '../db';
import { sql } from 'drizzle-orm';

export const healthCheck = async (req: Request, res: Response) => {
  try {
    await db.execute(sql`SELECT 1`);
    res.json({
      status: 'ok',
      db: 'connected',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      db: 'disconnected',
      error: (error as Error).message,
    });
  }
};
