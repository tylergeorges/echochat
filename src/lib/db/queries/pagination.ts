import type { SQL } from 'drizzle-orm';
import type { PgColumn, PgSelect } from 'drizzle-orm/pg-core';

export const withPagination = <T extends PgSelect>(
  qb: T,
  orderByColumn: PgColumn | SQL | SQL.Aliased,
  page = 1,
  pageSize = 30
) =>
  qb
    .orderBy(orderByColumn)
    .limit(pageSize)
    .offset((page - 1) * pageSize);
