import db from '../config/database.js';

export const getAllPatients = async (req, res) => {
  try {
    await db.read();
    res.json(db.data.patients);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getPatientById = async (req, res) => {
  try {
    await db.read();
    const patient = db.data.patients.find(p => p.id === req.params.id);
    
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createPatient = async (req, res) => {
  try {
    const { name, age, gender, contact, diagnosis, admittedDate } = req.body;

    if (!name || !age || !gender || !contact || !diagnosis || !admittedDate) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    await db.read();

    const newPatient = {
      id: String(Date.now()),
      name,
      age: parseInt(age),
      gender,
      contact,
      diagnosis,
      admittedDate
    };

    db.data.patients.push(newPatient);
    await db.write();

    res.status(201).json(newPatient);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updatePatient = async (req, res) => {
  try {
    const { name, age, gender, contact, diagnosis, admittedDate } = req.body;

    await db.read();

    const index = db.data.patients.findIndex(p => p.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    db.data.patients[index] = {
      ...db.data.patients[index],
      name: name || db.data.patients[index].name,
      age: age ? parseInt(age) : db.data.patients[index].age,
      gender: gender || db.data.patients[index].gender,
      contact: contact || db.data.patients[index].contact,
      diagnosis: diagnosis || db.data.patients[index].diagnosis,
      admittedDate: admittedDate || db.data.patients[index].admittedDate
    };

    await db.write();

    res.json(db.data.patients[index]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deletePatient = async (req, res) => {
  try {
    await db.read();

    const index = db.data.patients.findIndex(p => p.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    db.data.patients.splice(index, 1);
    await db.write();

    res.json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
