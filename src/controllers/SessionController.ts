import { RouterContext, Status } from 'https://deno.land/x/oak/mod.ts';
import db from '../database/db.ts';
import User from '../app/models/User.ts';

interface UserCredentials {
  email: string;
  password: string;
}

/**
 * Responsible for user authentication.
 * TODO: separate error handling in the method.
 * * ref: https://deno.land/x/oak/examples/routingServer.ts - lines 42:81
 * @class SessionController
 */
class SessionController {
  async store(context: RouterContext) {
    let userCredentials: UserCredentials;
    const body = await context.request.body();

    if (!context.request.hasBody || body.type != 'json') {
      context.throw(Status.BadRequest, 'Bad Request');
    }

    userCredentials = body.value;

    const user: User = await db
      .queryBuilder('users')
      .where('email', userCredentials.email)
      .execute()[0];

    if (!user) {
      context.response.status = Status.Unauthorized;
      context.response.body = { message: 'User not found.' };
      context.response.type = 'json';
      return;
    }

    if (!(await user.checkPassword(userCredentials.password))) {
      context.response.status = Status.Unauthorized;
      context.response.body = { message: 'Wrong password.' };
      context.response.type = 'json';
      return;
    }

    context.response.status = Status.OK;
    context.response.body = { user };
    context.response.type = 'json';
  }
}

export default new SessionController();
