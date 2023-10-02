const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, {timestamps: true});

// Workout is the collection and will get pluralized by mongoose
module.exports = mongoose.model('Workout', workoutSchema);

//find all workouts within the workout collection
//Workout.find({}, (err, workouts) => {
//we use the methods on the model itself, the schema defines the
//structure of the data/documents that you save to that collection.