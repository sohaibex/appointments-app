import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import appointmentsRouter from './routes/appointments.js';
import clientsRouter from './routes/clients.js';
import { readFileSync } from 'fs';

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Firebase
const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT;
if (serviceAccountPath) {
  initializeApp({ credential: cert(JSON.parse(readFileSync(serviceAccountPath))) });
} else {
  initializeApp();
}
export const db = getFirestore();

// Swagger setup
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Appointments API',
    version: '1.0.0',
  },
};
const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};
const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API routes
app.use('/api/v1/appointments', appointmentsRouter);
app.use('/api/v1/clients', clientsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
