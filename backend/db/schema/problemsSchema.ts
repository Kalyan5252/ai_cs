import * as db from './imports';
import { testcases } from './testcaseSchema';
import { submissions } from './submissionsSchema';

export const difficultyEnum = db.pgEnum('difficulty_enum', [
  'easy',
  'medium',
  'hard',
]);

export const problems = db.pgTable('problems', {
  id: db.uuid('id').defaultRandom().primaryKey(),
  title: db.varchar('title', { length: 255 }).notNull(),
  slug: db.varchar('slug', { length: 255 }).notNull().unique(),
  difficulty: difficultyEnum('difficulty').notNull(), // <--- ENUM FIELD
  description: db.text('description').notNull(),
  createdAt: db.timestamp('created_at').defaultNow(),
});

export const problemsRelations = db.relations(problems, ({ many }) => ({
  tags: many(problemTags),
  testcases: many(testcases),
  submissions: many(submissions),
}));

export const tags = db.pgTable('tags', {
  id: db.serial('id').primaryKey(),
  name: db.varchar('name', { length: 50 }).notNull().unique(),
});

export const problemTags = db.pgTable(
  'problem_tags',
  {
    problemId: db.uuid('problem_id').references(() => problems.id),
    tagId: db.integer('tag_id').references(() => tags.id),
  },
  (t) => ({
    pk: db.primaryKey(t.problemId, t.tagId),
  })
);
