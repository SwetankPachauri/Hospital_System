import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female', 'other']
  },
  contact: {
    type: String,
    required: true
  },
  diagnosis: {
    type: String,
    required: true
  },
  admittedDate: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Patient', patientSchema);