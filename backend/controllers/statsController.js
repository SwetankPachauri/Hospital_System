import db from '../config/database.js';

export const getDashboardStats = async (req, res) => {
  try {
    await db.read();

    const today = new Date().toISOString().split('T')[0];
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    // Calculate stats
    const totalPatients = db.data.patients.length;
    const totalDoctors = db.data.doctors.length;
    const appointmentsToday = db.data.appointments.filter(a => a.date === today).length;
    
    const revenueThisMonth = db.data.bills
      .filter(b => {
        const billDate = new Date(b.date);
        return billDate.getMonth() === currentMonth && billDate.getFullYear() === currentYear;
      })
      .reduce((sum, b) => sum + b.total, 0);

    // Recent activity
    const recentActivity = [
      {
        title: 'New Patient Registered',
        description: 'A new patient has been added to the system',
        time: '2 hours ago'
      },
      {
        title: 'Appointment Scheduled',
        description: 'New appointment created for tomorrow',
        time: '3 hours ago'
      },
      {
        title: 'Bill Generated',
        description: 'Invoice created for patient consultation',
        time: '5 hours ago'
      }
    ];

    res.json({
      totalPatients,
      totalDoctors,
      appointmentsToday,
      revenueThisMonth,
      recentActivity
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
