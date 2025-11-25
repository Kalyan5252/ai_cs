import * as pgdb from './imports';
import { problems } from './problemsSchema';
import { users } from './userSchema';

export const submissions = pgdb.pgTable('submissions', {
  id: pgdb.uuid('id').defaultRandom().primaryKey(),
  problemId: pgdb
    .uuid('problem_id')
    .notNull()
    .references(() => problems.id),
  userId: pgdb
    .uuid('user_id')
    .notNull()
    .references(() => users.id),
  language: pgdb.varchar('language', { length: 20 }).notNull(), // C++, Python, JS, Java
  code: pgdb.text('code').notNull(),
  status: pgdb.varchar('status', { length: 30 }).default('Pending'), // Accepted, Wrong Answer, TLE, MLE
  runtimeMs: pgdb.integer('runtime_ms'),
  memoryKb: pgdb.integer('memory_kb'),
  createdAt: pgdb.timestamp('created_at').defaultNow(),
});

export const submissionsRelations = pgdb.relations(submissions, ({ one }) => ({
  user: one(users, {
    fields: [submissions.userId],
    references: [users.id],
  }),
  problem: one(problems, {
    fields: [submissions.problemId],
    references: [problems.id],
  }),
}));
