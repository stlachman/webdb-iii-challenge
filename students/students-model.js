const knex = require("knex");

const knexConfig = require("../knexfile.js");

const db = knex(knexConfig.development);

module.exports = {
  find,
  add
};

function find() {
  return db("students");
}

function add(student) {
  return db("students").insert(student, "id");
}
