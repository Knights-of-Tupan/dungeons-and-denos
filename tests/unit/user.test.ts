import * as bcrypt from 'https://deno.land/x/bcrypt/mod.ts';
import { describe, it } from 'https://deno.land/x/superoak/test/utils.ts';
import { assert } from 'https://deno.land/std/testing/asserts.ts';
import User from '../../src/app/models/User.ts';
import truncateAllModels from '../utils/truncate.ts';

describe('User', () => {
  it('should encrypt user password', async (done) => {
    await truncateAllModels();
    const user = new User();
    user.name = 'test2';
    user.email = 'test2@test.com';
    await user.encryptPassword('12345');
    await user.save();

    const compareHash = await bcrypt.compare('12345', user.password_hash);

    assert(compareHash);
  });
});
