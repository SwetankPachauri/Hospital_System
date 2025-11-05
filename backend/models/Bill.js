import mongoose from 'mongoose';

const billItemSchema = new mongoose.Schema({
  description: String,
  cost: Number
});

const billSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true
  },
  items: [billItemSchema],
  total: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Bill', billSchema);