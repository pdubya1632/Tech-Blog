const { Post, Comment } = require('../../../data/models');

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

exports.DeletePostPage = async (req, res) => {
  Post.findByPk(req.params.id, {
    attributes: ['id', 'title'],
  })
    .then((dbData) => {
      const post = dbData.get({ plain: true });
      res.render('admin/delete', {
        isAuthenticated: req.isAuthenticated(),
        post,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

// CREATE POST
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

// EDIT POST
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

// DELETE POST
exports.DeletePost = async (req, res) => {
  try {
    const PostId = req.params.id;
    const deletedPost = await Post.destroy({
      where: {
        id: PostId,
      },
    });

    if (deletedPost) {
      res.redirect('/admin');
    }
  } catch (e) {
    console.log(e);
  }
};

// CREATE COMMENT
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

// EDIT COMMENT
exports.EditComment = async (req, res) => {
  try {
    const { content, CommentId } = req.body;
    const updatedComment = await Comment.update(
      {
        content: content,
      },
      {
        where: { id: CommentId },
      }
    );

    if (updatedComment) {
      res.redirect('back');
    }
  } catch (e) {
    console.log(e);
  }
};

// DELETE COMMENT
exports.DeleteComment = async (req, res) => {
  try {
    const CommentId = req.params.id;
    const deletedComment = await Comment.destroy({
      where: {
        id: CommentId,
      },
    });

    if (deletedComment) {
      res.redirect('back');
    }
  } catch (e) {
    console.log(e);
  }
};
