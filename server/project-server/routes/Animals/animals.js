const express = require('express');
const mongoose = require('mongoose');

const Router = express.Router();
const Animal = require('../../models/Animal');

// adote (Animal Lista) route:
Router.get('/adote', (req, res, next) => {
  Animal.find()
    .then((allTheAnimals) => {
      res.status(200).json(allTheAnimals);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = Router;
