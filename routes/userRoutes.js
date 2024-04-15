const express = require("express");
const userController = require("../controllers/userController");
const exerciseController = require("../controllers/exerciseController");
const logController = require("../controllers/logController");

const router = express.Router();

router
  .route("/")
  .post(userController.createUser)
  .get(userController.getAllUsers);

router.route("/:_id/exercises")
      .post(exerciseController.createExercise);


router.route('/:_id/logs')
      .get(logController.getLog);


module.exports = router;
