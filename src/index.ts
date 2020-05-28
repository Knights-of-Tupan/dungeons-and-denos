import { serve } from "https://deno.land/std@0.53.0/http/server.ts";
import Utils from './game/Utils.ts'

const port: number = Number(Deno.env.get("PORT"));
const s = serve({ port: port });
console.log(`http://localhost:${port}/`);

for await (const req of s) {
  const rolledDices = Utils.rollDices(2, 20);
  let dicesSumString = '';
  for(let i = 0; i < rolledDices.rolls.length; i++)
  {
    dicesSumString += `${rolledDices.rolls[i]}`;
    if(i < rolledDices.rolls.length - 1)
    dicesSumString += ' + ';
  }

  req.respond({ body: `rolling 2d20: ${rolledDices.total} = ${dicesSumString}` });
}
