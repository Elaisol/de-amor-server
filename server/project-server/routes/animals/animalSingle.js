const express = require('express');
const mongoose = require('mongoose');
const Router  = express.Router();
const Animal = require('../../models/Animal');

// doe route:
Router.get('/doe/animal/:id', (req, res, next) => {
  Animal.findById(req.params.id)
    .then(animals => res.status(200).json(animals))
    .catch(error => res.status(400).json(err));
});

Router.put('/doe/animal/:id', (req, res, next)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Animal.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({message: `Project with ${req.params.id} is updated successfully.`});
    })
    .catch(err => {
      res.json(err);
    })
})

Router.delete('/doe/animal/:id', (req, res, next)=>{
  
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Animal.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({message: `Animal with ${req.params.id} is removed successfully.`});
    })
    .catch( err => {
      res.json(err);
    })
})

module.exports = Router;