import app from './app.ts';
import User from './app/models/User.ts';

const port: number = 3333 || Number(Deno.env.get('PORT'));
app.listen({ port });

console.log(`Running on port: ${port}`);

// error: Uncaught ConnectionRefused: Connection refused (os error 111)
// const user = await User.findOne(1);
// console.log(user);
