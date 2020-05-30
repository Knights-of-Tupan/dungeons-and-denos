import { Database } from 'https://deno.land/x/denodb/mod.ts';

const db = new Database('postgres', {
    host: 'postgres-server',
    username: 'postgres',
    password: 'Postgres2018!',
    database: 'postgres',
    port: 5432,
});

export default db;

