const express = require('express');

const Router = express.Router();
const mongoose = require('mongoose');
const Animal = require('../../models/Animal');

// Route to get one Animal
Router.get('/animal/:id', (req, res, next) => {
  Animal.findById(req.params.id)
    .then(animal => res.status(200).json(animal))
    .catch(err => res.status(400).json(err));
});

// Route to update one Animal
Router.put('/animal/:id', (req, res, next) => {

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

// Route to delete one Animal
Router.delete('/animal/:id', (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid({ animal: req.params.id })) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Animal.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Animal with ${req.params.id} is removed successfully.` });
    })
    .catch(err => {
      res.json(err);
    });
});


module.exports = Router;
