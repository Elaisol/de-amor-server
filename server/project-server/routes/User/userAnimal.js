const express = require('express');

const Router = express.Router();
const parser = require('../../config/cloudinary');
const Animal = require('../../models/Animal');

// Route to create a new Animal
Router.post('/cadastro', parser.single('picture'), (req, res, next) => {
  if (req.user === null) {
    res.status(400).json({ message: 'Faça seu login' });
  }

  console.log('req.body: ', req.body);

  const {
    type, gender, name, color, size, age, breed, description, contacts, address, city,
  } = req.body;
  const imageUrl = req.file.url;

  Animal.create({
    imageUrl,
    type,
    gender,
    name,
    color,
    age,
    size,
    breed,
    description,
    contacts,
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

// Route to get all Animals
Router.get('/cadastro/:id', (req, res, next) => {
  Animal.find({ owner: req.params.id })
    .then((animals) => {
      res.status(200).json(animals);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = Router;
