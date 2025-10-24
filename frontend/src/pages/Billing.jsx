import React, { useState, useEffect } from 'react';
import { Plus, Download, Receipt as ReceiptIcon } from 'lucide-react';
import { Card, Button, Modal, LoadingSpinner, EmptyState, Select, Input } from '../components/Common';
import { billingAPI, patientsAPI } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';

const Billing = () => {
  const [bills, setBills] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    patientId: '',
    items: [{ description: '', cost: '' }],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [billsRes, patsRes] = await Promise.all([
        billingAPI.getAll(),
        patientsAPI.getAll()
      ]);

      const billsWithNames = billsRes.data.map(bill => {
        const patient = patsRes.data.find(p => p.id === bill.patientId);
        return {
          ...bill,
          patientName: patient?.name || 'Unknown'
        };
      });

      setBills(billsWithNames);
      setPatients(patsRes.data);
    } catch (error) {
      toast.error('Failed to load billing data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const total = formData.items.reduce((sum, item) => sum + parseFloat(item.cost || 0), 0);
    const billData = {
      ...formData,
      total,
      date: new Date().toISOString().split('T')[0]
    };

    try {
      await billingAPI.create(billData);
      toast.success('Bill created successfully');
      fetchData();
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const openModal = () => {
    setFormData({
      patientId: '',
      items: [{ description: '', cost: '' }]
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: '', cost: '' }]
    });
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const updateItem = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData({ ...formData, items: newItems });
  };

  const downloadInvoice = (bill) => {
    // Simple text invoice - in production, use a PDF library
    const invoice = `
HOSPITAL MANAGEMENT SYSTEM
Invoice #${bill.id}

Patient: ${bill.patientName}
Date: ${bill.date}

Items:
${bill.items.map(item => `${item.description}: $${item.cost}`).join('\n')}

Total: $${bill.total}
    `.trim();

    const blob = new Blob([invoice], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${bill.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Revenue chart data
  const revenueData = bills.reduce((acc, bill) => {
    const month = new Date(bill.date).toLocaleDateString('en-US', { month: 'short' });
    const existing = acc.find(item => item.month === month);
    if (existing) {
      existing.revenue += bill.total;
    } else {
      acc.push({ month, revenue: bill.total });
    }
    return acc;
  }, []);

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  const totalRevenue = bills.reduce((sum, bill) => sum + bill.total, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Billing & Reports</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage invoices and financial reports</p>
        </div>
        <Button icon={Plus} onClick={openModal}>
          Create Bill
        </Button>
      </div>

      {/* Revenue Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-primary-500">
          <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-1 font-semibold">Total Revenue</h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">${totalRevenue.toFixed(2)}</p>
        </Card>
        <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-blue-500">
          <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-1 font-semibold">Total Bills</h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{bills.length}</p>
        </Card>
        <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-gray-700">
          <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-1 font-semibold">Average Bill</h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            ${bills.length > 0 ? (totalRevenue / bills.length).toFixed(2) : '0.00'}
          </p>
        </Card>
      </div>

      {/* Revenue Chart */}
      {revenueData.length > 0 && (
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Revenue Overview
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" opacity={0.3} />
              <XAxis dataKey="month" stroke="#6b7280" className="dark:stroke-gray-400" />
              <YAxis stroke="#6b7280" className="dark:stroke-gray-400" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  color: '#111827',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Bar dataKey="revenue" fill="url(#colorRevenue)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0ea5e9" stopOpacity={1} />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity={0.8} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      )}

      {/* Bills List */}
      {bills.length > 0 ? (
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Recent Bills
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-sm font-bold text-gray-900 dark:text-white">Invoice ID</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-gray-900 dark:text-white">Patient</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-gray-900 dark:text-white">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-gray-900 dark:text-white">Items</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-gray-900 dark:text-white">Total</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-gray-900 dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bills.map((bill) => (
                  <tr key={bill.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100 font-medium">#{bill.id}</td>
                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">{bill.patientName}</td>
                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">{bill.date}</td>
                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">{bill.items.length} item(s)</td>
                    <td className="py-3 px-4 text-sm font-bold text-primary-600 dark:text-primary-400">${bill.total.toFixed(2)}</td>
                    <td className="py-3 px-4 text-sm">
                      <button
                        onClick={() => downloadInvoice(bill)}
                        className="flex items-center gap-1 text-primary-600 dark:text-primary-400 hover:underline font-medium"
                      >
                        <Download size={16} />
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <Card>
          <EmptyState
            title="No bills found"
            description="Create your first bill"
            icon={ReceiptIcon}
            action={
              <Button icon={Plus} onClick={openModal}>
                Create Bill
              </Button>
            }
          />
        </Card>
      )}

      {/* Create Bill Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Create New Bill"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label="Patient"
            name="patientId"
            value={formData.patientId}
            onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
            options={patients.map(p => ({ value: p.id, label: p.name }))}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Bill Items
            </label>
            <div className="space-y-3">
              {formData.items.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) => updateItem(index, 'description', e.target.value)}
                    className="input-field flex-1"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Cost"
                    value={item.cost}
                    onChange={(e) => updateItem(index, 'cost', e.target.value)}
                    className="input-field w-32"
                    step="0.01"
                    min="0"
                    required
                  />
                  {formData.items.length > 1 && (
                    <Button
                      type="button"
                      variant="danger"
                      onClick={() => removeItem(index)}
                    >
                      ✕
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="secondary"
              onClick={addItem}
              className="mt-3 w-full"
            >
              + Add Item
            </Button>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span className="text-gray-900 dark:text-white">Total:</span>
              <span className="text-gray-900 dark:text-white">
                ${formData.items.reduce((sum, item) => sum + parseFloat(item.cost || 0), 0).toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              Create Bill
            </Button>
            <Button type="button" variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Billing;
