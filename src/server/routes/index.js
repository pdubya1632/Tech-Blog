const express = require('express');
const passport = require('passport');
const {
  HomePage,
  BlogPage,
  PostPage,
  CreateComment,
  AdminPage,
  CreatePostPage,
  EditPostPage,
  EditPost,
  CreatePost,
  LoginPage,
  RegisterPage,
  Register,
  Logout,
} = require('../controllers');

const router = express.Router();

router.route('/').get(HomePage);

router.route('/blog').get(BlogPage);
router.route('/blog/post/:id').get(PostPage);

router.route('/admin').get(AdminPage);
router.route('/admin/edit/:id').get(EditPostPage);
router.route('/admin/create').get(CreatePostPage);

router.route('/api/comment').post(CreateComment);
router.route('/api/edit-post').post(EditPost);
router.route('/api/create-post').post(CreatePost);

router.route('/login').get(LoginPage);
router.route('/register').get(RegisterPage);

router.route('/api/register').post(Register);
router.route('/api/login').post(
  passport.authenticate('local', {
    failureRedirect: '/',
    successRedirect: '/admin',
  }),
  function (req, res) {}
);
router.route('/logout').get(Logout);

module.exports = router;
