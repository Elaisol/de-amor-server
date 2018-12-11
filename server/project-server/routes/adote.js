const express = require('express');
const mongoose = require('mongoose');

const Router = express.Router();
const Animal = require('../models/Animal');

// adote route:
Router.get('/adote', (req, res, next) => {
  Animal.find()
    .then((allTheAnimals) => {
      res.status(200).json(allTheAnimals);
    })
    .catch((error) => {
      console.log(error);
    });
});

// Router to get a Animal by ID
// Router.get('/adote/:id', (req, res, next) => {
//   if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//     res.status(400).json({ message: 'Specified id is not valid' });
//     return;
//   }

//   Animal.findById(req.params.id)
//     .then((response) => {
//       res.json(response);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });


module.exports = Router;
