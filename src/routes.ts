import { Router } from 'https://deno.land/x/oak/mod.ts';
import Utils from './game/Utils.ts';
import SessionController from './app/controllers/SessionController.ts'
import authMiddleware from './app/middlewares/auth.ts';

const router = new Router();

router.post('/sessions', SessionController.store);

router.use(authMiddleware);

router.get('/dashboard', (context) => {
  context.response.body = 'this should be a dashboard';
});

router.get('/', (context) => {
  const numRolls = 3;
  const rolledDices = Utils.roll(numRolls, 20);
  let dicesSumString = '';
  for (let i = 0; i < rolledDices.rolls.length; i++) {
    dicesSumString += `${rolledDices.rolls[i]}`;
    if (i < rolledDices.rolls.length - 1) dicesSumString += ' + ';
  }
  context.response.status = 200;
  context.response.body = `rolling ${numRolls}d20: ${rolledDices.total} = ${dicesSumString}`;
});

export default router;
