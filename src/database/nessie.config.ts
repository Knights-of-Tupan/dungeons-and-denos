import { ClientPostgreSQL, nessieConfig } from 'https://deno.land/x/nessie/mod.ts';
import { config } from 'https://deno.land/x/dotenv/mod.ts';

const dbdotenvPath: string = Deno.env.get('DENO_ENV') || './.env';
console.log(config({ path: dbdotenvPath, export: true }));

const migrationFolder = './src/database/migrations';

const configPg: nessieConfig = {
  client: new ClientPostgreSQL(migrationFolder, {
    database: Deno.env.get('POSTGRES_DB') || 'postgres',
    hostname: Deno.env.get('POSTGRES_HOSTNAME') || 'postgres',
    port: Number(Deno.env.get('POSTGRES_PORT')) || 5432,
    user: Deno.env.get('POSTGRES_USER') || 'postgres,
    password: Deno.env.get('POSTGRES_PASSWORD') || 'Postgres2020!',
  }),
};

export default configPg;
