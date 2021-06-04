const Model = require('../db-models');
const bcrypt = require('bcrypt');
const saltRounds = 10;


// ======= Signs up user ===========
exports.signUpUser = (req, res) => {
  const { email, password } = req.body;

  Model.findOne({ email }, (err, user) => {
    if (err) throw err;

    if (user) {
      console.log(`Username ${email} already exists, please login instead!`);
      res.sendStatus(409);
    } else {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) throw err;

        if (hash) {
          const user = new Model({ email, hashPassword: hash });
          user.save(err => {
            if (err) {
              throw err;
            } else {
              console.log(`${email} and password has been saved!`);
              res.sendStatus(201);
            }
          })
        }
      })
    }
  })
}

// ======== Logs In user ===========
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  Model.findOne({ email }, (err, user) => {
    if (err) throw err;

    if (user) {
      bcrypt.compare(password, user.hashPassword, (err, result) => {
        if (err) {
          throw err;
        }
        console.log(result)
        if (result) {
          console.log(result, 'User found and authenticated!');
          res.sendStatus(200)
        } else {
          console.log('Password failed!')
          res.sendStatus(401)
        }
      })
    } else {
      console.log('User not found!')
      res.sendStatus(404)
    }
  })
}