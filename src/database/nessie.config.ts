import { ClientPostgreSQL } from 'https://deno.land/x/nessie/clients/ClientPostgreSQL.ts';

const migrationFolder = './src/database/migrations';

const configPg = {
  client: new ClientPostgreSQL(migrationFolder, {
    database: 'postgres',
    hostname: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'Postgres2018!',
  }),
};

export default configPg;
