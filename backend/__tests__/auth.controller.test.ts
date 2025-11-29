import { mockDb, mockQueryBuilder } from '../__mocks__/db';

import {
  sendOtpController,
  verifyOtpController,
} from '../controllers/auth.controller';
import { db } from '../db';
import crypto from 'crypto';
import { Request, Response } from 'express';

jest.spyOn(crypto, 'createHash').mockReturnValue({
  update: jest.fn().mockReturnThis(),
  digest: jest.fn().mockReturnValue('mocked_hash_value'),
} as any);

jest.mock('../db', () => ({
  db: mockDb,
}));

jest.mock('../utils/mailer', () => {
  const sendMailMock = jest.fn().mockResolvedValue({ messageId: 'mocked' });

  return {
    __esModule: true,
    default: {
      sendMail: sendMailMock,
    },
    __sendMailMock: sendMailMock,
  };
});

const mailer = require('../utils/mailer');
const sendMailMock = mailer.__sendMailMock;

describe('Auth Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe('sendOtpController', () => {
    it('should return 400 if email is missing', async () => {
      await sendOtpController(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: 'Email required',
      });
    });

    it('should insert OTP into the database and send an email', async () => {
      req.body.email = 'test@example.com';
      const mockInsert = jest.fn().mockResolvedValue({});
      (db.insert as jest.Mock).mockReturnValue({
        values: mockInsert,
      });

      const sendMailMock = jest.fn().mockResolvedValue({ messageId: '123' });
      (mailer.default.sendMail as jest.Mock).mockImplementation(sendMailMock);

      process.env.EMAIL_SERVER_USER = 'test@example.com';

      await sendOtpController(req as Request, res as Response);

      expect(mockInsert).toHaveBeenCalledWith({
        email: 'test@example.com',
        otpHash: 'mocked_hash_value',
      });
      expect(sendMailMock).toHaveBeenCalledWith({
        from: 'test@example.com',
        to: 'test@example.com',
        subject: 'Your OTP Code',
        text: expect.stringContaining('Your OTP is'),
      });
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'OTP sent',
      });
    });
  });

  describe('verifyOtpController', () => {
    beforeEach(() => {
      // jest.clearAllMocks();
      // jest.resetAllMocks();
      db.query = {
        otpTable: mockQueryBuilder(),
        problems: mockQueryBuilder(),
        users: mockQueryBuilder(),
        testcases: mockQueryBuilder(),
        submissions: mockQueryBuilder(),
      };
      req = { body: {} };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });

    it('should return 400 if email or OTP is missing', async () => {
      await verifyOtpController(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ success: false });
    });

    it('should return 400 if OTP is invalid', async () => {
      req.body = { email: 'test@example.com', otp: '123456' };

      db.query.otpTable.findFirst = jest.fn().mockResolvedValue(null);

      await verifyOtpController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: 'Invalid OTP',
      });
    });

    it('should find or create a user in the database', async () => {
      const returnedUser = {
        email: 'test@example.com',
        username: 'test',
        password: '',
      };
      req.body = { email: 'test@example.com', otp: '123456' };

      db.query.otpTable.findFirst = jest
        .fn()
        .mockResolvedValue({ otpHash: 'mocked_hash_value' });
      db.query.users.findFirst = jest.fn().mockResolvedValue(null);

      const returningMock = jest.fn().mockResolvedValue([returnedUser]);

      const valuesMock = jest.fn().mockReturnValue({
        returning: returningMock,
      });
      db.insert = jest.fn().mockReturnValue({ values: valuesMock });

      await verifyOtpController(req as Request, res as Response);

      expect(db.query.otpTable.findFirst).toHaveBeenCalled();
      expect(valuesMock).toHaveBeenCalledWith({
        ...returnedUser,
      });
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        user: { email: 'test@example.com', username: 'test', password: '' },
      });
    });
  });
});

// describe('sendOtpController', () => {
//   it('should insert OTP into DB and send email', async () => {
//     const req: any = { body: { email: 'test@example.com' } };
//     const res: any = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };

//     const valuesMock = jest.fn().mockResolvedValue({});
// (db.insert as jest.Mock).mockReturnValue({
//   values: valuesMock,
// });

//     await sendOtpController(req, res);

//     // Assertions
//     expect(db.insert).toHaveBeenCalled(); // Insert called
//     expect(valuesMock).toHaveBeenCalled(); // Values called
//     expect(sendMailMock).toHaveBeenCalled(); // Email sent

//     expect(res.json).toHaveBeenCalledWith({
//       success: true,
//       message: 'OTP sent',
//     });
//   });
// });
