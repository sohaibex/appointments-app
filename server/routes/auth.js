import { Router } from 'express';
import axios from 'axios';
import { adminAuth } from '../index.js';

const router = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login with email and password
 *     tags: [Auth]
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const apiKey = process.env.FIREBASE_API_KEY;
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
    const { data } = await axios.post(url, {
      email,
      password,
      returnSecureToken: true,
    });
    res.json({ token: data.idToken });
  } catch (e) {
    const message = e.response?.data?.error?.message || e.message;
    res.status(401).json({ error: message });
  }
});

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a planning user
 *     tags: [Auth]
 */
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await adminAuth.createUser({ email, password });
    res.status(201).json({ uid: user.uid });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
