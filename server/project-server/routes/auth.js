const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.post("/login", passport.authenticate("local"), function(req, res) {
  res.status(200).json(req.user);
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username === "" || password === "") {
    res.status(400).json({ message: "Digite seu email e senha" });
    return;
  }

  User.findOne({ username }, (err, user) => {
    if(err){
      res.status(500).json({ message: "Email check went bad."});
      return;
    }

    if (user !== null) {
      res.status(400).json({ message: "Email já cadastrado." });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username: username,
      password: hashPass
    });

    newUser.save()
      .then(newUser => {
        console.log('oi', newUser)
        res.status(200).json(newUser);
      })
      .catch(err => {
        console.log('oi', err)

        res.status(400).json(err);
      });
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json(req.user);
});

module.exports = router;
