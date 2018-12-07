const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

// router.post("/login", passport.authenticate("local"), function(req, res) {
//   res.status(200).json(req.user);
// });
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Something went wrong authenticating user" });
      return;
    }

    if (!theUser) {
      res.status(401).json(failureDetails);
      return;
    }

    // save user in session
    req.login(theUser, err => {
      if (err) {
        res.status(500).json({ message: "Session save went bad." });
        return;
      }
      res.status(200).json(theUser);
    });
  })(req, res, next);
});

router.post("/signup", (req, res, next) => {
  const name = req.body.name;
  const email = req.body.username;
  const password = req.body.password;
  console.log(req.body)

  if (name === "" || email === "" || password === "") {
    res.status(400).json({ message: "Digite seu nome, email e senha" });
    return;
  }

  if (password.length < 2) {
    res
      .status(400)
      .json({ message: "A senha deve conter o mínimo 2 caracteres" });
    return;
  }

  User.findOne({ email }, (err, user) => {
    if (err) {
      res.status(500).json({ message: "Tente novamente" });
      return;
    }

    if (user !== null) {
      res.status(400).json({ message: "Email já cadastrado." });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashPass
    });
    console.log(newUser);
    newUser.save(err => {
      if (err) {
        res
          .status(400)
          .json({ message: "Saving user to database went wrong." });
        return;
      }
      req.login(newUser, err => {
        if (err) {
          res.status(500).json({ message: "Login after signup went bad." });
          return;
        }
        res.status(200).json(newUser);
      });
    });
  });
});

router.get("/logout", (req, res, next) => {
  req.logout();
  res.status(200).json({ message: "Log out success!" });
});

router.get("/loggedin", (req, res, next) => {
  res.status(200).json(req.user);
});

module.exports = router;
