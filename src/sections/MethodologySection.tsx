import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { label: '商业问题', sub: 'Business Problem' },
  { label: '数据收集', sub: 'Data Collection' },
  { label: '深度洞察', sub: 'Insight' },
  { label: '策略建议', sub: 'Strategy' },
  { label: '业务影响', sub: 'Impact' },
];

export default function MethodologySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const phraseRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);
  const lastVelRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    const phraseEl = phraseRef.current;
    if (!section || !phraseEl) return;

    // Split text into characters
    const text = '方法论 \u00B7 METHODOLOGY';
    phraseEl.innerHTML = '';
    const chars: HTMLSpanElement[] = [];
    for (let i = 0; i < text.length; i++) {
      const span = document.createElement('span');
      span.textContent = text[i];
      span.style.display = 'inline-block';
      span.style.willChange = 'transform, color';
      phraseEl.appendChild(span);
      chars.push(span);
    }
    charsRef.current = chars;

    // Track scroll velocity manually
    let lastScroll = window.scrollY;
    let currentVel = 0;
    let rafId: number;

    const updateVel = () => {
      const now = window.scrollY;
      currentVel = now - lastScroll;
      lastScroll = now;
      rafId = requestAnimationFrame(updateVel);
    };
    rafId = requestAnimationFrame(updateVel);

    // Create scroll-driven animation
    const st = ScrollTrigger.create({
      trigger: phraseEl,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: () => {
        // Map velocity through 3-stage range mapping
        // Stage 1: (-100, 100) -> (1, -1)
        const v1 = Math.max(-100, Math.min(100, currentVel));
        const stage1 = gsap.utils.mapRange(-100, 100, 1, -1, v1);
        // Stage 2: (1, -1) -> (-150, 150)
        const stage2 = gsap.utils.mapRange(1, -1, -150, 150, stage1);
        // Stage 3: (-150, 150) -> (-80, 80)
        const velocity = gsap.utils.mapRange(-150, 150, -80, 80, stage2);
        lastVelRef.current = velocity;

        const absVel = Math.abs(velocity);
        const threshold = absVel * 0.1;

        // Animate chars
        gsap.to(chars, {
          y: (index: number) => index * velocity * 0.1,
          rotation: (index: number) => index * velocity * 0.05,
          scaleY: (index: number) => 1 + Math.abs(index * velocity * 0.002),
          scaleX: (index: number) => 1 - Math.abs(index * velocity * 0.001),
          color: (index: number) => index >= threshold ? '#F8F9FA' : '#FF3366',
          duration: 0.4,
          ease: 'power2.out',
          overwrite: true,
        });

        // Snap back
        gsap.to(chars, {
          y: 0,
          rotation: 0,
          scale: 1,
          color: '#F8F9FA',
          duration: 0.6,
          ease: 'elastic.out(1, 0.3)',
          overwrite: 'auto',
          delay: 0.1,
        });
      },
    });

    return () => {
      st.kill();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full section-padded"
      style={{ background: 'linear-gradient(180deg, #050505 0%, #0A0A0A 50%, #050505 100%)' }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Section header */}
        <div className="text-center mb-24">
          <p className="font-mono-data text-xs tracking-widest text-[#F8F9FA] mb-4">
            MY APPROACH
          </p>
          <div
            ref={phraseRef}
            className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight inline-block"
            style={{ color: '#F8F9FA', letterSpacing: '-0.02em' }}
          >
            方法论 &middot; METHODOLOGY
          </div>
        </div>

        {/* Methodology flow */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#334155] to-transparent hidden md:block" />

          <div className="space-y-16 md:space-y-24">
            {steps.map((step, index) => (
              <div
                key={step.sub}
                className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-16 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Step content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-center`}>
                  <div className="liquid-glass rounded-2xl p-8 hover-lift inline-block">
                    <p className="font-mono-data text-xs text-[#F8F9FA] tracking-wider mb-2">
                      STEP {String(index + 1).padStart(2, '0')}
                    </p>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#F8F9FA] mb-2">
                      {step.label}
                    </h3>
                    <p className="text-sm text-[#A1A1AA] font-mono-data">
                      {step.sub}
                    </p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="relative z-10 flex-shrink-0 w-4 h-4 rounded-full bg-[#F8F9FA] shadow-lg shadow-[#F8F9FA]/30" />

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom quote */}
        <div className="mt-32 text-center">
          <p className="text-xl md:text-2xl text-[#A1A1AA] font-light leading-relaxed max-w-2xl mx-auto">
            我相信数据分析的价值
            <br />
            不在于模型本身
          </p>
          <p className="text-xl md:text-2xl text-[#F8F9FA] font-medium leading-relaxed max-w-2xl mx-auto mt-4">
            而在于推动业务决策
          </p>
        </div>
      </div>
    </section>
  );
}
