// Example: Adding backgrounds from popular websites

// ============================================
// EXAMPLE 1: Hero Patterns Background
// ============================================
// Website: https://heropatterns.com/
// Choose a pattern, then add this to AnimatedBackground.jsx

if (variant === 'circuit') {
  return (
    <div className={`fixed inset-0 -z-10 ${className}`}>
      <div 
        className="absolute inset-0 opacity-10 dark:opacity-5"
        style={{
          backgroundColor: '#f0f9ff',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%230ea5e9' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
}

// ============================================
// EXAMPLE 2: Animated Gradient from Coolbackgrounds.io
// ============================================
// Website: https://coolbackgrounds.io/

if (variant === 'mesh-gradient') {
  return (
    <div className={`fixed inset-0 -z-10 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 dark:from-blue-900 dark:via-purple-900 dark:to-pink-900 opacity-30" />
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(at 40% 20%, hsla(217,100%,50%,0.3) 0px, transparent 50%),
            radial-gradient(at 80% 0%, hsla(189,100%,56%,0.3) 0px, transparent 50%),
            radial-gradient(at 0% 50%, hsla(355,100%,93%,0.3) 0px, transparent 50%),
            radial-gradient(at 80% 50%, hsla(340,100%,76%,0.3) 0px, transparent 50%),
            radial-gradient(at 0% 100%, hsla(22,100%,77%,0.3) 0px, transparent 50%)
          `
        }}
      />
    </div>
  );
}

// ============================================
// EXAMPLE 3: SVG Background from SVGBackgrounds.com
// ============================================
// Website: https://www.svgbackgrounds.com/

if (variant === 'layered-waves') {
  return (
    <div className={`fixed inset-0 -z-10 ${className}`}>
      <div className="absolute inset-0 bg-white dark:bg-gray-900" />
      <svg 
        className="absolute bottom-0 left-0 w-full h-96"
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path 
          fill="#0ea5e9" 
          fillOpacity="0.1"
          d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
        <path 
          fill="#0284c7" 
          fillOpacity="0.15"
          d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,213.3C960,203,1056,181,1152,181.3C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </svg>
    </div>
  );
}

// ============================================
// EXAMPLE 4: Topography Pattern from Hero Patterns
// ============================================

if (variant === 'topography') {
  return (
    <div className={`fixed inset-0 -z-10 ${className}`}>
      <div 
        className="absolute inset-0 opacity-[0.07] dark:opacity-[0.05]"
        style={{
          backgroundColor: '#ffffff',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='199' viewBox='0 0 100 199'%3E%3Cg fill='%230ea5e9' fill-opacity='0.4'%3E%3Cpath d='M0 199V0h1v1.99L100 199h-1.12L1 4.22V199H0zM100 2h-.12l-1-2H100v2z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
}

// ============================================
// EXAMPLE 5: Animated Particles with Canvas
// ============================================

if (variant === 'canvas-particles') {
  // This would require a more complex setup with useEffect and canvas
  // For now, here's a simpler CSS version
  return (
    <div className={`fixed inset-0 -z-10 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800" />
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 4 + 1}px`,
            height: `${Math.random() * 4 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            backgroundColor: `rgba(14, 165, 233, ${Math.random() * 0.5})`,
            animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
            animationDelay: `${i * 0.1}s`
          }}
        />
      ))}
    </div>
  );
}

// ============================================
// EXAMPLE 6: Geometric Pattern from BGJar
// ============================================
// Website: https://bgjar.com/

if (variant === 'geometric') {
  return (
    <div className={`fixed inset-0 -z-10 ${className}`}>
      <div 
        className="absolute inset-0 opacity-10 dark:opacity-5"
        style={{
          backgroundColor: '#f0f9ff',
          backgroundImage: `
            linear-gradient(30deg, #0ea5e9 12%, transparent 12.5%, transparent 87%, #0ea5e9 87.5%, #0ea5e9),
            linear-gradient(150deg, #0ea5e9 12%, transparent 12.5%, transparent 87%, #0ea5e9 87.5%, #0ea5e9),
            linear-gradient(30deg, #0ea5e9 12%, transparent 12.5%, transparent 87%, #0ea5e9 87.5%, #0ea5e9),
            linear-gradient(150deg, #0ea5e9 12%, transparent 12.5%, transparent 87%, #0ea5e9 87.5%, #0ea5e9),
            linear-gradient(60deg, #0284c7 25%, transparent 25.5%, transparent 75%, #0284c7 75%, #0284c7),
            linear-gradient(60deg, #0284c7 25%, transparent 25.5%, transparent 75%, #0284c7 75%, #0284c7)
          `,
          backgroundSize: '80px 140px',
          backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px'
        }}
      />
    </div>
  );
}

// ============================================
// HOW TO USE THESE EXAMPLES
// ============================================
/*
1. Copy any example above
2. Paste it into /frontend/src/components/AnimatedBackground.jsx
   (Add before the default return statement at the end)
3. Use it in your components:
   
   <AnimatedBackground variant="circuit" />
   <AnimatedBackground variant="mesh-gradient" />
   <AnimatedBackground variant="layered-waves" />
   <AnimatedBackground variant="topography" />
   <AnimatedBackground variant="canvas-particles" />
   <AnimatedBackground variant="geometric" />
*/
