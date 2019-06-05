const router = require("express").Router();

const Students = require("./students-model");

router.get("/", (req, res) => {
  Students.find()
    .then(students => {
      res.status(200).json(students);
    })
    .catch(err => {
      res.status(500).json({ message: "Error retrieving students" });
    });
});

module.exports = router;
