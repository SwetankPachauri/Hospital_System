import db from '../config/database.js';

export const getAllDoctors = async (req, res) => {
  try {
    await db.read();
    res.json(db.data.doctors);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getDoctorById = async (req, res) => {
  try {
    await db.read();
    const doctor = db.data.doctors.find(d => d.id === req.params.id);
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createDoctor = async (req, res) => {
  try {
    const { name, specialty, contact, availableDays } = req.body;

    if (!name || !specialty || !contact || !availableDays) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    await db.read();

    const newDoctor = {
      id: String(Date.now()),
      name,
      specialty,
      contact,
      availableDays
    };

    db.data.doctors.push(newDoctor);
    await db.write();

    res.status(201).json(newDoctor);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateDoctor = async (req, res) => {
  try {
    const { name, specialty, contact, availableDays } = req.body;

    await db.read();

    const index = db.data.doctors.findIndex(d => d.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    db.data.doctors[index] = {
      ...db.data.doctors[index],
      name: name || db.data.doctors[index].name,
      specialty: specialty || db.data.doctors[index].specialty,
      contact: contact || db.data.doctors[index].contact,
      availableDays: availableDays || db.data.doctors[index].availableDays
    };

    await db.write();

    res.json(db.data.doctors[index]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteDoctor = async (req, res) => {
  try {
    await db.read();

    const index = db.data.doctors.findIndex(d => d.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    db.data.doctors.splice(index, 1);
    await db.write();

    res.json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
