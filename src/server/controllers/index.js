const { User, Comment, Post } = require('../../data/models');
const bcrypt = require('bcrypt');

exports.HomePage = async (req, res) => {
  Post.findAll({
    attributes: ['id', 'title', 'content', 'createdAt'],
    limit: 3,
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: Comment,
        attributes: [
          'id',
          'content',
          'PostId',
          'UserId',
          'createdAt',
        ],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then((dbData) => {
      const posts = dbData.map((post) => post.get({ plain: true }));
      res.render('home', {
        isAuthenticated: req.isAuthenticated(),
        posts,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.BlogPage = async (req, res) => {
  const posts = await Post.findAll({
    order: [['createdAt', 'DESC']],
  });
  res.render('blog/', {
    isAuthenticated: req.isAuthenticated(),
    posts: posts,
  });
};

exports.PostPage = async (req, res) => {
  Post.findByPk(req.params.id, {
    attributes: ['id', 'title', 'content', 'createdAt'],
    include: [
      {
        model: Comment,
        attributes: [
          'id',
          'content',
          'PostId',
          'UserId',
          'createdAt',
        ],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then((dbData) => {
      const post = dbData.get({ plain: true });
      res.render('blog/post', {
        isAuthenticated: req.isAuthenticated(),
        post,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.CreateComment = async (req, res) => {
  try {
    const { content, PostId } = req.body;
    const user = req.user;
    const UserId = user.id;
    const comment = await Comment.create({
      content,
      UserId: UserId,
      PostId,
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

exports.Register = async (req, res) => {
  try {
    const { email, password } = req.body;
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

exports.AdminPage = async (req, res) => {
  if (!req.user) {
    return res.redirect('/login');
  } else {
    Post.findAll({
      where: {
        UserId: req.user.id,
      },
      attributes: ['id', 'title', 'createdAt', 'content'],
      include: [
        {
          model: Comment,
          attributes: [
            'id',
            'content',
            'PostId',
            'UserId',
            'createdAt',
          ],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
        {
          model: User,
          attributes: ['username'],
        },
      ],
    })
      .then((dbPostData) => {
        const posts = dbPostData.map((post) =>
          post.get({ plain: true })
        );
        res.render('admin/', { posts });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
};

exports.CreatePostPage = async (req, res) => {
  res.render('admin/create', {
    isAuthenticated: req.isAuthenticated(),
  });
};

exports.EditPostPage = async (req, res) => {
  Post.findByPk(req.params.id, {
    attributes: ['id', 'title', 'content', 'createdAt'],
  })
    .then((dbData) => {
      const post = dbData.get({ plain: true });
      res.render('admin/edit', {
        isAuthenticated: req.isAuthenticated(),
        post,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.CreatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const user = req.user;
    const UserId = user.id;
    const post = await Post.create({
      title,
      content,
      UserId: UserId,
    });

    if (post) {
      res.redirect('/admin');
    }
  } catch (e) {
    console.log(e);
  }
};

exports.EditPost = async (req, res) => {
  try {
    const { title, content, PostId } = req.body;
    const updatedPost = await Post.update(
      {
        title: title,
        content: content,
      },
      {
        where: { id: PostId },
      }
    );

    if (updatedPost) {
      res.redirect('/admin');
    }
  } catch (e) {
    console.log(e);
  }
};
