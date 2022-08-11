const express = require('express');
const {
  Signup,
  HomePage,
  AdminPage,
  LoginPage,
  RegisterPage,
  Logout,
} = require('../controllers');
const passport = require('passport');

const router = express.Router();

router.route('/').get(HomePage);
router.route('/admin').get(AdminPage);
router.route('/login').get(LoginPage);
router.route('/register').get(RegisterPage);

router.route('/api/v1/signin').post(
  passport.authenticate('local', {
    failureRedirect: '/',
    successRedirect: '/admin',
  }),
  function (req, res) {}
);
router.route('/api/v1/signup').post(Signup);
router.route('/logout').get(Logout);

module.exports = router;
