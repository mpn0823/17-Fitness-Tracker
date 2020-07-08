const express = require('express');
const router = express.Router();
const path = require('path');

// Mongoose stuff
// const mongoose = require('mongoose');
const Workout = require('../models/Workout');

// These routes serve html pages
router.get('/', (req, res, next) => res.send('index')); // Why does send work for index and not the other routes?
router.get('/exercise', (req, res, next) => res.sendFile(path.join(__dirname + '/../public/exercise.html')));
router.get('/stats', (req, res, next) => res.sendFile(path.join(__dirname + '/../public/stats.html')));

// My routes go here

// Need to catch error and pass to next
router.get('/api/workouts', (req, res, next) =>
  Workout.find().then(result => res.json(result))
);

// need to catch errors
router.post('/api/workouts', ({ body }, res, next) => {
  new Workout(body).save((err, workout) => err ? res.status(400) : res.json(workout));
});

router.put('/api/workouts/:id', (req, res, next) => {
  Workout.findByIdAndUpdate(
    { _id: req.params.id },
    { $push: { exercises: req.body } },
    (err, workout) => err ? res.status(400) : res.json(workout)
  );
});

module.exports = router;
