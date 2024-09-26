const { signupValidation, loginValidation } = require('../Controllers/AuthController');

const router = require('router').Router();
router.post('/login',loginValidation)

router.post('/signup',signupValidation, signup)

module.exports = router;