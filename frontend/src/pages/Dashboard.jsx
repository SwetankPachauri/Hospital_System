import React, { useState, useEffect } from 'react';
import { Users, UserCog, Calendar, Receipt, TrendingUp, Activity, ArrowUpRight } from 'lucide-react';
import { Card, LoadingSpinner } from '../components/Common';
import { statsAPI } from '../services/api';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;
    
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{prefix}{count}{suffix}</span>;
};

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await statsAPI.getDashboard();
      setStats(response.data);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Patients',
      value: stats?.totalPatients || 0,
      icon: Users,
      color: 'bg-gradient-to-br from-primary-600 to-primary-700',
      bgLight: 'bg-primary-50 dark:bg-primary-900/20',
      trend: '+12%'
    },
    {
      title: 'Total Doctors',
      value: stats?.totalDoctors || 0,
      icon: UserCog,
      color: 'bg-gradient-to-br from-primary-500 to-primary-600',
      bgLight: 'bg-primary-50 dark:bg-primary-900/20',
      trend: '+5%'
    },
    {
      title: 'Appointments Today',
      value: stats?.appointmentsToday || 0,
      icon: Calendar,
      color: 'bg-gradient-to-br from-gray-800 to-black',
      bgLight: 'bg-gray-50 dark:bg-gray-900/20',
      trend: '+8%'
    },
    {
      title: 'Revenue This Month',
      value: `$${stats?.revenueThisMonth || 0}`,
      icon: Receipt,
      color: 'bg-gradient-to-br from-primary-700 to-primary-800',
      bgLight: 'bg-primary-50 dark:bg-primary-900/20',
      trend: '+15%'
    }
  ];

  // Sample chart data
  const appointmentData = stats?.appointmentsByDay || [
    { day: 'Mon', appointments: 12 },
    { day: 'Tue', appointments: 19 },
    { day: 'Wed', appointments: 15 },
    { day: 'Thu', appointments: 22 },
    { day: 'Fri', appointments: 18 },
    { day: 'Sat', appointments: 10 },
    { day: 'Sun', appointments: 8 }
  ];

  const revenueData = stats?.revenueByMonth || [
    { month: 'Jan', revenue: 4000 },
    { month: 'Feb', revenue: 3000 },
    { month: 'Mar', revenue: 5000 },
    { month: 'Apr', revenue: 4500 },
    { month: 'May', revenue: 6000 },
    { month: 'Jun', revenue: 5500 }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-400 dark:to-primary-600 bg-clip-text text-transparent mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-900/20 rounded-xl border border-primary-200 dark:border-primary-800">
          <Activity className="w-5 h-5 text-primary-600 dark:text-primary-400 animate-pulse" />
          <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">Live Dashboard</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card 
            key={index} 
            className="relative overflow-hidden group hover:shadow-2xl hover:shadow-primary-500/20 dark:hover:shadow-primary-600/30 transition-all duration-500 hover:-translate-y-2 cursor-pointer border-0"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="flex items-center justify-between relative z-10">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold uppercase tracking-wide">
                    {stat.title}
                  </p>
                </div>
                <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3 transition-all duration-300 group-hover:scale-110 origin-left">
                  {stat.title.includes('Revenue') ? (
                    <>
                      $<AnimatedCounter end={parseInt(stat.value.replace('$', ''))} />
                    </>
                  ) : (
                    <AnimatedCounter end={stat.value} />
                  )}
                </h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 px-2 py-1 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                    <ArrowUpRight size={14} className="text-emerald-600 dark:text-emerald-400" />
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                      {stat.trend}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">from last month</span>
                </div>
              </div>
              <div className={`${stat.color} p-5 rounded-2xl shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-white/20 group-hover:animate-pulse" />
                <stat.icon className="w-10 h-10 text-white relative z-10" strokeWidth={2.5} />
              </div>
            </div>
            
            {/* Animated bottom border */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full" />
            
            {/* Corner glow effect */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl group-hover:bg-primary-500/20 transition-all duration-500" />
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointments Chart */}
        <Card className="hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500 hover:-translate-y-1 border-0 overflow-hidden group">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Appointments This Week
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Weekly overview</p>
            </div>
            <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Calendar className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={appointmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" opacity={0.3} />
              <XAxis dataKey="day" stroke="#6b7280" className="dark:stroke-gray-400" style={{ fontSize: '12px', fontWeight: 600 }} />
              <YAxis stroke="#6b7280" className="dark:stroke-gray-400" style={{ fontSize: '12px', fontWeight: 600 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff',
                  border: 'none',
                  borderRadius: '16px',
                  color: '#111827',
                  boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                  padding: '12px 16px',
                  fontWeight: 600
                }}
                cursor={{ fill: 'rgba(59, 130, 246, 0.1)', radius: 8 }}
              />
              <Bar 
                dataKey="appointments" 
                fill="url(#colorAppointments)" 
                radius={[12, 12, 0, 0]}
                animationDuration={1500}
                animationBegin={0}
              />
              <defs>
                <linearGradient id="colorAppointments" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff8752" stopOpacity={1} />
                  <stop offset="100%" stopColor="#ff6e34" stopOpacity={0.8} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Revenue Chart */}
        <Card className="hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-1 border-0 overflow-hidden group">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Revenue Trend
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Last 6 months</p>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" opacity={0.3} />
              <XAxis dataKey="month" stroke="#6b7280" className="dark:stroke-gray-400" style={{ fontSize: '12px', fontWeight: 600 }} />
              <YAxis stroke="#6b7280" className="dark:stroke-gray-400" style={{ fontSize: '12px', fontWeight: 600 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff',
                  border: 'none',
                  borderRadius: '16px',
                  color: '#111827',
                  boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                  padding: '12px 16px',
                  fontWeight: 600
                }}
                cursor={{ stroke: '#0ea5e9', strokeWidth: 2 }}
              />
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff8752" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#ff8752" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="url(#lineGradient)" 
                strokeWidth={4}
                dot={{ fill: '#ff8752', r: 7, strokeWidth: 3, stroke: '#fff' }}
                activeDot={{ r: 9, strokeWidth: 3, fill: '#ff8752', stroke: '#fff' }}
                animationDuration={2000}
                animationBegin={200}
              />
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ff8752" />
                  <stop offset="100%" stopColor="#ff6e34" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Recent Activity
        </h3>
        <div className="space-y-4">
          {stats?.recentActivity?.length > 0 ? (
            stats.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-4 pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0 hover:bg-gray-50 dark:hover:bg-gray-900/50 -mx-2 px-2 py-2 rounded-lg transition-colors">
                <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center flex-shrink-0">
                  <Activity className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {activity.title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 font-medium">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <Activity className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
              <p className="text-gray-500 dark:text-gray-400 font-medium">No recent activity</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
