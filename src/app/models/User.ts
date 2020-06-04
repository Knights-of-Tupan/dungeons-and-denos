import { Model } from 'https://deno.land/x/cotton/mod.ts';
import * as bcrypt from 'https://deno.land/x/bcrypt/mod.ts';
import db from '../../database/db.ts';

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
}

db.addModel(User);

export default User;
