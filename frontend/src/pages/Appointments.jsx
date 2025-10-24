import React, { useState, useEffect } from 'react';
import { Plus, Search, Calendar as CalendarIcon, Clock, Edit, Trash2 } from 'lucide-react';
import { Card, Button, Input, Modal, LoadingSpinner, EmptyState, Select } from '../components/Common';
import { appointmentsAPI, doctorsAPI, patientsAPI } from '../services/api';
import toast from 'react-hot-toast';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    status: 'scheduled'
  });

  const statusOptions = [
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = appointments;

    if (searchTerm) {
      filtered = filtered.filter(apt =>
        apt.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.doctorName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterDate) {
      filtered = filtered.filter(apt => apt.date === filterDate);
    }

    setFilteredAppointments(filtered);
  }, [searchTerm, filterDate, appointments]);

  const fetchData = async () => {
    try {
      const [aptsRes, docsRes, patsRes] = await Promise.all([
        appointmentsAPI.getAll(),
        doctorsAPI.getAll(),
        patientsAPI.getAll()
      ]);

      const aptsWithNames = aptsRes.data.map(apt => {
        const doctor = docsRes.data.find(d => d.id === apt.doctorId);
        const patient = patsRes.data.find(p => p.id === apt.patientId);
        return {
          ...apt,
          doctorName: doctor?.name || 'Unknown',
          patientName: patient?.name || 'Unknown'
        };
      });

      setAppointments(aptsWithNames);
      setFilteredAppointments(aptsWithNames);
      setDoctors(docsRes.data);
      setPatients(patsRes.data);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingAppointment) {
        await appointmentsAPI.update(editingAppointment.id, formData);
        toast.success('Appointment updated successfully');
      } else {
        await appointmentsAPI.create(formData);
        toast.success('Appointment created successfully');
      }
      fetchData();
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this appointment?')) return;

    try {
      await appointmentsAPI.delete(id);
      toast.success('Appointment deleted successfully');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete appointment');
    }
  };

  const openModal = (appointment = null) => {
    if (appointment) {
      setEditingAppointment(appointment);
      setFormData({
        patientId: appointment.patientId,
        doctorId: appointment.doctorId,
        date: appointment.date,
        time: appointment.time,
        status: appointment.status
      });
    } else {
      setEditingAppointment(null);
      setFormData({
        patientId: '',
        doctorId: '',
        date: new Date().toISOString().split('T')[0],
        time: '09:00',
        status: 'scheduled'
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingAppointment(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled':
        return 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 border border-primary-200 dark:border-primary-800';
      case 'completed':
        return 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800';
      case 'cancelled':
        return 'bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-400 border border-gray-300 dark:border-gray-700';
      default:
        return 'bg-gray-50 dark:bg-gray-900/20 text-gray-700 dark:text-gray-400 border border-gray-200 dark:border-gray-700';
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Appointments</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage patient appointments</p>
        </div>
        <Button icon={Plus} onClick={() => openModal()}>
          New Appointment
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by patient or doctor name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <div className="relative">
            <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="input-field pl-10"
            />
          </div>
        </div>
      </Card>

      {/* Appointments List */}
      {filteredAppointments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAppointments.map((appointment) => (
            <Card key={appointment.id} className="hover:shadow-lg transition-all duration-300">
              <div className="flex items-start justify-between mb-3">
                <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${getStatusColor(appointment.status)}`}>
                  {appointment.status}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(appointment)}
                    className="p-1.5 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                  >
                    <Edit size={16} className="text-primary-600 dark:text-primary-400" />
                  </button>
                  <button
                    onClick={() => handleDelete(appointment.id)}
                    className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} className="text-red-600 dark:text-red-400" />
                  </button>
                </div>
              </div>

              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                {appointment.patientName}
              </h3>
              
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Doctor:</span>
                  Dr. {appointment.doctorName}
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon size={14} />
                  {appointment.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} />
                  {appointment.time}
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <EmptyState
            title="No appointments found"
            description="Schedule your first appointment"
            icon={CalendarIcon}
            action={
              <Button icon={Plus} onClick={() => openModal()}>
                New Appointment
              </Button>
            }
          />
        </Card>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingAppointment ? 'Edit Appointment' : 'New Appointment'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label="Patient"
            name="patientId"
            value={formData.patientId}
            onChange={handleChange}
            options={patients.map(p => ({ value: p.id, label: p.name }))}
            required
          />

          <Select
            label="Doctor"
            name="doctorId"
            value={formData.doctorId}
            onChange={handleChange}
            options={doctors.map(d => ({ value: d.id, label: `Dr. ${d.name} (${d.specialty})` }))}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
            />

            <Input
              label="Time"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>

          <Select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            options={statusOptions}
            required
          />

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              {editingAppointment ? 'Update Appointment' : 'Create Appointment'}
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

export default Appointments;
