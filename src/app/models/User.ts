import { Model } from 'https://deno.land/x/cotton/mod.ts';
import db from '../../database/db.ts';

class User extends Model {
  static tableName = 'users';

  static fields = {
    id: Number,
    name: String,
    email: String,
    password_hash: String,
    created_at: Date,
    updated_at: Date,
  };

  public id!: number;
  public name!: string;
  public email!: string;
  public password_hash!: string;
  public created_at!: Date;
  public updated_at!: Date;
}

db.addModel(User);

export default User;
