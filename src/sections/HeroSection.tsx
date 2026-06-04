import { useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ArrowRight, Database, TrendingUp, Settings, Lightbulb } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);

  // Initialize particles
  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    const count = Math.floor((width * height) / 2500);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3.5 + 1.2,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.8 + 0.5,
        twinkleSpeed: Math.random() * 0.05 + 0.02,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }
    particlesRef.current = particles;
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      initParticles(rect.width, rect.height);
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let time = 0;
    const animate = () => {
      time += 1;
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      particles.forEach((p) => {
        // Twinkle effect
        const twinkle = Math.sin(time * p.twinkleSpeed + p.twinkleOffset);
        const currentOpacity = p.opacity * (0.6 + twinkle * 0.4);

        // Mouse interaction - gentle repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180 && dist > 0) {
          const force = (180 - dist) / 180;
          p.x += (dx / dist) * force * 2;
          p.y += (dy / dist) * force * 2;
        }

        // Move
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around
        if (p.x < 0) p.x = rect.width;
        if (p.x > rect.width) p.x = 0;
        if (p.y < 0) p.y = rect.height;
        if (p.y > rect.height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.fill();

        // Draw glow for all particles
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 5);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity * 0.4})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 5, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const opacity = (1 - dist / 140) * 0.35;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [initParticles]);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-line', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        delay: 0.2,
        ease: 'power3.out',
      });
      gsap.from('.hero-tag', {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        delay: 0.8,
        ease: 'back.out(1.7)',
      });
      gsap.from('.hero-accent-line', {
        width: 0,
        duration: 1.2,
        delay: 0.5,
        ease: 'power3.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const tags = [
    { label: '数据分析', icon: Database },
    { label: '用户增长', icon: TrendingUp },
    { label: '运营优化', icon: Settings },
    { label: '策略制定', icon: Lightbulb },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center overflow-hidden"
      style={{ background: '#050505' }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={import.meta.env.BASE_URL + 'images/hero-bg.jpg'}
          alt="Background"
          className="w-full h-full object-cover"
          style={{
            objectPosition: '75% center',
            filter: 'brightness(0.85)',
          }}
        />
        {/* Multi-layer gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(110deg, 
                rgba(10,22,40,0.98) 0%, 
                rgba(10,22,40,0.85) 35%, 
                rgba(10,22,40,0.5) 55%, 
                rgba(10,22,40,0.15) 70%, 
                transparent 100%
              )
            `,
          }}
        />
        {/* Subtle radial glow */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(ellipse at 30% 50%, rgba(59,130,246,0.15) 0%, transparent 60%)',
          }}
        />
      </div>

      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[1] pointer-events-auto"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Floating light orbs */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <div
          className="absolute w-96 h-96 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
            top: '15%',
            left: '5%',
            animation: 'float 8s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-72 h-72 rounded-full opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)',
            top: '55%',
            left: '20%',
            animation: 'float 10s ease-in-out infinite 2s',
          }}
        />
        <div
          className="absolute w-56 h-56 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
            top: '35%',
            left: '2%',
            animation: 'float 12s ease-in-out infinite 4s',
          }}
        />
        <div
          className="absolute w-48 h-48 rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)',
            top: '75%',
            left: '15%',
            animation: 'float 9s ease-in-out infinite 1s',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16 py-20">
        <div className="max-w-2xl">
          {/* Label */}
          <div className="hero-line flex items-center gap-3 mb-8">
            <div className="hero-accent-line h-px bg-gradient-to-r from-white/60 to-transparent" style={{ width: 48 }} />
            <span className="text-xs font-mono tracking-[0.3em] text-white/60 uppercase">
              Data Analyst & Growth Strategist
            </span>
          </div>

          {/* Name */}
          <h1 className="hero-line text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight mb-8">
            何思源
          </h1>

          {/* Main Tagline */}
          <div className="hero-line mb-6">
            <p className="text-2xl md:text-3xl lg:text-4xl font-light text-white/95 leading-tight">
              用数据与 <span className="font-semibold text-white">AI</span> 驱动业务增长
            </p>
          </div>

          {/* Sub Tagline */}
          <div className="hero-line mb-10">
            <p className="text-base md:text-lg text-white/50 leading-relaxed max-w-lg">
              专注数据分析、用户增长与运营优化，帮助企业从数据中找到可执行的增长策略。
            </p>
          </div>

          {/* Divider */}
          <div className="hero-line w-full h-px bg-gradient-to-r from-white/30 via-white/15 to-transparent mb-10" />

          {/* Tags */}
          <div className="hero-line flex flex-wrap gap-3 mb-12">
            {tags.map((tag) => {
              const Icon = tag.icon;
              return (
                <div
                  key={tag.label}
                  className="hero-tag group flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all duration-300 cursor-default"
                >
                  <Icon size={14} className="text-white/60 group-hover:text-white/90 transition-colors" />
                  <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                    {tag.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hero-line flex items-center gap-6">
            <Link
              to="/projects"
              className="group inline-flex items-center gap-3 px-8 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full text-sm font-medium transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] backdrop-blur-sm"
            >
              <span>查看项目</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="text-sm text-white/40 hover:text-white/80 transition-colors duration-300"
            >
              联系我 →
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-10"
        style={{
          background: 'linear-gradient(to top, #050505, transparent)',
        }}
      />

      {/* Side decorative line */}
      <div className="absolute left-6 lg:left-10 top-1/3 bottom-1/3 w-px z-10 hidden lg:block">
        <div className="w-full h-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      </div>

      {/* CSS for floating animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-30px) scale(1.1); }
        }
      `}</style>
    </section>
  );
}
