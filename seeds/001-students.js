exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("students")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        { name: "John", cohort_id: 1 },
        { name: "Katie", cohort_id: 2 },
        { name: "David", cohort_id: 3 }
      ]);
    });
};
