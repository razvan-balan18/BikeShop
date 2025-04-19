import express from 'express';
import verifyToken from '../middlewares/auth.js';

const router = express.Router();

router.get('/profile', verifyToken, (req, res) => {
  res.json({
    message: 'Protected route',
    user: req.user, // Firebase decoded token
  });
});

export default router;
