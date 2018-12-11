const express = require('express');

const Router = express.Router();
const passport = require('passport');

// Bcrypt to encrypt passwords
const bcrypt = require('bcrypt');

const bcryptSalt = 10;

const User = require('../models/User');

Router.post('/signup', (req, res, next) => {
  const name = req.body.name;
  const email = req.body.username;
  const password = req.body.password;

  if (name === '' || email === '' || password === '') {
    res.status(400).json({ message: 'Digite seu nome, email e senha' });
    return;
  }

  if (password.length < 2) {
    res.status(400).json({ message: 'A senha deve conter o mínimo 2 caracteres' });
    return;
  }

  User.findOne({ email }, (err, user) => {
    if (err) {
      res.status(500).json({ message: 'Tente novamente' });
      return;
    }

    if (user) {
      res.status(400).json({ message: 'Email já cadastrado.' });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashPass,
    });

    newUser.save((err) => {
      if (err) {
        res
          .status(400)
          .json({ message: 'Saving user to database went wrong.' });
        return;
      }
      req.login(newUser, (err) => {
        if (err) {
          res.status(500).json({ message: 'Login after signup went bad.' });
          return;
        }
        res.status(200).json(newUser);
      });
    });
  });
});

Router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'Something went wrong authenticating user.' });
      return

    }
    if (!theUser) {
      // "failureDetails" contains the error messages
      // from our logic in "LocalStrategy" { message: '...' }.
      res.status(401).json(failureDetails);
      return;
    }

    // save user in session
    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: 'Session save went bad.' });
        return;
      }

      // Send the user's information to the frontend
      // We can use also: res.status(200).json(req.user);
      res.status(200).json(theUser);
    });
  })(req, res, next);
});

Router.get('/logout', (req, res, next) => {
  req.logout();
  res.status(200).json({ message: 'Log out success!' });
});

Router.get('/loggedin', (req, res, next) => {
  res.status(200).json(req.user);
});


module.exports = Router;
