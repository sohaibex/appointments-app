# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Backend API

This repository now includes a minimal Express backend located in the `server` folder. It exposes endpoints for managing appointments and clients and documents them using Swagger.

### Setup

1. Install dependencies from the `server` directory:
   ```bash
   cd server
   npm install
   ```
2. Provide Firebase service account credentials via the `FIREBASE_SERVICE_ACCOUNT` environment variable pointing to a JSON file.
   The Firebase API key must also be provided via `FIREBASE_API_KEY` for authentication endpoints.
3. Start the server:
   ```bash
   npm start
   ```
4. Swagger UI will be available at `http://localhost:5000/api-docs`.

### API overview

The backend exposes the following main endpoints:

- `POST /api/v1/auth/login` – authenticate a planning or admin user
- `POST /api/v1/auth/register` – create a new planning user
- CRUD operations under `/api/v1/appointments`
- Client management endpoints under `/api/v1/clients`
