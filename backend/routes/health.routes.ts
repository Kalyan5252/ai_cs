import { Router } from 'express';
import { healthCheck } from '../controllers/health.controller';

const router = Router();

router.get('/dbhealth', healthCheck);

export default router;
