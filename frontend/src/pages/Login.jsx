import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Hospital, Mail, Lock, Activity, Sparkles, Heart, Stethoscope } from 'lucide-react';
import { Input, Button } from '../components/Common';
import VibrantBackground from '../components/VibrantBackground';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Vibrant Animated Background */}
      <VibrantBackground />

      {/* Login Form */}
      <div className="max-w-md w-full relative animate-fade-in-up" style={{ zIndex: 1 }}>
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white dark:bg-gray-800 rounded-3xl mb-6 shadow-2xl border border-gray-100 dark:border-gray-700 hover:scale-110 transition-transform duration-300 group">
            <Hospital className="w-12 h-12 text-primary-600 dark:text-primary-400 group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
            Hospital Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg font-light tracking-wide">
            Sign in to your account
          </p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="w-8 h-0.5 bg-primary-400 dark:bg-primary-600 rounded-full" />
            <Sparkles className="w-4 h-4 text-primary-500 dark:text-primary-400" />
            <div className="w-8 h-0.5 bg-primary-400 dark:bg-primary-600 rounded-full" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-2xl border border-gray-100 dark:border-gray-700 rounded-3xl p-8 hover:shadow-3xl transition-all duration-500 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="group/input">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 group-hover/input:text-primary-600 dark:group-hover/input:text-primary-400 transition-colors">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 group-hover/input:text-primary-500 dark:group-hover/input:text-primary-400 transition-colors" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-600 focus:border-primary-500 focus:bg-white dark:focus:bg-gray-800 transition-all duration-300 hover:border-primary-300 dark:hover:border-primary-700"
                  placeholder="admin@hospital.com"
                />
              </div>
            </div>

            <div className="group/input">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 group-hover/input:text-primary-600 dark:group-hover/input:text-primary-400 transition-colors">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 group-hover/input:text-primary-500 dark:group-hover/input:text-primary-400 transition-colors" size={20} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-600 focus:border-primary-500 focus:bg-white dark:focus:bg-gray-800 transition-all duration-300 hover:border-primary-300 dark:hover:border-primary-700"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 dark:from-primary-500 dark:to-primary-600 dark:hover:from-primary-600 dark:hover:to-primary-700 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group/btn border-0"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <Sparkles className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-primary-600 dark:text-primary-400 font-bold hover:underline decoration-2 underline-offset-4 hover:text-primary-700 dark:hover:text-primary-300 transition-colors inline-flex items-center gap-1"
              >
                Sign up
                <Sparkles className="w-3 h-3" />
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-700 dark:text-gray-300 text-center mb-3 font-semibold flex items-center justify-center gap-2">
              <Sparkles className="w-3 h-3 text-primary-500" />
              Demo Credentials
              <Sparkles className="w-3 h-3 text-primary-500" />
            </p>
            <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-2.5 border border-gray-200 dark:border-gray-700 hover:bg-primary-50 dark:hover:bg-primary-900/10 hover:border-primary-200 dark:hover:border-primary-800 transition-all">
                <span className="font-semibold text-gray-900 dark:text-gray-100">Admin:</span> admin@hospital.com / admin123
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-2.5 border border-gray-200 dark:border-gray-700 hover:bg-primary-50 dark:hover:bg-primary-900/10 hover:border-primary-200 dark:hover:border-primary-800 transition-all">
                <span className="font-semibold text-gray-900 dark:text-gray-100">Doctor:</span> doctor@hospital.com / doctor123
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-2.5 border border-gray-200 dark:border-gray-700 hover:bg-primary-50 dark:hover:bg-primary-900/10 hover:border-primary-200 dark:hover:border-primary-800 transition-all">
                <span className="font-semibold text-gray-900 dark:text-gray-100">Receptionist:</span> receptionist@hospital.com / recep123
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
