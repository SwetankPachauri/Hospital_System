import Appointment from '../models/Appointment.js';

export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, date, time, status } = req.body;

    if (!patientId || !doctorId || !date || !time || !status) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newAppointment = new Appointment({
      patientId,
      doctorId,
      date,
      time,
      status
    });

    await newAppointment.save();

    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, date, time, status } = req.body;

    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    appointment.patientId = patientId || appointment.patientId;
    appointment.doctorId = doctorId || appointment.doctorId;
    appointment.date = date || appointment.date;
    appointment.time = time || appointment.time;
    appointment.status = status || appointment.status;

    await appointment.save();

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getAppointmentsByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const appointments = await Appointment.find({ date });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getAppointmentsByDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const appointments = await Appointment.find({ doctorId });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getAppointmentsByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const appointments = await Appointment.find({ patientId });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};