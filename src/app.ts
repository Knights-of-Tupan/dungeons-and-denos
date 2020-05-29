import { Application } from "https://deno.land/x/oak/mod.ts";
import router from './routes.ts';

// const port: number = Number(Deno.env.get("PORT")); 
// const port = 3333

// console.log(`Running on port: ${port}`);

class AppController {
  app: Application;

  constructor() {
    this.app = new Application();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(async (ctx) => {
      // reads "json", "text", "form", "undefined", or "raw"
      const result = await ctx.request.body();
    });
  }

  routes() {
    this.app.use(router.routes());
    this.app.use(router.allowedMethods());
  }
}

export default new AppController().app;
