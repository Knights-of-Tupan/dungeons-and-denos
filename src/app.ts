import { Application } from "https://deno.land/x/oak/mod.ts";
import router from './routes.ts';

class AppController {
  app: Application;

  constructor() {
    this.app = new Application();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    // this.app.use(async (ctx) => {
    //   // reads "json", "text", "form", "undefined", or "raw"
    //   const result = await ctx.request.body();
    //   const body = result.value;
    // });
  }

  routes() {
    this.app.use(router.routes());
    this.app.use(router.allowedMethods());
  }
}

export default new AppController().app;
