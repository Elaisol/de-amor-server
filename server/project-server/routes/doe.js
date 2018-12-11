const express = require('express');

const Router = express.Router();
const mongoose = require('mongoose');

const Animal = require('../models/Animal');
const User = require('../models/User');

// Route to get all Animal
Router.get('/doe/:id', (req, res, next) => {
  console.log(req.params.id);
  Animal.find({ owner: req.params.id }).populate('Animal')
    .then(animal => res.status(200).json(animal))
    .catch(err => res.status(400).json(err));
});

Router.get('/doe/animal/:id', (req, res, next) => {
  console.log(req.params.id);
  Animal.findById(req.params.id)
    .then(animal => res.status(200).json(animal))
    .catch(err => res.status(400).json(err));
});

// Route to create a new Animal
Router.post('/doe', (req, res, next) => {
  console.log(req.user);
  const {
    species,
    gender,
    name,
    color,
    age,
    size,
    breed,
    description,
    address,
    city,
  } = req.body;


  Animal.create({
    species,
    gender,
    name,
    color,
    age,
    size,
    breed,
    description,
    location: {
      address,
      city,
    },
    owner: req.user.id,
  })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
    });
});

Router.put('/doe/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  Animal.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `Animal with ${req.params.id} is updated successfully.` });
    })
    .catch((err) => {
      res.json(err);
    });
});

Router.delete('/doe/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid({ animal: req.params.id })) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Animal.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Animal with ${req.params.id} is removed successfully.` });
    })
    .catch((err) => {
      res.json(err);
    });
});


module.exports = Router;
