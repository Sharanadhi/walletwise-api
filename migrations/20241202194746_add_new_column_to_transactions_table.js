/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up (knex) {
  return knex.schema.table('transactions', table => {
    table.string('user_id');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export  function down (knex) {
  return knex.schema.table('transactions', table => {
    table.dropColumn('user_id');
  });
};
