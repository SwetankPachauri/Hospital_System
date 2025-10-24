import React from 'react';
import PlasmaBackground from './PlasmaBackground';
import DotGridBackground from './DotGridBackground';

const AnimatedBackground = ({ variant = 'gradient', className = '' }) => {
  // Gradient Mesh Background
  if (variant === 'gradient') {
    return (
      <div className={`fixed inset-0 -z-10 ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-cyan-100 dark:from-gray-900 dark:via-blue-950 dark:to-gray-900" />
        
        {/* Animated Gradient Orbs - Much More Visible */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-400/40 dark:bg-blue-500/30 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-cyan-400/40 dark:bg-cyan-500/30 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-[800px] h-[800px] bg-sky-400/40 dark:bg-sky-500/30 rounded-full blur-3xl animate-blob animation-delay-4000" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-400/30 dark:bg-indigo-500/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        
        {/* Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.08]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(14, 165, 233) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        />
      </div>
    );
  }

  // Dots Pattern Background
  if (variant === 'dots') {
    return (
      <div className={`fixed inset-0 -z-10 ${className}`}>
        <div className="absolute inset-0 bg-white dark:bg-gray-900" />
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.08]"
          style={{
            backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        />
      </div>
    );
  }

  // Grid Lines Background
  if (variant === 'grid') {
    return (
      <div className={`fixed inset-0 -z-10 ${className}`}>
        <div className="absolute inset-0 bg-white dark:bg-gray-900" />
        <div 
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </div>
    );
  }

  // Waves Background
  if (variant === 'waves') {
    return (
      <div className={`fixed inset-0 -z-10 ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800" />
        
        {/* Wave Layers */}
        <svg 
          className="absolute bottom-0 left-0 w-full h-64 opacity-20 dark:opacity-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path 
            fill="#0ea5e9" 
            fillOpacity="0.3"
            d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,165.3C672,160,768,96,864,90.7C960,85,1056,139,1152,154.7C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
        
        <svg 
          className="absolute bottom-0 left-0 w-full h-64 opacity-30 dark:opacity-20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path 
            fill="#0284c7" 
            fillOpacity="0.4"
            d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,234.7C672,245,768,235,864,213.3C960,192,1056,160,1152,149.3C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
    );
  }

  // Particles Background
  if (variant === 'particles') {
    return (
      <div className={`fixed inset-0 -z-10 ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary-400/20 dark:bg-primary-600/10 animate-float"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${5 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>
    );
  }

  // Plasma Background (ReactBits)
  if (variant === 'plasma') {
    return (
      <div className={`fixed inset-0 overflow-hidden ${className}`} style={{ zIndex: -1 }}>
        <PlasmaBackground />
      </div>
    );
  }

  // Dot Grid Background
  if (variant === 'dotgrid') {
    return (
      <div className={`fixed inset-0 ${className}`} style={{ zIndex: -1 }}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
        <DotGridBackground 
          dotSize={6} 
          dotColor="rgba(14, 165, 233, 1)" 
          spacing={20}
          className=""
        />
      </div>
    );
  }

  // Default: Simple gradient
  return (
    <div className={`fixed inset-0 -z-10 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
    </div>
  );
};

export default AnimatedBackground;
