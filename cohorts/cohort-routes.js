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

// READ - GET /api/cohorts/:id
router.get("/:id", validateId, (req, res) => {
  res.status(200).json(req.cohort);
});

// READ - GET /api/cohorts/:id/students
router.get("/:id/students", validateId, (req, res) => {
  Cohorts.getCohortStudents(req.cohort.id)
    .then(students => {
      res.status(200).json(students);
    })
    .catch(err => {
      res.status(500).json({ message: "Error retrieving students" });
    });
});

// UPDATE - PUT /api/cohorts/:id
router.put("/:id", validateId, (req, res) => {
  Cohorts.update(req.body, req.params.id)
    .then(updatedCohort => {
      res.status(201).json(updatedCohort);
    })
    .catch(err => {
      res.status(500).json({ message: "Error updating cohort" });
    });
});

// DELETE - DELETE /api/cohorts/:id
router.delete("/:id", validateId, (req, res) => {
  const { id } = req.params;
  Cohorts.remove(id)
    .then(removedCohort => {
      res.status(204).end();
    })
    .catch(err => {
      res.status(500).json({ message: "Error deleting cohort" });
    });
});

// Middleware
function validateId(req, res, next) {
  const { id } = req.params;
  Cohorts.findById(id)
    .then(cohort => {
      if (cohort) {
        req.cohort = cohort;
        next();
      } else {
        res.status(404).json({ message: "No cohort with that id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error retrieving cohorts" });
    });
}

function validateBody(req, res, next) {
  if (req.body.name) {
    next();
  } else {
    res.status(400).json({ message: "Missing required name field" });
  }
}

module.exports = router;
