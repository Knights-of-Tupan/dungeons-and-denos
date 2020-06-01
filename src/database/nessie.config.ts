import { ClientPostgreSQL } from 'https://deno.land/x/nessie/clients/ClientPostgreSQL.ts';
import { config } from 'https://deno.land/x/dotenv/mod.ts';

const dbdotenvPath = './database.env';
config({ path: dbdotenvPath, export: true });

const migrationFolder = './src/database/migrations';

const configPg = {
  client: new ClientPostgreSQL(migrationFolder, {
    database: Deno.env.get('POSTGRES_DB'),
    hostname: Deno.env.get('POSTGRES_HOSTNAME'),
    port: Number(Deno.env.get('POSTGRES_PORT')) || 5432,
    user: Deno.env.get('POSTGRES_USER'),
    password: Deno.env.get('POSTGRES_PASSWORD'),
  }),
};

export default configPg;
