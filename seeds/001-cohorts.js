exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  // change .del() to .truncate()  resets the primary keys back to 1 in addition to deleting the data
  return knex("cohorts")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("cohorts").insert([
        { name: "ux" },
        { name: "web" },
        { name: "iOs" }
      ]);
    });
};
