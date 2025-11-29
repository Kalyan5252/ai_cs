import { jest } from '@jest/globals';
import { mockDb, createChain } from '../__mocks__/db';

jest.mock('../db', () => ({
  db: mockDb,
}));

import { db } from '../db';

test('insert user test', async () => {
  const chain = createChain();
  chain.values.mockResolvedValue({ id: 1 });

  (db.insert as any).mockReturnValue(chain);

  const usersTable: any = {};

  const result = await db.insert(usersTable).values({ name: 'Kalyan' });

  expect(result).toEqual({ id: 1 });

  expect(db.insert).toHaveBeenCalled();
  expect(chain.values).toHaveBeenCalledWith({ name: 'Kalyan' });
});
