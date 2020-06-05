import { Model } from 'https://deno.land/x/cotton/mod.ts';
import { config } from 'https://deno.land/x/dotenv/mod.ts';
import { makeJwt, Jose, Payload } from 'https://deno.land/x/djwt/create.ts';
import * as bcrypt from 'https://deno.land/x/bcrypt/mod.ts';
import db from '../../database/db.ts';

const dotenvPath: string = Deno.env.get('DENO_ENV') || './.env';
config({ path: dotenvPath, export: true });

/**
 * When creating a user you should set name, email and then call
 * encryptPassword().
 * TODO: change this when hooks are available.
 *
 * @class User
 * @extends {Model}
 */
class User extends Model {
  static tableName = 'users';

  static header: Jose = {
    alg: 'HS256',
    typ: 'JWT',
  };

  static fields = {
    name: String,
    email: String,
    password_hash: String,
  };

  public name!: string;
  public email!: string;
  public password_hash!: string;

  public async encryptPassword(password: string) {
    const salt = await bcrypt.genSalt(8);
    this.password_hash = await bcrypt.hash(password, salt);
  }

  public async checkPassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password_hash);
  }

  public generateToken() {
    const key = Deno.env.get('APP_SECRET');
    const header: Jose = User.header;
    const payload: Payload = { id: this.id };
    return makeJwt({ header, payload, key }) + '\n';
  }
}

db.addModel(User);

export default User;
