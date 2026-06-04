import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, BarChart3, Users, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ElementType> = {
  Users,
  BarChart3,
  Zap,
};

interface Project {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  tags: string[];
  stats: { value: string; label: string }[];
  insights: { title: string; desc: string }[];
  icon: string;
  detail?: {
    background: string;
    methods: string[];
    results: string[];
    tools: string[];
  };
}

function ProjectBlock({ project, index }: { project: Project; index: number }) {
  const gridRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const cardItemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const grid = gridRef.current;
    const wrap = wrapRef.current;
    const image = imageRef.current;
    const cards = cardsRef.current;
    if (!grid || !wrap || !image) return;

    wrap.style.setProperty('--grid-width', '105%');
    wrap.style.setProperty('--grid-columns', '8');

    const map = gsap.utils.mapRange;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrap,
        start: 'top 80%',
        end: '40% 50%',
        scrub: true,
      },
    });

    tl.eventCallback('onUpdate', () => {
      const progress = tl.progress();
      wrap.style.setProperty('--grid-inner-scale', String(map(progress, 0, 1, 1.8, 1)));
      wrap.style.setProperty(
        '--grid-item-ratio',
        String(map(progress, 0, 1, 0.8, window.innerWidth < 1024 ? 1.5 : 1))
      );
      wrap.style.setProperty('border-radius', `${map(progress, 0, 1, 300, 10)}px`);
      wrap.style.setProperty('--grid-gap', `${map(progress, 0, 1, 60, 0)}px`);
    });

    tl.fromTo(
      image,
      { scale: 0.4, transformOrigin: '50% 0%' },
      { scale: 1, ease: 'power3' },
      0
    );

    if (cards && cardItemsRef.current.length > 0) {
      const cardTimeline = gsap.timeline({
        defaults: { ease: 'power2' },
        scrollTrigger: {
          trigger: cards,
          start: 'top center',
        },
      });

      cardTimeline.from(cards, {
        clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
        ease: 'sine',
        duration: 0.8,
      });

      cardTimeline.fromTo(
        cardItemsRef.current,
        {
          clipPath: 'polygon(50% 0%, 50% 50%, 50% 50%, 50% 100%)',
          filter: 'brightness(300%)',
        },
        {
          clipPath: 'polygon(50% 0%, 100% 50%, 100% 50%, 50% 100%)',
          filter: 'brightness(100%)',
          ease: 'sine',
          stagger: { amount: 0.3, from: 'center' },
        },
        '-=0.4'
      );

      cardTimeline.from(
        cardItemsRef.current,
        {
          yPercent: 100,
          duration: 0.5,
          ease: 'power1',
          stagger: { amount: 0.3, from: 'end' },
        },
        '-=0.6'
      );
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === wrap || st.trigger === cards) st.kill();
      });
    };
  }, []);

  const IconComp = iconMap[project.icon] || Users;

  return (
    <div ref={gridRef} className="mb-32 md:mb-48">
      {/* Project header */}
      <div className="max-w-6xl mx-auto px-6 lg:px-10 mb-12">
        <div className="flex items-start justify-between flex-wrap gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono-data text-xs text-[#F8F9FA] tracking-wider">
                #{String(index + 1).padStart(2, '0')}
              </span>
              <div className="w-8 h-px bg-[#334155]" />
              <IconComp size={16} className="text-[#F8F9FA]" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-[#F8F9FA] mb-2">
              {project.title}
            </h3>
            <p className="text-sm text-[#A1A1AA] font-mono-data">
              {project.subtitle}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-mono-data text-[#A1A1AA] border border-[#334155] rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Morphing dashboard */}
      <div
        ref={wrapRef}
        className="relative w-full overflow-hidden mx-auto"
        style={{
          width: 'var(--grid-width, 105%)',
          marginLeft: 'calc((100% - var(--grid-width, 105%)) / 2)',
          borderRadius: '300px',
          background: 'rgba(255,255,255,0.02)',
          backdropFilter: 'blur(10px)',
          transform: 'scale(var(--grid-inner-scale, 1.8))',
        }}
      >
        <div
          ref={imageRef}
          className="relative w-full overflow-hidden"
          style={{
            aspectRatio: 'var(--grid-item-ratio, 0.8)',
            maxHeight: '70vh',
          }}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.9) contrast(1.05)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />

          {/* Stats overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="flex items-center justify-center gap-8 md:gap-16">
              {project.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl md:text-4xl font-bold text-[#3B82F6] font-mono-data">
                    {stat.value}
                  </p>
                  <p className="text-xs text-[#A1A1AA] mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Insight cards */}
      <div
        ref={cardsRef}
        className="max-w-6xl mx-auto px-6 lg:px-10 mt-8"
        style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {project.insights.map((insight, i) => (
            <div
              key={insight.title}
              ref={(el) => {
                if (el) cardItemsRef.current[i] = el;
              }}
              className="liquid-glass rounded-2xl p-6 hover-lift"
              style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
            >
              <p className="font-mono-data text-xs text-[#3B82F6] mb-3 tracking-wider">
                INSIGHT {String(i + 1).padStart(2, '0')}
              </p>
              <h4 className="text-lg font-bold text-[#F8F9FA] mb-2">{insight.title}</h4>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">{insight.desc}</p>
            </div>
          ))}
        </div>

        {/* View case study link */}
        <div className="mt-8 text-center">
          <Link
            to={`/projects/${project.id}`}
            className="inline-flex items-center gap-2 text-sm text-[#3B82F6] hover:text-[#F8F9FA] transition-colors duration-300 group"
          >
            <span>查看完整案例分析</span>
            <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch('/projects.json')
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error('Failed to load projects:', err));
  }, []);

  return (
    <section
      className="relative w-full section-padded"
      style={{ background: '#050505' }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-10 mb-20">
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono-data text-xs tracking-widest text-[#3B82F6]">
            SELECTED WORKS
          </span>
          <div className="flex-1 h-px bg-[#334155]" />
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-[#F8F9FA] tracking-tight">
          核心案例透视
        </h2>
        <p className="text-[#A1A1AA] mt-4 max-w-xl leading-relaxed">
          每一个项目都是一次从商业问题出发，通过数据分析驱动策略决策的完整实践。
        </p>
      </div>

      {projects.map((project, index) => (
        <ProjectBlock key={project.id} project={project} index={index} />
      ))}
    </section>
  );
}
