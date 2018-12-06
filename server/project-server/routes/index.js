const express = require('express');
const router = express.Router();
const Animal = require('../models/Animal');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

// doe route:
router.get('/doe', (req, res, next) => {
  Animal.find()
    .then(animals => {
      console.log(animals)
      res.status(200).json(animals);
    })
    .catch(error => {
      console.log(error)
    })
});

// adote route:
router.get('/adote', (req, res, next) => {
  Animal.find()
    .then(animals => {
      console.log(animals)
      res.status(200).json(animals);
    })
    .catch(error => {
      console.log(error)
    })
});


module.exports = router;
