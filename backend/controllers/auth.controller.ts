import { Request, Response } from 'express';
import { db } from '../db';
import { users, otpTable } from '../db/schema/index';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';
import transporter from '../utils/mailer';

// Generate secure OTP
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export const sendOtpController = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email)
      return res.status(400).json({ success: false, error: 'Email required' });

    const otp = generateOtp();
    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');

    await db.insert(otpTable).values({ email, otpHash: hashedOtp });

    await transporter.sendMail({
      from: process.env.EMAIL_SERVER_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP is ${otp}`,
    });

    return res.json({ success: true, message: 'OTP sent' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};

export const verifyOtpController = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ success: false });

    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');

    const record = await db.query.otpTable.findFirst({
      where: (t, { eq }) => eq(t.email, email),
    });

    if (!record || record.otpHash !== hashedOtp) {
      return res.status(400).json({ success: false, error: 'Invalid OTP' });
    }

    // find or create user
    let user = await db.query.users.findFirst({
      where: (u, { eq }) => eq(u.email, email),
    });

    if (!user) {
      const inserted = await db
        .insert(users)
        .values({ email, username: email.split('@')[0], password: '' })
        .returning();
      user = inserted[0];
    }

    return res.json({ success: true, user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
};
