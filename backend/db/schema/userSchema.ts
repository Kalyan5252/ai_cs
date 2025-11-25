import * as pgdb from './imports';
import { problems } from './problemsSchema';

export const users = pgdb.pgTable('users', {
  id: pgdb.uuid('id').defaultRandom().primaryKey(),
  username: pgdb.varchar('username', { length: 50 }).notNull().unique(),
  email: pgdb.varchar('email', { length: 255 }).notNull().unique(),
  password: pgdb.varchar('password', { length: 255 }).notNull(),
  role: pgdb.varchar('role', { length: 20 }).default('user'), // user, admin
  createdAt: pgdb.timestamp('created_at').defaultNow(),
});

// export const usersRelations = db.relations(users, ({ many }) => ({
//     submissions: many(submissions),
//     discussionPosts: many(discussionPosts),
//     comments: many(discussionComments),
//     likes: many(discussionLikes),
//   }));

export const userProgress = pgdb.pgTable('user_progress', {
  userId: pgdb.uuid('user_id').references(() => users.id),
  problemId: pgdb.uuid('problem_id').references(() => problems.id),
  attempts: pgdb.integer('attempts').default(0),
  solved: pgdb.boolean('solved').default(false),
  lastAttemptAt: pgdb.timestamp('last_attempt_at').defaultNow(),
});
