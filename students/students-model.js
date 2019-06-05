const knex = require("knex");

const knexConfig = require("../knexfile.js");

const db = knex(knexConfig.development);

module.exports = {
  find,
  findById,
  add
};

function find() {
  return db("students");
}

function findById(id) {
  return db("cohorts as c")
    .join("students as s", "c.id", "=", "s.cohort_id")
    .select("s.id", "s.name", "c.name as cohort")
    .where("c.id", id);
}

function add(student) {
  return db("students").insert(student, "id");
}
