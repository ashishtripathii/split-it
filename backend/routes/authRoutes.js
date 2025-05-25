const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { googleLogin } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');


router.get('/profile', protect, (req, res) => {
  res.json({ message: 'Profile data', user: req.user });
});

module.exports = router;




router.post('/register', register);
router.post('/login', login);
router.post('/google', googleLogin);

module.exports = router;
