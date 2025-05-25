const express = require('express');
const router = express.Router();
const { register, login,forgotPassword,resetPassword } = require('../controllers/authController');
const { googleLogin } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');


router.get('/profile', protect, (req, res) => {
  res.json({ message: 'Profile data', user: req.user });
});

router.post('/register', register);
router.post('/login', login);
router.post('/google', googleLogin);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
