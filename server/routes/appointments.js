import { Router } from 'express';
import { db } from '../index.js';
import { collection, addDoc, getDocs, query, where } from 'firebase-admin/firestore';

const router = Router();

/**
 * @swagger
 * /appointments:
 *   post:
 *     summary: Create a new appointment
 *     tags: [Appointments]
 */
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const doc = await addDoc(collection(db, 'appointments'), data);
    res.status(201).json({ id: doc.id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/**
 * @swagger
 * /appointments/available-slots:
 *   get:
 *     summary: Get available slots
 *     tags: [Appointments]
 */
router.get('/available-slots', async (req, res) => {
  const { commune, date } = req.query;
  // Example placeholder data
  const slots = [
    { time: '09:00', available: true },
    { time: '10:00', available: true },
    { time: '11:00', available: false },
  ];
  res.json(slots);
});

export default router;
