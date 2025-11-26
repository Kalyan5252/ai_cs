import { pgTable, varchar, timestamp } from 'drizzle-orm/pg-core';

export const otpTable = pgTable('otp_table', {
  email: varchar('email', { length: 255 }).notNull(),
  otpHash: varchar('otp_hash', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});
