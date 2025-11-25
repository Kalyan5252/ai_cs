import * as pgdb from './imports';
import { problems } from './problemsSchema';

export const testcases = pgdb.pgTable('testcases', {
  id: pgdb.serial('id').primaryKey(),
  problemId: pgdb
    .uuid('problem_id')
    .notNull()
    .references(() => problems.id),
  input: pgdb.text('input').notNull(),
  output: pgdb.text('output').notNull(),
  isPublic: pgdb.boolean('is_public').default(false),
});
