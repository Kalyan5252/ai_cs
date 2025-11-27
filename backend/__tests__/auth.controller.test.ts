// import {
//   sendOtpController,
//   verifyOtpController,
// } from '../controllers/auth.controller';
// import { db } from '../db';
// import nodemailer from 'nodemailer';
// import crypto from 'crypto';
// import { Request, Response } from 'express';

// jest.mock('../db');
// jest.mock('nodemailer');
// jest.mock('crypto');

// describe('Auth Controller', () => {
//   let req: Partial<Request>;
//   let res: Partial<Response>;

//   beforeEach(() => {
//     req = { body: {} };
//     res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };
//     // jest.mock('nodemailer', () => ({
//     //   createTransport: jest.fn().mockReturnValue({
//     //     sendMail: jest.fn().mockResolvedValue({ messageId: 'mocked-id' }),
//     //   }),
//     // }));
//   });

//   const mockQueryBuilder = (): any => ({
//     findFirst: jest.fn(),
//     findMany: jest.fn(),
//     insert: jest.fn(),
//     update: jest.fn(),
//     delete: jest.fn(),
//     where: jest.fn(),
//     returning: jest.fn(),
//   });

//   describe('sendOtpController', () => {
//     // it('should return 400 if email is missing', async () => {
//     //   await sendOtpController(req as Request, res as Response);
//     //   expect(res.status).toHaveBeenCalledWith(400);
//     //   expect(res.json).toHaveBeenCalledWith({
//     //     success: false,
//     //     error: 'Email required',
//     //   });
//     // });

//     it('should insert OTP into the database and send an email', async () => {
//       req.body.email = 'test@example.com';
//       const mockInsert = jest.fn();
//       db.insert = jest.fn().mockReturnValue({ values: mockInsert });
//       const mockSendMail = jest.fn().mockResolvedValueOnce(true);
//       const sendMailMock = jest.fn().mockResolvedValue({ messageId: '123' });

//       (nodemailer.createTransport as jest.Mock).mockReturnValue({
//         sendMail: sendMailMock,
//       });
//       const mockHash = jest.fn().mockReturnValue('hashedOtp');
//       crypto.createHash = jest.fn().mockReturnValue({
//         update: jest.fn().mockReturnValue({ digest: mockHash }),
//       });

//       process.env.EMAIL_SERVER_USER = 'test@example.com';

//       await sendOtpController(req as Request, res as Response);

//       expect(mockInsert).toHaveBeenCalledWith({
//         email: 'test@example.com',
//         otpHash: 'hashedOtp',
//       });
//       expect(mockSendMail).toHaveBeenCalledWith({
//         from: 'test@example.com',
//         to: 'test@example.com',
//         subject: 'Your OTP Code',
//         text: expect.stringContaining('Your OTP is'),
//       });
//       expect(res.json).toHaveBeenCalledWith({
//         success: true,
//         message: 'OTP sent',
//       });
//     });
//   });

//   //   describe('verifyOtpController', () => {
//   //     it('should return 400 if email or OTP is missing', async () => {
//   //       await verifyOtpController(req as Request, res as Response);
//   //       expect(res.status).toHaveBeenCalledWith(400);
//   //       expect(res.json).toHaveBeenCalledWith({ success: false });
//   //     });

//   //     it('should return 400 if OTP is invalid', async () => {
//   //       req.body = { email: 'test@example.com', otp: '123456' };
//   //       db.query = {
//   //         otpTable: mockQueryBuilder(),
//   //         problems: mockQueryBuilder(),
//   //         users: mockQueryBuilder(),
//   //         testcases: mockQueryBuilder(),
//   //         submissions: mockQueryBuilder(),
//   //       };
//   //       db.query.otpTable.findFirst = jest.fn().mockResolvedValue(null);

//   //       await verifyOtpController(req as Request, res as Response);

//   //       expect(res.status).toHaveBeenCalledWith(400);
//   //       expect(res.json).toHaveBeenCalledWith({
//   //         success: false,
//   //         error: 'Invalid OTP',
//   //       });
//   //     });

//   //     it('should find or create a user in the database', async () => {
//   //       req.body = { email: 'test@example.com', otp: '123456' };
//   //       const mockHash = jest.fn().mockReturnValue('hashedOtp');
//   //       crypto.createHash = jest.fn().mockReturnValue({
//   //         update: jest.fn().mockReturnValue({ digest: mockHash }),
//   //       });
//   //       db.query = {
//   //         otpTable: mockQueryBuilder(),
//   //         problems: mockQueryBuilder(),
//   //         users: mockQueryBuilder(),
//   //         testcases: mockQueryBuilder(),
//   //         submissions: mockQueryBuilder(),
//   //       };
//   //       db.query.otpTable.findFirst = jest
//   //         .fn()
//   //         .mockResolvedValue({ otpHash: 'hashedOtp' });
//   //       db.query.users.findFirst = jest.fn().mockResolvedValue(null);
//   //       const mockInsert = jest
//   //         .fn()
//   //         .mockResolvedValue([
//   //           { email: 'test@example.com', username: 'test', password: '' },
//   //         ]);
//   //       db.insert = jest.fn().mockReturnValue({ values: mockInsert });

//   //       await verifyOtpController(req as Request, res as Response);

//   //       expect(db.query.otpTable.findFirst).toHaveBeenCalled();
//   //       expect(mockInsert).toHaveBeenCalledWith({
//   //         email: 'test@example.com',
//   //         username: 'test',
//   //         password: '',
//   //       });
//   //       expect(res.json).toHaveBeenCalledWith({
//   //         success: true,
//   //         user: { email: 'test@example.com', username: 'test', password: '' },
//   //       });
//   //     });
//   //   });
// });

import { sendOtpController } from '../controllers/auth.controller';
import nodemailer from 'nodemailer';
import { db } from '../db';

// Mock nodemailer
jest.mock('nodemailer');

const valuesMock = jest.fn().mockResolvedValue({});
(db.insert as jest.Mock).mockReturnValue({
  values: valuesMock,
});

const sendMailMock = jest.fn().mockResolvedValue({ messageId: 'mocked-id' });
(nodemailer.createTransport as jest.Mock).mockReturnValue({
  sendMail: sendMailMock,
});

// beforeEach(() => {
//   const sendMailMock = jest.fn().mockResolvedValue({ messageId: 'mocked-id' });
//   (nodemailer.createTransport as jest.Mock).mockReturnValue({
//     sendMail: sendMailMock,
//   });
// });

describe('sendOtpController', () => {
  it('should insert OTP into DB and send email', async () => {
    // --- Mock DB (correct drizzle chain) ---

    // Mock req/res
    const req: any = { body: { email: 'test@example.com' } };
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await sendOtpController(req, res);

    // Assertions
    expect(db.insert).toHaveBeenCalled(); // Insert called
    expect(valuesMock).toHaveBeenCalled(); // Values called
    expect(sendMailMock).toHaveBeenCalled(); // Email sent

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'OTP sent',
    });
  });
});
