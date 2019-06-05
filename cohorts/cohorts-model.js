const knex = require("knex");

const knexConfig = require("../knexfile.js");

const db = knex(knexConfig.development);

module.exports = {
  find,
  findById,
  getCohortStudents,
  add
};

function find() {
  return db("cohorts");
}

function findById(id) {
  return db("cohorts")
    .where({ id })
    .first();
}

function getCohortStudents(id) {
  return db("cohorts as c")
    .join("students as s", "c.id", "=", "s.cohort_id")
    .select("s.*")
    .where("c.id", id);
}

function add(cohort) {
  return db("cohorts").insert(cohort, "id");
}
