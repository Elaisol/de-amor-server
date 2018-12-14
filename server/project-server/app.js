require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');

// CORS SETTINGS HERE TO ALLOW CROSS-ORIGIN INTERACTION:
const cors = require('cors');


mongoose
  .connect('mongodb://localhost/project-server', { useNewUrlParser: true })
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err);
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000'],
}));

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Enable authentication using session + passport
app.use(session({
  secret: 'irongenerator',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));
app.use(flash());
require('./passport')(app);

// ROUTES MIDDLEWARE STARTS HERE:
const authRouter = require('./routes/User/auth');
const animals = require('./routes/Animals/animals');
const singleAnimal = require('./routes/Animals/singleAnimal');

const userAnimal = require('./routes/User/userAnimal');

app.use('/', authRouter);
app.use('/', animals);
app.use('/', singleAnimal);
app.use('/', userAnimal);


module.exports = app;
