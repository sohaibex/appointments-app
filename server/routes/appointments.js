import { Router } from 'express';
import { db } from '../index.js';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase-admin/firestore';

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
    const docRef = await addDoc(collection(db, 'appointments'), data);
    res.status(201).json({ id: docRef.id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: List all appointments
 *     tags: [Appointments]
 */
router.get('/', async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, 'appointments'));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/**
 * @swagger
 * /appointments/{id}:
 *   put:
 *     summary: Update an appointment
 *     tags: [Appointments]
 */
router.put('/:id', async (req, res) => {
  try {
    const docRef = doc(db, 'appointments', req.params.id);
    await updateDoc(docRef, req.body);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/**
 * @swagger
 * /appointments/{id}:
 *   delete:
 *     summary: Delete an appointment
 *     tags: [Appointments]
 */
router.delete('/:id', async (req, res) => {
  try {
    const docRef = doc(db, 'appointments', req.params.id);
    await deleteDoc(docRef);
    res.json({ success: true });
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
