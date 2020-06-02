import { Migration } from 'https://deno.land/x/nessie/mod.ts';
import { Schema, dbDialects } from 'https://deno.land/x/nessie/qb.ts';

const dialect: dbDialects = 'pg';

export const up: Migration = () => {
  const queryArray: string[] = new Schema(dialect).create('users', (table) => {
    table.id();
    table.string('name', 50).notNullable();
    table.string('email', 50).notNullable().unique();
    table.string('password_hash', 50).notNullable();
    table.timestamps();
  });

  return queryArray;
};

export const down: Migration = () => {
  return new Schema(dialect).drop('users');
};
