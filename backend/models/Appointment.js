import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true
  },
  doctorId: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['scheduled', 'completed', 'cancelled']
  }
}, {
  timestamps: true
});

export default mongoose.model('Appointment', appointmentSchema);