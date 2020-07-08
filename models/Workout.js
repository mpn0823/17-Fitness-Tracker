const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [new Schema({
        // common props
        type: String,
        name: String,
        duration: Number,

        // resistance props
        weight: Number,
        reps: Number,
        sets: Number,

        // cardio props
        distance: Number
    })]
});

WorkoutSchema.virtual("totalDuration").get(function () {
    return this.exercises
        .map(exercise => exercise.duration)
        .reduce((a, b) => a + b);
});

// Sneaky, sneaky
WorkoutSchema.set("toJSON", { virtuals: true });

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;