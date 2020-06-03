import { RouterContext } from 'https://deno.land/x/oak/mod.ts';

class SessionController {
    async store(ctx: RouterContext) {
        ctx.response.status = 200;
    }
}

export default new SessionController();
