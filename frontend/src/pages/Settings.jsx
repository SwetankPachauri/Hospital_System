import React, { useState } from 'react';
import { User, Lock, Save } from 'lucide-react';
import { Card, Button, Input } from '../components/Common';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Settings = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    // In production, call API to update profile
    toast.success('Profile updated successfully');
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    // In production, call API to update password
    toast.success('Password updated successfully');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your account settings and preferences</p>
      </div>

      {/* Profile Settings */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center">
            <User className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Profile Information</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Update your account details</p>
          </div>
        </div>

        <form onSubmit={handleProfileSubmit} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            value={profileData.name}
            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
            required
          />

          <Input
            label="Email Address"
            type="email"
            value={profileData.email}
            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Role
            </label>
            <input
              type="text"
              value={profileData.role}
              className="input-field capitalize"
              disabled
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Role cannot be changed
            </p>
          </div>

          <Button type="submit" icon={Save}>
            Save Changes
          </Button>
        </form>
      </Card>

      {/* Password Settings */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <Lock className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Change Password</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Update your password</p>
          </div>
        </div>

        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <Input
            label="Current Password"
            type="password"
            value={passwordData.currentPassword}
            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
            required
          />

          <Input
            label="New Password"
            type="password"
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
            required
            minLength={6}
          />

          <Input
            label="Confirm New Password"
            type="password"
            value={passwordData.confirmPassword}
            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
            required
            minLength={6}
          />

          <Button type="submit" icon={Save}>
            Update Password
          </Button>
        </form>
      </Card>

      {/* App Info */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">About</h2>
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <p><strong className="text-gray-900 dark:text-white">Application:</strong> Hospital Management System</p>
          <p><strong className="text-gray-900 dark:text-white">Version:</strong> 1.0.0</p>
          <p><strong className="text-gray-900 dark:text-white">Description:</strong> A comprehensive hospital management solution for managing patients, doctors, appointments, and billing.</p>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
