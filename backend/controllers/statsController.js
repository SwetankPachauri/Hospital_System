import Patient from '../models/Patient.js';
import Doctor from '../models/Doctor.js';
import Appointment from '../models/Appointment.js';
import Bill from '../models/Bill.js';

export const getDashboardStats = async (req, res) => {
  try {
    const totalPatients = await Patient.countDocuments();
    const totalDoctors = await Doctor.countDocuments();
    const totalAppointments = await Appointment.countDocuments();
    const totalRevenue = await Bill.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$total' }
        }
      }
    ]);

    const recentAppointments = await Appointment.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('patientId doctorId');

    res.json({
      totalPatients,
      totalDoctors,
      totalAppointments,
      totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].total : 0,
      recentAppointments
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};