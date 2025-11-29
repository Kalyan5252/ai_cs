import { jest } from '@jest/globals';

export const createChain = () => {
  const fn: any = jest.fn();
  fn.values = jest.fn(() => fn);
  fn.returning = jest.fn(() => fn);
  return fn;
};

export const mockDb = {
  select: createChain(),
  insert: jest.fn(() => createChain()),
  update: jest.fn(() => createChain()),
  delete: jest.fn(() => createChain()),
  query: new Proxy(
    {},
    {
      get: () => ({
        findFirst: jest.fn(),
        findMany: jest.fn(),
      }),
    }
  ),
};

export const mockQueryBuilder = (): any => ({
  findFirst: jest.fn(() => createChain()),
  findMany: jest.fn(() => createChain()),
  insert: jest.fn(() => createChain()),
  update: jest.fn(() => createChain()),
  delete: jest.fn(() => createChain()),
  where: jest.fn(() => createChain()),
  returning: jest.fn(() => createChain()),
});
