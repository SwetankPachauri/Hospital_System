import React, { useEffect, useRef } from 'react';

const PlasmaBackground = ({ className = '' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error('PlasmaBackground: Canvas ref is null');
      return;
    }

    console.log('PlasmaBackground: Initializing canvas', canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('PlasmaBackground: Could not get 2d context');
      return;
    }
    
    let animationFrameId;
    let time = 0;

    // Set canvas size
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      console.log('PlasmaBackground: Canvas resized to', window.innerWidth, 'x', window.innerHeight);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Plasma effect function
    const plasma = (x, y, time) => {
      return (
        Math.sin(x * 0.04 + time) +
        Math.sin(y * 0.03 - time) +
        Math.sin((x + y) * 0.03 + time) +
        Math.sin(Math.sqrt(x * x + y * y) * 0.02 + time)
      );
    };

    // Animation loop
    const animate = () => {
      time += 0.05;
      
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Fill entire canvas with a test color first
      ctx.fillStyle = '#ff0000'; // Bright red test
      ctx.fillRect(0, 0, width, height);
      
      // Create gradient based on plasma calculation
      for (let y = 0; y < height; y += 4) {
        for (let x = 0; x < width; x += 4) {
          const value = plasma(x, y, time);
          
          // Map plasma value to very bright, vibrant colors
          const hue = 200 + value * 40;
          const saturation = 100; // Maximum saturation
          const lightness = 50 + value * 20; // Mid-range brightness
          
          ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
          ctx.fillRect(x, y, 4, 4);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    console.log('PlasmaBackground: Animation started');

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      console.log('PlasmaBackground: Cleanup');
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999, // Very high z-index for testing
        pointerEvents: 'none',
        opacity: 1,
        backgroundColor: 'lime' // Fallback color for testing
      }}
    />
  );
};

export default PlasmaBackground;
