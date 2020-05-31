import { Database } from 'https://deno.land/x/denodb/mod.ts';

const db = new Database('postgres', {
  host: 'postgres',
  username: 'postgres',
  password: 'docker',
  database: 'postgres',
  port: 5432,
});

export default db;
