const router = require("express").Router();

const Cohorts = require("./cohorts-model.js");

// CREATE - POST /api/cohorts
router.post("/", validateBody, (req, res) => {
  const newCohort = req.body;
  Cohorts.add(newCohort)
    .then(cohort => {
      res.status(201).json(cohort);
    })
    .catch(err => {
      res.status(500).json({ message: "Error adding cohort" });
    });
});

// READ - GET /api/cohorts
router.get("/", (req, res) => {
  Cohorts.find()
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(err => {
      res.status(500).json({ message: "Error retrieving cohorts" });
    });
});

function validateBody(req, res, next) {
  if (req.body.name) {
    next();
  } else {
    res.status(400).json({ message: "Missing required name field" });
  }
}

module.exports = router;
