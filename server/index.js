const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const userRouter = require('./routes/route');

// custom middleware checks to see if user is loggedin
const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
}

// cors, static files, and middleware for database
app.use(session({
  secret: 'secret-session',
  resave: false,
  saveUninitialized: true,
  // cookie: {
  //   maxAge: 1000
  // }
}));
app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// shows static files react index.html
app.use(express.static(path.join(__dirname, '../public')));

// ============= Routes ===============
app.use('/', userRouter);


// ============= Server Connection ===============
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT} 🐵!`);
})