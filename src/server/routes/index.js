const express = require('express');
const {
  Signup,
  HomePage,
  BlogPage,
  PostPage,
  AdminPage,
  LoginPage,
  RegisterPage,
  Logout,
} = require('../controllers');
const passport = require('passport');

const router = express.Router();

router.route('/').get(HomePage);

router.route('/blog').get(BlogPage);
router.route('/blog/post/:id').get(PostPage);

router.route('/admin').get(AdminPage);
router.route('/login').get(LoginPage);
router.route('/register').get(RegisterPage);

router.route('/api/login').post(
  passport.authenticate('local', {
    failureRedirect: '/',
    successRedirect: '/admin',
  }),
  function (req, res) {}
);
router.route('/api/register').post(Signup);
router.route('/logout').get(Logout);

module.exports = router;
