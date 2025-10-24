import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, UserCog } from 'lucide-react';
import { Card, Button, Input, Modal, LoadingSpinner, EmptyState } from '../components/Common';
import { doctorsAPI } from '../services/api';
import toast from 'react-hot-toast';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    contact: '',
    availableDays: 'Monday,Tuesday,Wednesday,Thursday,Friday'
  });

  const specialties = [
    'Cardiology', 'Dermatology', 'Neurology', 'Orthopedics', 
    'Pediatrics', 'Psychiatry', 'Radiology', 'Surgery', 'General Practice'
  ];

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    const filtered = doctors.filter(doctor =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.contact.includes(searchTerm)
    );
    setFilteredDoctors(filtered);
  }, [searchTerm, doctors]);

  const fetchDoctors = async () => {
    try {
      const response = await doctorsAPI.getAll();
      setDoctors(response.data);
      setFilteredDoctors(response.data);
    } catch (error) {
      toast.error('Failed to load doctors');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingDoctor) {
        await doctorsAPI.update(editingDoctor.id, formData);
        toast.success('Doctor updated successfully');
      } else {
        await doctorsAPI.create(formData);
        toast.success('Doctor added successfully');
      }
      fetchDoctors();
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this doctor?')) return;

    try {
      await doctorsAPI.delete(id);
      toast.success('Doctor deleted successfully');
      fetchDoctors();
    } catch (error) {
      toast.error('Failed to delete doctor');
    }
  };

  const openModal = (doctor = null) => {
    if (doctor) {
      setEditingDoctor(doctor);
      setFormData({
        name: doctor.name,
        specialty: doctor.specialty,
        contact: doctor.contact,
        availableDays: doctor.availableDays
      });
    } else {
      setEditingDoctor(null);
      setFormData({
        name: '',
        specialty: '',
        contact: '',
        availableDays: 'Monday,Tuesday,Wednesday,Thursday,Friday'
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingDoctor(null);
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Doctors</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage doctor profiles and schedules</p>
        </div>
        <Button icon={Plus} onClick={() => openModal()}>
          Add Doctor
        </Button>
      </div>

      {/* Search Bar */}
      <Card>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name, specialty, or contact..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </Card>

      {/* Doctors Grid */}
      {filteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <UserCog className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(doctor)}
                    className="p-2 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                  >
                    <Edit size={16} className="text-primary-600 dark:text-primary-400" />
                  </button>
                  <button
                    onClick={() => handleDelete(doctor.id)}
                    className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} className="text-red-600 dark:text-red-400" />
                  </button>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                Dr. {doctor.name}
              </h3>
              <p className="text-sm text-primary-600 dark:text-primary-400 mb-3 font-semibold">
                {doctor.specialty}
              </p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <span className="font-medium mr-2">Contact:</span>
                  {doctor.contact}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Available:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {doctor.availableDays.split(',').map((day, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 rounded-lg text-xs font-medium border border-primary-200 dark:border-primary-800"
                      >
                        {day.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <EmptyState
            title="No doctors found"
            description="Get started by adding your first doctor"
            icon={UserCog}
            action={
              <Button icon={Plus} onClick={() => openModal()}>
                Add Doctor
              </Button>
            }
          />
        </Card>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Specialty
            </label>
            <select
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="">Select a specialty</option>
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Contact"
            name="contact"
            type="tel"
            value={formData.contact}
            onChange={handleChange}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Available Days (comma-separated)
            </label>
            <input
              type="text"
              name="availableDays"
              value={formData.availableDays}
              onChange={handleChange}
              placeholder="Monday,Tuesday,Wednesday"
              className="input-field"
              required
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Enter days separated by commas
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              {editingDoctor ? 'Update Doctor' : 'Add Doctor'}
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

export default Doctors;
