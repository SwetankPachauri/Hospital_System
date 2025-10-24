import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserCog, 
  Calendar, 
  Receipt, 
  Settings,
  X
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Patients', icon: Users, path: '/patients' },
    { name: 'Doctors', icon: UserCog, path: '/doctors' },
    { name: 'Appointments', icon: Calendar, path: '/appointments' },
    { name: 'Billing', icon: Receipt, path: '/billing' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-white dark:bg-dark-50 border-r border-gray-100 dark:border-primary-900/30 shadow-lg
          transform transition-transform duration-200 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-primary-900/30">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-400 dark:to-primary-600 bg-clip-text text-transparent">
            HMS
          </h1>
          <button 
            onClick={onClose}
            className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => window.innerWidth < 1024 && onClose()}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                  isActive
                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-700 dark:to-primary-800 text-white shadow-lg shadow-primary-500/50 dark:shadow-primary-600/50 font-bold scale-105 animate-glow'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-primary-900/10 hover:scale-102 hover:shadow-md font-medium'
                }`
              }
            >
              {/* Glow effect overlay for active state */}
              <div className={`absolute inset-0 rounded-xl blur-xl transition-opacity duration-300 ${
                'opacity-0 group-hover:opacity-100'
              }`} style={{ background: 'radial-gradient(circle, rgba(255, 135, 82, 0.3) 0%, transparent 70%)' }} />
              
              <item.icon size={20} className="relative z-10 transition-transform duration-300 group-hover:scale-110" />
              <span className="relative z-10">{item.name}</span>
              
              {/* Shine effect on hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
