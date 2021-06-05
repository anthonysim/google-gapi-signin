const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

// env configs
dotenv.config({ path: '__config__/config.env' });


exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]

  if (token === null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403)
    }
    console.log(user);
    req.user = user;
    next();
  })
}


// custom middleware checks to see if user is loggedin
// const isLoggedIn = (req, res, next) => {
//   req.user ? next() : res.sendStatus(401);
// }