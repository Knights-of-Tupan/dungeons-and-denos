import { Model } from 'https://deno.land/x/cotton/mod.ts';

interface Factory {
  fields?: { [key: string]: any };
}

let factories: { [key: string]: Factory } = {};

/**
 * Defines a factory with a name and all its fields.
 *
 * @example
 * define('User', {
 *   name: 'test',
 *   email: `email@mail.com`,
 *   password: '12345'
 * });
 */
function define(name: string, fields?: { [key: string]: any }) {
  factories[name] = { fields };
}

/**
 * Saves the new model with overloaded fields in the database. 
 *
 * @example <caption> Overloaded field 'password' </caption>
 * const user = await create(
 *   'User', 
 *   new User(),
 *   { password: '1234' }
 * );
 * @returns undefined if the promise is rejected.
 */
export async function create<T extends Model>(
  name: string,
  model: T,
  overloadFields: { [key: string]: any } = {}
): Promise<T> {
  const factory: Factory = factories[name];

  return new Promise((reject, resolve) => {
    if (factory !== undefined) { 
      for (const [key, value] of Object.entries(model)) {
        if(key in overloadFields)
          model[key.toString()] = overloadFields[key];
        else 
          model[key.toString()] = factory.fields![key];
      }

      resolve(factory.model!.save());
    } else reject(undefined);
  });
}

define('User', {
  name: 'test',
  email: 'email@mail.com',
  password_hash: '12345',
});
