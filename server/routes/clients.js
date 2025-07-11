import { Router } from 'express';
import multer from 'multer';
import { db } from '../index.js';
import { collection, doc, getDoc, updateDoc, addDoc } from 'firebase-admin/firestore';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

/**
 * @swagger
 * /clients/{id}:
 *   get:
 *     summary: Get client info
 *     tags: [Clients]
 */
router.get('/:id', async (req, res) => {
  try {
    const docRef = doc(db, 'clients', req.params.id);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json({ id: snapshot.id, ...snapshot.data() });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/**
 * @swagger
 * /clients/{id}/appointment:
 *   put:
 *     summary: Update client appointment
 *     tags: [Clients]
 */
router.put('/:id/appointment', async (req, res) => {
  try {
    const docRef = doc(db, 'clients', req.params.id);
    await updateDoc(docRef, { appointment: req.body });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/**
 * @swagger
 * /clients/bulk-import:
 *   post:
 *     summary: Import clients from Excel
 *     tags: [Clients]
 */
router.post('/bulk-import', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'File required' });
  // Placeholder: parse file and store
  await addDoc(collection(db, 'imports'), { filename: req.file.originalname });
  res.json({ success: true });
});

export default router;
