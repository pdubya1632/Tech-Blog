const { User, Comment, Post } = require('../../data/models');
const bcrypt = require('bcrypt');

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
  // const author = await User.findByPk(post.UserId);
  const comments = await Comment.findAll({
    where: { postId: req.params.id },
    order: [['date', 'DESC']],
  });
  res.render('blog/post', {
    isAuthenticated: req.isAuthenticated(),
    user: req.user,
    post: post,
    // author: author,
    comments: comments,
  });
};

exports.CreateComment = async (req, res) => {
  try {
    const { content, postId } = req.body;
    const user = req.user;
    const userId = user.id;
    const comment = await Comment.create({
      date: Date.now(),
      content,
      userId: userId,
      postId,
    });

    if (comment) {
      res.redirect('back');
    }
  } catch (e) {
    console.log(e);
  }
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

exports.Register = async (req, res) => {
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
