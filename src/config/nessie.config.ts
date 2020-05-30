// import { nessieConfigType } from "https://deno.land/x/nessie/mod.ts";

export default {
  migrationFolder: "./src/database/migrations",
  connection: { // These are the connection option from their respective db clients, will differ
    host: "postgres-server",
    port: 5432,
    user: "postgres",
    password: "Postgres2018!",
    database: "postgres",
  },
  dialect: "pg",
};

