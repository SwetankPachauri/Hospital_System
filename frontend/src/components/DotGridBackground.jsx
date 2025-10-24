import React from 'react';

const DotGridBackground = ({ dotSize = 1, dotColor = 'rgba(0, 0, 0, 0.2)', spacing = 30, className = '' }) => {
  return (
    <div
      className={`fixed inset-0 ${className}`}
      style={{
        zIndex: -1,
        pointerEvents: 'none',
        backgroundImage: `radial-gradient(circle, ${dotColor} ${dotSize}px, transparent ${dotSize}px)`,
        backgroundSize: `${spacing}px ${spacing}px`,
        backgroundColor: 'transparent'
      }}
    />
  );
};

export default DotGridBackground;
