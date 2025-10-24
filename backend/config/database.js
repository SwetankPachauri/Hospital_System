import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import bcrypt from 'bcryptjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, '../db.json');

const adapter = new JSONFile(file);
const db = new Low(adapter, {});

// Initialize database with default data
export const initializeDB = async () => {
  await db.read();

  // Set default data if database is empty
  db.data ||= {
    users: [],
    patients: [],
    doctors: [],
    appointments: [],
    bills: []
  };

  // Add default users if none exist
  if (!db.data.users || db.data.users.length === 0) {
    const defaultUsers = [
      {
        id: '1',
        name: 'Admin User',
        email: 'admin@hospital.com',
        password: await bcrypt.hash('admin123', 10),
        role: 'admin'
      },
      {
        id: '2',
        name: 'Dr. Smith',
        email: 'doctor@hospital.com',
        password: await bcrypt.hash('doctor123', 10),
        role: 'doctor'
      },
      {
        id: '3',
        name: 'Jane Receptionist',
        email: 'receptionist@hospital.com',
        password: await bcrypt.hash('recep123', 10),
        role: 'receptionist'
      }
    ];
    db.data.users = defaultUsers;
  }

  // Add sample patients if none exist
  if (!db.data.patients || db.data.patients.length === 0) {
    db.data.patients = [
      {
        id: '1',
        name: 'John Doe',
        age: 35,
        gender: 'male',
        contact: '555-0101',
        diagnosis: 'Hypertension',
        admittedDate: '2025-10-10'
      },
      {
        id: '2',
        name: 'Jane Smith',
        age: 28,
        gender: 'female',
        contact: '555-0102',
        diagnosis: 'Diabetes',
        admittedDate: '2025-10-12'
      },
      {
        id: '3',
        name: 'Robert Johnson',
        age: 45,
        gender: 'male',
        contact: '555-0103',
        diagnosis: 'Asthma',
        admittedDate: '2025-10-15'
      }
    ];
  }

  // Add sample doctors if none exist
  if (!db.data.doctors || db.data.doctors.length === 0) {
    db.data.doctors = [
      {
        id: '1',
        name: 'Sarah Williams',
        specialty: 'Cardiology',
        contact: '555-0201',
        availableDays: 'Monday,Tuesday,Wednesday,Thursday,Friday'
      },
      {
        id: '2',
        name: 'Michael Brown',
        specialty: 'Pediatrics',
        contact: '555-0202',
        availableDays: 'Monday,Wednesday,Friday'
      },
      {
        id: '3',
        name: 'Emily Davis',
        specialty: 'Orthopedics',
        contact: '555-0203',
        availableDays: 'Tuesday,Thursday,Saturday'
      }
    ];
  }

  // Add sample appointments if none exist
  if (!db.data.appointments || db.data.appointments.length === 0) {
    db.data.appointments = [
      {
        id: '1',
        patientId: '1',
        doctorId: '1',
        date: '2025-10-18',
        time: '09:00',
        status: 'scheduled'
      },
      {
        id: '2',
        patientId: '2',
        doctorId: '2',
        date: '2025-10-18',
        time: '10:00',
        status: 'scheduled'
      },
      {
        id: '3',
        patientId: '3',
        doctorId: '3',
        date: '2025-10-19',
        time: '14:00',
        status: 'completed'
      }
    ];
  }

  // Add sample bills if none exist
  if (!db.data.bills || db.data.bills.length === 0) {
    db.data.bills = [
      {
        id: '1',
        patientId: '1',
        items: [
          { description: 'Consultation', cost: 100 },
          { description: 'Blood Test', cost: 50 }
        ],
        total: 150,
        date: '2025-10-10'
      },
      {
        id: '2',
        patientId: '2',
        items: [
          { description: 'Consultation', cost: 100 },
          { description: 'X-Ray', cost: 200 }
        ],
        total: 300,
        date: '2025-10-12'
      }
    ];
  }

  await db.write();
  return db;
};

export default db;
