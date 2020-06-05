import { config } from 'https://deno.land/x/dotenv/mod.ts';
import { connect } from 'https://deno.land/x/cotton/mod.ts';

const dbdotenvPath: string = Deno.env.get('DENO_ENV') || './.env';
config({ path: dbdotenvPath, export: true });

const db = await connect({
  type: 'postgres',
  database: Deno.env.get('POSTGRES_DB'),
  hostname: Deno.env.get('POSTGRES_HOSTNAME'),
  username: Deno.env.get('POSTGRES_USER'),
  password: Deno.env.get('POSTGRES_PASSWORD'),
  port: Number(Deno.env.get('POSTGRES_PORT')) || 5432,
});

export default db;
