import db from '../../src/database/db.ts';
import { walk } from 'https://deno.land/std/fs/mod.ts';

const modelsDir = './src/app/models';
const matchFilter: RegExp[] = [];
matchFilter.push(new RegExp('[:upper:]*[a-z].ts'));

export default async function truncateModels() {
  for await (const entry of walk(modelsDir, { match: matchFilter })) {
    const pathSplit = entry.path.split('/');
    const model = pathSplit[3].toLowerCase();
    const tableName = model.split('.')[0] + 's';
    db.execute(`TRUNCATE ${tableName};`);
  }
}
