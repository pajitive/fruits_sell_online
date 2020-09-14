const router = require('express').Router();
const controller = require('./user.controller');

router.post('/login',controller.login);
router.post('/signup',controller.signup);

module.exports = router;
