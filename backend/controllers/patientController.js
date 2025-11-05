import Patient from '../models/Patient.js';

export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    
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

    const newPatient = new Patient({
      name,
      age: parseInt(age),
      gender,
      contact,
      diagnosis,
      admittedDate
    });

    await newPatient.save();

    res.status(201).json(newPatient);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updatePatient = async (req, res) => {
  try {
    const { name, age, gender, contact, diagnosis, admittedDate } = req.body;

    const patient = await Patient.findById(req.params.id);
    
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    patient.name = name || patient.name;
    patient.age = age ? parseInt(age) : patient.age;
    patient.gender = gender || patient.gender;
    patient.contact = contact || patient.contact;
    patient.diagnosis = diagnosis || patient.diagnosis;
    patient.admittedDate = admittedDate || patient.admittedDate;

    await patient.save();

    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};