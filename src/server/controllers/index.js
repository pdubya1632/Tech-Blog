const { User, Comment, Post } = require('../../data/models');
const bcrypt = require('bcrypt');

exports.Signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt(12);
    const hashed_password = await bcrypt.hash(password, salt);
    const user = await User.create({
      email,
      password: hashed_password,
    });

    if (user) {
      res.redirect('/login');
    }
  } catch (e) {
    console.log(e);
  }
};

exports.HomePage = async (req, res) => {
  res.render('home', {
    isAuthenticated: req.isAuthenticated(),
    user: req.user,
  });
};

exports.LoginPage = async (req, res) => {
  res.render('auth/login', {
    isAuthenticated: req.isAuthenticated(),
  });
};

exports.RegisterPage = async (req, res) => {
  res.render('auth/register', {
    isAuthenticated: req.isAuthenticated(),
  });
};

exports.Logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }
    res.redirect('/');
  });
};

exports.AdminPage = async (req, res) => {
  if (!req.user) {
    return res.redirect('/');
  }
  res.render('admin/', {
    sessionID: req.sessionID,
    sessionExpireTime:
      new Date(req.session.cookie.expires) - new Date(),
    isAuthenticated: req.isAuthenticated(),
    user: req.user,
  });
};
