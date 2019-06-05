const express = require("express");

const server = express();
server.use(express.json());

const cohortRouter = require("./cohorts/cohort-routes.js");

server.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

server.use("/api/cohorts", cohortRouter);

const port = 5000;

server.listen(port, () => console.log(`Server listening on ${port}`));
