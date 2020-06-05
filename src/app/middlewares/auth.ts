import { validateJwt } from "https://deno.land/x/djwt/validate.ts"
import { Middleware, Status } from 'https://deno.land/x/oak/mod.ts';
import { config } from 'https://deno.land/x/dotenv/mod.ts';

const dotenvPath: string = Deno.env.get('DENO_ENV') || './.env';
config({ path: dotenvPath, export: true });

const authMiddleware: Middleware = async (context, next) => {
  const authHeader = context.request.headers.get('Authorization');

  if (!authHeader) {
    context.response.status = Status.Unauthorized;
    context.response.body = { message: 'Token not provided.' };
    context.response.type = 'json';
    return;
  }

  const [_, token] = authHeader?.split(' ');

  try {
    const decoded = await validateJwt(token, Deno.env.get('APP_SECRET'), { isThrowing: false });
    context.request.headers.set('userId', decoded.id);
    await next();
  } catch(err) {
    context.response.status = Status.Unauthorized;
    context.response.body = { message: 'Token invalid.' };
    context.response.type = 'json';
    return;
  }
};

export default authMiddleware;
