import React from 'react';
import { Menu, Moon, Sun, LogOut, User, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-30 backdrop-blur-xl bg-white/80 dark:bg-dark-50/90 border-b border-gray-200/50 dark:border-primary-900/30 px-6 py-4 shadow-lg shadow-gray-200/50 dark:shadow-primary-950/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 p-2.5 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:scale-110 active:scale-95"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30">
              <span className="text-white font-black text-lg">H</span>
            </div>
            <h2 className="text-lg font-extrabold bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-400 dark:to-primary-600 bg-clip-text text-transparent hidden sm:block">
              Hospital Management System
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Notifications */}
          <button className="relative p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110 active:scale-95 group">
            <Bell size={20} className="text-gray-600 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </button>
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110 active:scale-95 group relative overflow-hidden"
          >
            {isDark ? (
              <Sun size={20} className="text-primary-600 dark:text-primary-400 group-hover:rotate-180 transition-transform duration-500" />
            ) : (
              <Moon size={20} className="text-gray-600 group-hover:rotate-12 transition-transform duration-300" />
            )}
          </button>

          {/* User Menu */}
          <div className="flex items-center gap-3 pl-3 border-l border-gray-200 dark:border-gray-700">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                {user?.name}
              </p>
              <p className="text-xs text-primary-600 dark:text-primary-400 capitalize font-semibold flex items-center gap-1 justify-end">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                {user?.role}
              </p>
            </div>
            <button
              onClick={() => navigate('/settings')}
              className="p-2.5 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300 hover:scale-110 active:scale-95 group"
            >
              <User size={20} className="text-gray-600 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
            </button>
            <button
              onClick={handleLogout}
              className="p-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 text-red-600 dark:text-red-400 hover:scale-110 active:scale-95 group"
            >
              <LogOut size={20} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
