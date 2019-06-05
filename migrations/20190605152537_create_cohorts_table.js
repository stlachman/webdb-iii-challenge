exports.up = function(knex, Promise) {
  return knex.schema.createTable("cohorts", function(table) {
    // pk
    table.increments();
    table.string("name").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("cohorts");
};
