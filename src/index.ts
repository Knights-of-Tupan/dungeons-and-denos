import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import Utils from './game/Utils.ts'

// const port: number = Number(Deno.env.get("PORT")); 
const port = 3333

const router = new Router();

console.log(`Running on port: ${port}`);

router.get('/', (ctx) => {
  const rolledDices = Utils.rollDices(2, 20);
  let dicesSumString = '';
  for(let i = 0; i < rolledDices.rolls.length; i++)
  {
    dicesSumString += `${rolledDices.rolls[i]}`;
    if(i < rolledDices.rolls.length - 1)
      dicesSumString += ' + ';
  }

  ctx.response.body = `rolling 2d20: ${rolledDices.total} = ${dicesSumString}`;
})

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({port});
