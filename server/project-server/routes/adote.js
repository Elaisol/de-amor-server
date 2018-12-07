const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const Animal = require('../models/Animal');

// adote route:
router.get('/adote', (req, res, next) => {
  Animal.find()
    .then((animals) => {
      console.log(animals);
      res.status(200).json(animals);
    })
    .catch((error) => {
      console.log(error);
    });
});


module.exports = router;
