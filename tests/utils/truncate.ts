import { walk } from 'https://deno.land/std/fs/mod.ts';
import db from '../../src/database/db.ts';

const modelsDir = './src/app/models';
const matchFilter: RegExp[] = [];
matchFilter.push(new RegExp('[:upper:]*[a-z].ts'));


/**
 * Clear all model tables from the database.
 * Uses the statement 'TRUNCATE <tablename>'
 */
export default async function truncateModels() {
  for await (const entry of walk(modelsDir, { match: matchFilter })) {
    const pathSplit = entry.path.split('/');
    const model = pathSplit[3].toLowerCase();
    const tableName = model.split('.')[0] + 's';
    await db.execute(`TRUNCATE ${tableName};`);
  }
}
