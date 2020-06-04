import { superoak, SuperDeno } from 'https://deno.land/x/superoak/mod.ts';
import { describe, it } from 'https://deno.land/x/superoak/test/utils.ts';
import { Status } from 'https://deno.land/x/oak/mod.ts';
import { expect } from 'https://deno.land/x/superoak/test/deps.ts';
import User from '../../src/app/models/User.ts';
import app from '../../src/app.ts';
import truncateAllModels from '../utils/truncate.ts';

describe('Authentication', () => {
  it('should authenticate with valid credentials', async (done) => {
    await truncateAllModels();
    const user = new User();
    user.name = 'test2';
    user.email = 'test2@test.com';
    await user.encryptPassword('12345');
    await user.save();

    console.log(user);

    const response: SuperDeno = await superoak(app);
    response
      .post('/sessions')
      .send({
        email: user.email,
        password: '12345',
      })
      .expect(Status.OK, done);
  });

  it('should not autenticate with invalid credentials', async (done) => {
    await truncateAllModels();
    const user = new User();
    user.name = 'test2';
    user.email = 'test2@test.com';
    await user.encryptPassword('12345');
    await user.save();

    console.log(user);

    const response: SuperDeno = await superoak(app);
    response
      .post('/sessions')
      .send({
        email: user.email,
        password: '1234',
      })
      .expect(Status.Unauthorized, done);
  });

  it('should return jwt token when authenticated', async (done) => {
    await truncateAllModels();
    const user = new User();
    user.name = 'test2';
    user.email = 'test2@test.com';
    await user.encryptPassword('12345');
    await user.save();

    console.log(user);

    const response: SuperDeno = await superoak(app);
    response
      .post('/sessions')
      .send({
        email: user.email,
        password: '12345',
      })
      .expect(200, (err, res) => {
        expect(res.body).toHaveProperty('token');
        done();
      });
  });
});
