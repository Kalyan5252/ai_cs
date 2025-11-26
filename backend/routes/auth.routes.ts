import { Router } from 'express';
import {
  sendOtpController,
  verifyOtpController,
} from '../controllers/auth.controller';

const router = Router();

router.post('/send-otp', sendOtpController);
router.post('/verify-otp', verifyOtpController);

export default router;
