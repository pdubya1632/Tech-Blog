const { User, Comment, Post } = require('../../data/models');

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
        res.render('admin/', {
          posts,
          isAuthenticated: req.isAuthenticated(),
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
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
