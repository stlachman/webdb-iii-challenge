const knex = require("knex");

const knexConfig = require("../knexfile.js");

const db = knex(knexConfig.development);

module.exports = {
  find,
  add
};

function find() {
  return db("cohorts");
}

function add(cohort) {
  return db("cohorts").insert(cohort, "id");
}
