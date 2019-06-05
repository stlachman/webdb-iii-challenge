const router = require("express").Router();

const Students = require("./students-model");

// CREATE - POST /api/students
router.post("/", validateStudentInfo, (req, res) => {
  Students.add(req.body)
    .then(student => {
      res.status(200).json(student);
    })
    .catch(err => {
      res.status(500).json({ message: "Error adding student" });
    });
});

// READ - GET /api/students
router.get("/", (req, res) => {
  Students.find()
    .then(students => {
      res.status(200).json(students);
    })
    .catch(err => {
      res.status(500).json({ message: "Error retrieving students" });
    });
});

// READ - GET /api/students/:id
router.get("/:id", validateId, (req, res) => {
  res.status(200).json(req.student);
});

router.delete("/:id", validateId, (req, res) => {
  const { id } = req.params;
  Students.remove(id)
    .then(removedStudent => {
      res.status(204).end();
    })
    .catch(err => {
      res.status(500).json({ message: "Error deleting student" });
    });
});

function validateStudentInfo(req, res, next) {
  if (!req.body.name) {
    res.status(400).json({ message: "Missing required name field" });
  } else if (!req.body.cohort_id) {
    res.status(400).json({ message: "Missing required cohort_id field" });
  } else {
    next();
  }
}

function validateId(req, res, next) {
  const { id } = req.params;
  Students.findById(id)
    .then(student => {
      if (student && student.length) {
        req.student = student;
        next();
      } else {
        res.status(404).json({ message: "No student with that id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error retrieving student" });
    });
}

module.exports = router;
