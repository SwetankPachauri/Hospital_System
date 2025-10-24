import express from 'express';
import {
  getAllBills,
  getBillById,
  createBill,
  getBillsByPatient
} from '../controllers/billingController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);

router.get('/', getAllBills);
router.get('/:id', getBillById);
router.post('/', createBill);
router.get('/patient/:patientId', getBillsByPatient);

export default router;
