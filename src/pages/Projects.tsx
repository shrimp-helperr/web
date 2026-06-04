import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Users, BarChart3, Zap } from 'lucide-react';

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

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]);

  useEffect(() => {
    const base = import.meta.env.BASE_URL;
    fetch(base + 'projects.json')
      .then((res) => res.json())
      .then((data: Project[]) => setAllProjects(data.map((p) => ({ ...p, image: base + p.image }))))
      .catch((err) => console.error('Failed to load projects:', err));
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll('.project-card');
    cards.forEach((card, i) => {
      gsap.from(card, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [allProjects]);

  return (
    <main ref={sectionRef} className="pt-24" style={{ background: '#050505', minHeight: '100vh' }}>
      <section className="section-padded">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          {/* Header */}
          <div className="mb-16">
            <p className="font-mono-data text-xs tracking-widest text-[#3B82F6] mb-4">
              CASE STUDIES
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-[#F8F9FA] tracking-tight mb-4">
              项目案例库
            </h1>
            <p className="text-[#A1A1AA] max-w-xl leading-relaxed">
              每一个项目都是一次从商业问题出发，通过数据分析驱动策略决策的完整实践。
              点击查看详细案例分析。
            </p>
          </div>

          {/* Projects grid */}
          <div className="space-y-12">
            {allProjects.map((project) => {
              const Icon = iconMap[project.icon] || Users;
              return (
                <Link
                  key={project.id}
                  to={`/projects/${project.id}`}
                  className="project-card group block liquid-glass rounded-3xl overflow-hidden hover-lift"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                    {/* Image */}
                    <div className="lg:col-span-3 relative overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0A0A0A]/80 hidden lg:block" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent lg:hidden" />
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-2 p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <Icon size={18} className="text-[#3B82F6]" />
                        <span className="font-mono-data text-xs text-[#3B82F6] tracking-wider">
                          PROJECT {String(project.id).padStart(2, '0')}
                        </span>
                      </div>

                      <h3 className="text-xl md:text-2xl font-bold text-[#F8F9FA] mb-2 group-hover:text-[#3B82F6] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-[#A1A1AA] font-mono-data mb-4">
                        {project.subtitle}
                      </p>
                      <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6">
                        {project.detail?.background || ''}
                      </p>

                      {/* Metrics */}
                      <div className="flex items-center gap-6 mb-6">
                        {project.stats.map((m) => (
                          <div key={m.label}>
                            <p className="text-lg font-bold text-[#3B82F6] font-mono-data">
                              {m.value}
                            </p>
                            <p className="text-xs text-[#A1A1AA]">{m.label}</p>
                          </div>
                        ))}
                      </div>

                      {/* Tags */}
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

                      {/* Link */}
                      <div className="mt-6 flex items-center gap-2 text-sm text-[#3B82F6]">
                        <span>查看案例分析</span>
                        <ArrowUpRight
                          size={16}
                          className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
