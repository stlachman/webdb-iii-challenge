exports.up = function(knex, Promise) {
  return knex.schema.createTable("students", function(table) {
    table.increments();

    table.string("name").notNullable();

    table
      .integer("cohort_id")
      .unsigned()
      .references("id")
      .inTable("cohorts")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("students");
};
