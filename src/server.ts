import app from './app.ts';

const port: number = 3333 || Number(Deno.env.get("PORT")); 
app.listen({port});

console.log(`Running on port: ${port}`);
