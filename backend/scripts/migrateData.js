import mongoose from 'mongoose';
import { connectDB } from '../config/database.js';
import User from '../models/User.js';
import Patient from '../models/Patient.js';
import Doctor from '../models/Doctor.js';
import Appointment from '../models/Appointment.js';
import Bill from '../models/Bill.js';
import bcrypt from 'bcryptjs';
import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbFilePath = join(__dirname, '../db.json');

const migrateData = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Read data from db.json
    const dbData = JSON.parse(await readFile(dbFilePath, 'utf8'));

    // Clear existing data
    await User.deleteMany({});
    await Patient.deleteMany({});
    await Doctor.deleteMany({});
    await Appointment.deleteMany({});
    await Bill.deleteMany({});

    console.log('Cleared existing data');

    // Migrate users
    if (dbData.users && dbData.users.length > 0) {
      for (const user of dbData.users) {
        // Use the original hashed password if it exists, otherwise hash a default password
        const password = user.password || await bcrypt.hash('defaultPassword123', 10);
        
        const newUser = new User({
          name: user.name,
          email: user.email,
          password: password,
          role: user.role
        });
        await newUser.save();
      }
      console.log(`Migrated ${dbData.users.length} users`);
    }

    // Migrate patients
    if (dbData.patients && dbData.patients.length > 0) {
      for (const patient of dbData.patients) {
        const newPatient = new Patient({
          name: patient.name,
          age: patient.age,
          gender: patient.gender,
          contact: patient.contact,
          diagnosis: patient.diagnosis,
          admittedDate: patient.admittedDate
        });
        await newPatient.save();
      }
      console.log(`Migrated ${dbData.patients.length} patients`);
    }

    // Migrate doctors
    if (dbData.doctors && dbData.doctors.length > 0) {
      for (const doctor of dbData.doctors) {
        const newDoctor = new Doctor({
          name: doctor.name,
          specialty: doctor.specialty,
          contact: doctor.contact,
          availableDays: doctor.availableDays
        });
        await newDoctor.save();
      }
      console.log(`Migrated ${dbData.doctors.length} doctors`);
    }

    // Migrate appointments
    if (dbData.appointments && dbData.appointments.length > 0) {
      for (const appointment of dbData.appointments) {
        const newAppointment = new Appointment({
          patientId: appointment.patientId,
          doctorId: appointment.doctorId,
          date: appointment.date,
          time: appointment.time,
          status: appointment.status
        });
        await newAppointment.save();
      }
      console.log(`Migrated ${dbData.appointments.length} appointments`);
    }

    // Migrate bills
    if (dbData.bills && dbData.bills.length > 0) {
      for (const bill of dbData.bills) {
        const newBill = new Bill({
          patientId: bill.patientId,
          items: bill.items,
          total: bill.total,
          date: bill.date
        });
        await newBill.save();
      }
      console.log(`Migrated ${dbData.bills.length} bills`);
    }

    console.log('Data migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Data migration failed:', error);
    process.exit(1);
  }
};

migrateData();