const Workout = require("../models/workoutModel.js");
const mongoose = require("mongoose");

// get all workouts
const getWorkouts = async (req, res) => {
  //if you were finding one or subset you would pass in the curly
  // property name like { reps: 20 } finding all workouts with reps
  // = to 20
  const workouts = await Workout.find({}).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};

// get single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such workout " });
  }

  //use the workout model to find the workout
  const workout = await Workout.findById(id);

  if (!workout) {
    // if we don't return here it will fire the rest of the code.
    return res.status(404).json({ error: "no such workout " });
  }
  res.status(200).json(workout);
};

// create a new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  let emptyFields = [];

  if(!title) {
    emptyFields.push("title");
  }
  if(!load) {
    emptyFields.push("load");
  }
  if(!reps) {
    emptyFields.push("reps");
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: "please fill out all fields", emptyFields });
  }

  // add document to database
  try {
    // this will let you test it in postmam under post, raw, json
    // you will add the object with the title, load, and reps to send
    //and post to the database.
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
  // was replaced with the res.status from above.
  // res.json({message: 'Create a new Workout'});
};

//delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such workout " });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    // if we don't return here it will fire the rest of the code.
    return res.status(404).json({ error: "no such workout " });
  }

  res.status(200).json(workout);
};

// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such workout " });
  }

  let updateFields = {}; // Initialize it here

  if (req.body.title) updateFields.title = req.body.title;
  if (req.body.load) updateFields.load = req.body.load;
  if (req.body.reps) updateFields.reps = req.body.reps;

  const workout = await Workout.findOneAndUpdate({ _id: id }, { $set: updateFields }, { new: true });

  if (!workout) {
    return res.status(404).json({ error: "no such workout " });
  }

  res.status(200).json(workout);
};

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};
