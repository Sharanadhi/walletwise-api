/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up (knex) {
  return knex.schema.createTable('transactions', table => {
    table.increments('id').primary();
    table.string('description');
    table.decimal('amount', 10, 2);
    table.string('type');
    table.string('category');
    table.date('date');
    table.string('user_id');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down (knex) {
  return knex.schema.dropTable('transactions');
};
