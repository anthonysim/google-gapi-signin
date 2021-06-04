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
// exports.logInUser = async (req, res) => {
//   const { email, password } = req.body;

//   Model.findOne({ email }, (err, user) => {
//     if (err) throw err;

//     if (user) {
//       bcrypt.compare(password, user.hashPassword, (err, result) => {
//         if (err) {
//           throw err;
//         }

//         if (result) {
//           console.log(result, 'it  worked!');
//           res.send(true)
//         } else {
//           console.log('Password failed, try again!')
//           res.send(false)
//         }
//       })
//     } else {
//       console.log('User not found!')
//       res.send(false)
//     }
//   })
// }