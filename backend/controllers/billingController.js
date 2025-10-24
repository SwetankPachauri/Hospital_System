import db from '../config/database.js';

export const getAllBills = async (req, res) => {
  try {
    await db.read();
    res.json(db.data.bills);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getBillById = async (req, res) => {
  try {
    await db.read();
    const bill = db.data.bills.find(b => b.id === req.params.id);
    
    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }
    
    res.json(bill);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createBill = async (req, res) => {
  try {
    const { patientId, items, total, date } = req.body;

    if (!patientId || !items || !total || !date) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    await db.read();

    const newBill = {
      id: String(Date.now()),
      patientId,
      items,
      total: parseFloat(total),
      date
    };

    db.data.bills.push(newBill);
    await db.write();

    res.status(201).json(newBill);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getBillsByPatient = async (req, res) => {
  try {
    await db.read();
    const bills = db.data.bills.filter(b => b.patientId === req.params.patientId);
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
