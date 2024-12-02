// migrations/20220101000000_create_users_table.js
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export function up (knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('full_name');
    table.string('email');
    table.string('phone_number');
    table.string('password');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export function down (knex) {
  return knex.schema.dropTable('users');
};
