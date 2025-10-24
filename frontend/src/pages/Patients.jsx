import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Users as UsersIcon } from 'lucide-react';
import { Card, Button, Input, Modal, LoadingSpinner, EmptyState } from '../components/Common';
import { patientsAPI } from '../services/api';
import toast from 'react-hot-toast';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'male',
    contact: '',
    diagnosis: '',
    admittedDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  useEffect(() => {
    const filtered = patients.filter(patient =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.contact.includes(searchTerm) ||
      patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPatients(filtered);
  }, [searchTerm, patients]);

  const fetchPatients = async () => {
    try {
      const response = await patientsAPI.getAll();
      setPatients(response.data);
      setFilteredPatients(response.data);
    } catch (error) {
      toast.error('Failed to load patients');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingPatient) {
        await patientsAPI.update(editingPatient.id, formData);
        toast.success('Patient updated successfully');
      } else {
        await patientsAPI.create(formData);
        toast.success('Patient added successfully');
      }
      fetchPatients();
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this patient?')) return;

    try {
      await patientsAPI.delete(id);
      toast.success('Patient deleted successfully');
      fetchPatients();
    } catch (error) {
      toast.error('Failed to delete patient');
    }
  };

  const openModal = (patient = null) => {
    if (patient) {
      setEditingPatient(patient);
      setFormData({
        name: patient.name,
        age: patient.age,
        gender: patient.gender,
        contact: patient.contact,
        diagnosis: patient.diagnosis,
        admittedDate: patient.admittedDate
      });
    } else {
      setEditingPatient(null);
      setFormData({
        name: '',
        age: '',
        gender: 'male',
        contact: '',
        diagnosis: '',
        admittedDate: new Date().toISOString().split('T')[0]
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPatient(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Patients</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage patient records</p>
        </div>
        <Button icon={Plus} onClick={() => openModal()}>
          Add Patient
        </Button>
      </div>

      {/* Search Bar */}
      <Card>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name, contact, or diagnosis..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </Card>

      {/* Patients Table */}
      <Card>
        {filteredPatients.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-sm font-bold text-gray-900 dark:text-white">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-gray-900 dark:text-white">Age</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-gray-900 dark:text-white">Gender</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-gray-900 dark:text-white">Contact</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-gray-900 dark:text-white">Diagnosis</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-gray-900 dark:text-white">Admitted Date</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-gray-900 dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100 font-medium">{patient.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">{patient.age}</td>
                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100 capitalize">{patient.gender}</td>
                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">{patient.contact}</td>
                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">{patient.diagnosis}</td>
                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">{patient.admittedDate}</td>
                    <td className="py-3 px-4 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openModal(patient)}
                          className="p-1.5 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                        >
                          <Edit size={16} className="text-primary-600 dark:text-primary-400" />
                        </button>
                        <button
                          onClick={() => handleDelete(patient.id)}
                          className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} className="text-red-600 dark:text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            title="No patients found"
            description="Get started by adding your first patient"
            icon={UsersIcon}
            action={
              <Button icon={Plus} onClick={() => openModal()}>
                Add Patient
              </Button>
            }
          />
        )}
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingPatient ? 'Edit Patient' : 'Add New Patient'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="input-field"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <Input
            label="Contact"
            name="contact"
            type="tel"
            value={formData.contact}
            onChange={handleChange}
            required
          />

          <Input
            label="Diagnosis"
            name="diagnosis"
            value={formData.diagnosis}
            onChange={handleChange}
            required
          />

          <Input
            label="Admitted Date"
            name="admittedDate"
            type="date"
            value={formData.admittedDate}
            onChange={handleChange}
            required
          />

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              {editingPatient ? 'Update Patient' : 'Add Patient'}
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

export default Patients;
