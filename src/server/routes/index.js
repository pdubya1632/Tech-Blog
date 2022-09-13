const express = require('express');

const {
  HomePage,
  BlogPage,
  PostPage,
  AdminPage,
  LoginPage,
  RegisterPage,
} = require('../controllers/homeRoutes');
const {
  CreatePostPage,
  EditPostPage,
  DeletePostPage,
  CreatePost,
  EditPost,
  DeletePost,
  CreateComment,
  EditComment,
  DeleteComment,
} = require('../controllers/api/postRoutes');
const {
  Register,
  Login,
  Logout,
} = require('../controllers/api/userRoutes');

const router = express.Router();

router.route('/').get(HomePage);

router.route('/blog').get(BlogPage);
router.route('/blog/post/:id').get(PostPage);

router.route('/login').get(LoginPage);
router.route('/register').get(RegisterPage);

router.route('/admin').get(AdminPage);

router.route('/admin/posts/create').get(CreatePostPage);
router.route('/admin/posts/:id/edit').get(EditPostPage);
router.route('/admin/posts/:id/delete').get(DeletePostPage);

router.route('/api/posts/create').post(CreatePost);
router.route('/api/posts/:id/edit').post(EditPost);
router.route('/api/posts/:id/delete').delete(DeletePost);

router.route('/api/comments/create').post(CreateComment);
router.route('/api/comments/:id/edit').post(EditComment);
router.route('/api/comments/:id/delete').delete(DeleteComment);

router.route('/api/register').post(Register);
router.route('/api/login').post(Login);
router.route('/logout').get(Logout);

module.exports = router;
