import { DATA_TYPES, Database, Model } from 'https://deno.land/x/denodb/mod.ts';
import db from '../../database/database.ts';

class User extends Model {
  static table = 'users';
  static timestamps = true;

  static fields = {
    id: {
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DATA_TYPES.STRING,
      allowNull: false,
      length: 50,
    },
    email: {
      type: DATA_TYPES.STRING,
      unique: true,
      allowNull: false,
      length: 50,
    },
    password_hash: {
      type: DATA_TYPES.STRING,
      allowNull: false,
      length: 50,
    },
  };
}

db.link([User]);
