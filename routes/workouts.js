const express = require("express");
const { createWorkout, getWorkout, getWorkouts, deleteWorkout, updateWorkout } = require("../controllers/workoutController.js");
//we will cut out the model and use it in the controllers folder
//for the functions of the routes.
// const Workout = require("../models/workoutModel.js");

// express router
const router = express.Router();

// attach handlers to the router, get, post, put and delete.
// might have different routes 4 or more.
router.get("/", getWorkouts);
// : is a route parameter. where it could change.
router.get("/:id", getWorkout);

// async await was added because of Workout.create()
router.post("/", createWorkout);

router.delete("/:id", deleteWorkout);

router.patch("/:id", updateWorkout);

// req.body can be used thanks to the app.use(express.json()) middleware.

// export the router at the end to require in files to be used.
module.exports = router;
