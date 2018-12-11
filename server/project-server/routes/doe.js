const express = require('express');
const mongoose = require('mongoose');
const Router  = express.Router();
const Animal = require('../models/Animal');

// doe route:
Router.get('/doe/:id', (req, res, next) => {
  Animal.find({owner:req.params.id})
    .then(animals => {
      console.log(animals)
      res.status(200).json(animals);
    })
    .catch(error => {
      console.log(error)
    })
});

Router.post('/doe', (req, res, next)=>{
  if (req.user === null) {
    res.status(400).json({message: "Faça o login"});

  }
    const { filePath, type, gender, name, color, size, age, breed, description, address, city } = req.body;
  console.log(req.body);

  Animal.create({
    filePath,
    type,
    gender,
    name,    
    color,
    size,
    age,
    breed,
    description,
    location : {
      address,
      city
    },owner: req.user.id
  })
  .then(response => {
    res.json(response);
  })
  .catch(err => {
    res.json(err);
  })
});


Router.put('/doe/anim:id', (req, res, next)=>{

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

Router.delete('/doe/:id', (req, res, next)=>{
  
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