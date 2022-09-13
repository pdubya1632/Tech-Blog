const { User } = require('../../../data/models');
const passport = require('passport');
const bcrypt = require('bcrypt');

exports.Register = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const salt = await bcrypt.genSalt(12);
    const hashed_password = await bcrypt.hash(password, salt);
    const user = await User.create({
      email,
      username,
      password: hashed_password,
    });

    if (user) {
      res.redirect('/login');
    }
  } catch (e) {
    console.log(e);
  }
};

// passport login
exports.Login = (req, res) => {
  passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/login',
    failureMessage: true,
  })(req, res);
};

exports.Logout = (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(400).send('Unable to log out');
      } else {
        res.redirect('/');
      }
    });
  } else {
    res.end();
  }
};
