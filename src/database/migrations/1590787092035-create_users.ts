import { Schema } from "https://deno.land/x/nessie/mod.ts";

export const up = (schema: Schema): void => {
    schema.create('users', (table) => {
        table.id();
        table.string('name', 100).notNullable();
        table.string('email', 100).notNullable().unique();
        table.string('password_hash', 100).notNullable();
        table.timestamps();
    });
};

export const down = (schema: Schema): void => {
    schema.drop('users');
};
