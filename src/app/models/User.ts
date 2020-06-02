import { Model } from 'https://deno.land/x/cotton/mod.ts';
import db from '../../database/db.ts';

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
}

db.addModel(User);

export default User;
