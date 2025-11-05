# Hospital Management System - Backend (MongoDB Version)

This is the backend for the Hospital Management System, migrated from LowDB to MongoDB using Mongoose.

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

3. Update the `.env` file with your MongoDB connection string and JWT secret.

4. Run the migration script to import existing data:
   ```bash
   npm run migrate
   ```

5. Start the server:
   ```bash
   npm start
   ```

## MongoDB Models

- **User**: Authentication and user management
- **Patient**: Patient records and information
- **Doctor**: Doctor profiles and specialties
- **Appointment**: Appointment scheduling and management
- **Bill**: Billing and financial records

## API Endpoints

All API endpoints remain the same as the LowDB version:

- **Auth**: `/api/auth/register`, `/api/auth/login`
- **Patients**: `/api/patients` (GET, POST), `/api/patients/:id` (GET, PUT, DELETE)
- **Doctors**: `/api/doctors` (GET, POST), `/api/doctors/:id` (GET, PUT, DELETE)
- **Appointments**: `/api/appointments` (GET, POST), `/api/appointments/:id` (GET, PUT, DELETE)
- **Billing**: `/api/billing` (GET, POST), `/api/billing/:id` (GET)
- **Stats**: `/api/stats/dashboard` (GET)

## Migration Script

The migration script (`scripts/migrateData.js`) imports data from the old `db.json` file into MongoDB collections. It preserves the original IDs and hashes passwords for security.