import Doctor from '../models/Doctor.js';

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    
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

    const newDoctor = new Doctor({
      name,
      specialty,
      contact,
      availableDays
    });

    await newDoctor.save();

    res.status(201).json(newDoctor);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateDoctor = async (req, res) => {
  try {
    const { name, specialty, contact, availableDays } = req.body;

    const doctor = await Doctor.findById(req.params.id);
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    doctor.name = name || doctor.name;
    doctor.specialty = specialty || doctor.specialty;
    doctor.contact = contact || doctor.contact;
    doctor.availableDays = availableDays || doctor.availableDays;

    await doctor.save();

    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};