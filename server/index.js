const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const signupRouter = require('./routes/signup.route');
require('./auth/localStrategy');
require('./auth/googleStrategy');

// custom middleware checks to see if user is loggedin
const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
}

// cors, static files, and middleware for database
app.use(session({
  secret: 'secret-session',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000
  }
}));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next(); // dont forget this
});


// ============= PassportJS ===============
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user)
});

passport.deserializeUser(function (user, done) {
  done(null, user)
});


// ============= Google strategy ===============
app.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }
  ));

app.get("/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect("/protected");
  });

// ======= Logout ========
app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('You are logged out!');
});

// shows static files react index.html
app.use(express.static(path.join(__dirname, '../public')));

// ============= Signup Route ===============
app.post('/local', (req, res) => {
  console.log(req.body)
  res.sendStatus(200);
})


app.use('/signup', signupRouter);

// ============= Server Connection ===============
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT} 🐵!`);
})