import { useEffect, useRef } from 'react';

export default function HeroTypography() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const ang = -12 + x * 6;
      container.style.setProperty('--ang', `${ang}deg`);
      container.style.perspectiveOrigin = `${50 + x * 10}% ${50 + y * 10}%`;
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const depthSlices = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div ref={containerRef} className="hero-3d-container" style={{ '--ang': '-12deg' } as React.CSSProperties}>
      {/* Main 3D text layer */}
      <h1 className="hero-3d-text" data-text="数据驱动战略">
        <span className="hero-3d-text" data-text="数据驱动战略">
          {depthSlices.map((i) => (
            <span key={i} data-text="数据驱动战略" />
          ))}
        </span>
      </h1>

      {/* Top occlusion shadow */}
      <h1 className="hero-3d-text hero-3d-shadow-top" data-text="数据驱动战略">
        <span data-text="数据驱动战略" />
        <span data-text="数据驱动战略" />
        <span data-text="数据驱动战略" />
      </h1>

      {/* Bottom reflection */}
      <h1 className="hero-3d-text hero-3d-shadow-bottom" data-text="数据驱动战略">
        <span data-text="数据驱动战略" />
        <div className="glass-reflection" />
        <span data-text="数据驱动战略" />
      </h1>
    </div>
  );
}
