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
  const posts = await Post.findAll({
    limit: 3,
    order: [['date', 'DESC']],
  });
  res.render('home', {
    isAuthenticated: req.isAuthenticated(),
    user: req.user,
    posts: posts,
  });
};

exports.BlogPage = async (req, res) => {
  const posts = await Post.findAll({
    order: [['date', 'DESC']],
  });
  res.render('blog/', {
    isAuthenticated: req.isAuthenticated(),
    posts: posts,
  });
};

exports.PostPage = async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  res.render('blog/post', {
    isAuthenticated: req.isAuthenticated(),
    post: post,
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

exports.AdminPage = async (req, res) => {
  if (!req.user) {
    return res.redirect('/login');
  }
  res.render('admin/', {
    sessionID: req.sessionID,
    sessionExpireTime:
      new Date(req.session.cookie.expires) - new Date(),
    isAuthenticated: req.isAuthenticated(),
    user: req.user,
  });
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
