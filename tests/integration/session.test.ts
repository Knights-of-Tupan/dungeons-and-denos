import { assert, equal, assertNotEquals } from 'https://deno.land/std/testing/asserts.ts';
import User from '../../src/app/models/User.ts';

const user = new User();
user.name = 'test';
user.email = 'test@test.com'
user.password_hash = '12345'

Deno.test('Authentication', () => {
    equal(5, 5);
});
