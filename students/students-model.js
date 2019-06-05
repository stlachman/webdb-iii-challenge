const knex = require("knex");

const knexConfig = require("../knexfile.js");

const db = knex(knexConfig.development);

module.exports = {
  find,
  findById,
  add,
  update,
  remove
};

function find() {
  return db("students");
}

function findById(id) {
  return db("students as s")
    .join("cohorts as c", "s.cohort_id", "=", "c.id")
    .select("s.id", "s.name", "c.name as cohort")
    .where("s.id", id);
}

function add(student) {
  return db("students").insert(student, "id");
}

function update(student, id) {
  return db("students")
    .where({ id })
    .update(student);
}

function remove(id) {
  return db("students")
    .where({ id })
    .del();
}
