import { Schema, dbDialects } from 'https://deno.land/x/nessie/qb.ts';

const dialect: dbDialects = 'pg';

export const up = (): string => {
  let query = new Schema(dialect).create('users', (table) => {
    table.id();
    table.string('name', 50).notNullable();
    table.string('email', 50).notNullable().unique();
    table.string('password_hash', 50).notNullable();
    // table.timestamps();
  });

  return query;
};

export const down = (schema: Schema): string => {
  return new Schema(dialect).drop('users');
};
