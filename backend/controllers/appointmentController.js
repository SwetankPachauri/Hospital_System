import db from '../config/database.js';

export const getAllAppointments = async (req, res) => {
  try {
    await db.read();
    res.json(db.data.appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getAppointmentById = async (req, res) => {
  try {
    await db.read();
    const appointment = db.data.appointments.find(a => a.id === req.params.id);
    
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

    await db.read();

    const newAppointment = {
      id: String(Date.now()),
      patientId,
      doctorId,
      date,
      time,
      status
    };

    db.data.appointments.push(newAppointment);
    await db.write();

    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, date, time, status } = req.body;

    await db.read();

    const index = db.data.appointments.findIndex(a => a.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    db.data.appointments[index] = {
      ...db.data.appointments[index],
      patientId: patientId || db.data.appointments[index].patientId,
      doctorId: doctorId || db.data.appointments[index].doctorId,
      date: date || db.data.appointments[index].date,
      time: time || db.data.appointments[index].time,
      status: status || db.data.appointments[index].status
    };

    await db.write();

    res.json(db.data.appointments[index]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    await db.read();

    const index = db.data.appointments.findIndex(a => a.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    db.data.appointments.splice(index, 1);
    await db.write();

    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getAppointmentsByDate = async (req, res) => {
  try {
    await db.read();
    const appointments = db.data.appointments.filter(a => a.date === req.params.date);
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getAppointmentsByDoctor = async (req, res) => {
  try {
    await db.read();
    const appointments = db.data.appointments.filter(a => a.doctorId === req.params.doctorId);
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getAppointmentsByPatient = async (req, res) => {
  try {
    await db.read();
    const appointments = db.data.appointments.filter(a => a.patientId === req.params.patientId);
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
