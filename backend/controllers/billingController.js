import Bill from '../models/Bill.js';

export const getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find();
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getBillById = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    
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

    const newBill = new Bill({
      patientId,
      items,
      total: parseFloat(total),
      date
    });

    await newBill.save();

    res.status(201).json(newBill);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getBillsByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const bills = await Bill.find({ patientId });
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};