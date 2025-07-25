const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const protect = require('../middlewares/authMiddleware'); // ✅ Import the middleware

// Public routes
router.post('/register', register);
router.post('/login', login);

// ✅ Protected route
router.get('/me', protect, (req, res) => {
  res.json({
    msg: 'You are authenticated',
    user: req.user
  });
});

module.exports = router;
