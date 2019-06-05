const router = require("express").Router();

const Students = require("./students-model");

router.post("/", validateStudentInfo, (req, res) => {
  Students.add(req.body)
    .then(student => {
      res.status(200).json(student);
    })
    .catch(err => {
      res.status(500).json({ message: "Error adding student" });
    });
});

router.get("/", (req, res) => {
  Students.find()
    .then(students => {
      res.status(200).json(students);
    })
    .catch(err => {
      res.status(500).json({ message: "Error retrieving students" });
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

module.exports = router;
