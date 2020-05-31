import { Router } from 'https://deno.land/x/oak/mod.ts';
import Utils from './game/Utils.ts';

const router = new Router();

router.get('/', (ctx) => {
  const numRolls = 3;
  const rolledDices = Utils.roll(numRolls, 20);
  let dicesSumString = '';
  for (let i = 0; i < rolledDices.rolls.length; i++) {
    dicesSumString += `${rolledDices.rolls[i]}`;
    if (i < rolledDices.rolls.length - 1) dicesSumString += ' + ';
  }

  ctx.response.body = `rolling ${numRolls}d20: ${rolledDices.total} = ${dicesSumString}`;
});

export default router;
