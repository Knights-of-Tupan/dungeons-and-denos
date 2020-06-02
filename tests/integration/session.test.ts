import User from '../../src/app/models/User.ts';
import app from '../../src/app.ts';
import { superoak, SuperDeno } from 'https://deno.land/x/superoak/mod.ts';
import { describe, it } from 'https://deno.land/x/superoak/test/utils.ts';

describe('Authentication', () => {
  it('should authenticate with valid credentials', async (done: any) => {
    const user = new User();
    user.name = 'test2';
    user.email = 'test2@test.com';
    user.password_hash = '12345';
    await user.save();

    console.log(user);

    const response: SuperDeno = await superoak(app);
    response
      .post('/sessions')
      .send({
        email: user.email,
        password: user.password_hash,
      })
      .expect(200, done);
  });
});
