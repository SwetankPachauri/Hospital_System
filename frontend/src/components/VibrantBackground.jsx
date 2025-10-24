import React from 'react';

const VibrantBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden" style={{ zIndex: -1 }}>
      {/* Dark coral base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-dark-50 to-black dark:from-black dark:via-dark-50 dark:to-gray-950" />
      
      {/* Large Animated Orbs - Coral/Peach Theme */}
      <div 
        className="absolute -top-40 -left-40 w-[800px] h-[800px] rounded-full opacity-30 dark:opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(255, 135, 82, 0.6) 0%, rgba(255, 135, 82, 0.2) 50%, transparent 70%)',
          animation: 'float 20s ease-in-out infinite'
        }}
      />
      
      <div 
        className="absolute top-20 -right-40 w-[700px] h-[700px] rounded-full opacity-30 dark:opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(255, 184, 148, 0.6) 0%, rgba(255, 184, 148, 0.2) 50%, transparent 70%)',
          animation: 'float 18s ease-in-out infinite reverse'
        }}
      />
      
      <div 
        className="absolute -bottom-40 left-1/3 w-[900px] h-[900px] rounded-full opacity-30 dark:opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(255, 110, 52, 0.6) 0%, rgba(255, 110, 52, 0.2) 50%, transparent 70%)',
          animation: 'float 22s ease-in-out infinite'
        }}
      />
      
      <div 
        className="absolute bottom-20 right-1/4 w-[600px] h-[600px] rounded-full opacity-30 dark:opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(232, 90, 40, 0.5) 0%, rgba(232, 90, 40, 0.2) 50%, transparent 70%)',
          animation: 'float 16s ease-in-out infinite reverse'
        }}
      />
      
      {/* Floating Particles - Coral tones */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            background: `rgba(255, 135, 82, ${Math.random() * 0.4 + 0.2})`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 10 + 8}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}
      
      {/* Wave Pattern Overlay - Coral */}
      <div 
        className="absolute inset-0 opacity-5 dark:opacity-3"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 35px,
              rgba(255, 135, 82, 0.3) 35px,
              rgba(255, 135, 82, 0.3) 70px
            )
          `,
          animation: 'slide 30s linear infinite'
        }}
      />
    </div>
  );
};

export default VibrantBackground;
