import { useParams, Link, useNavigate } from 'react-router';
import { ArrowLeft, ArrowUpRight, BarChart3, Lightbulb, TrendingUp, Users, Zap, BarChart3 as BarChartIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const iconMap: Record<string, React.ElementType> = {
  Users,
  BarChart3: BarChartIcon,
  Zap,
};

interface Project {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  tags: string[];
  icon: string;
  stats: { value: string; label: string }[];
  insights: { title: string; desc: string }[];
  detail?: {
    background: string;
    methods: string[];
    results: string[];
    tools: string[];
  };
}

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const projectId = parseInt(id || '1');
  const [project, setProject] = useState<Project | null>(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const base = import.meta.env.BASE_URL;
    fetch(base + 'projects.json')
      .then((res) => res.json())
      .then((data: Project[]) => {
        const mapped = data.map((p) => ({ ...p, image: base + p.image }));
        setAllProjects(mapped);
        const found = mapped.find((p) => p.id === projectId);
        setProject(found || null);
      })
      .catch((err) => console.error('Failed to load projects:', err));
  }, [projectId]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (contentRef.current) {
      gsap.from(contentRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      });
    }
  }, [projectId]);

  if (!project) {
    return (
      <main className="pt-24" style={{ background: '#050505', minHeight: '100vh' }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-24 text-center">
          <h1 className="text-2xl text-[#F8F9FA] mb-4">项目未找到</h1>
          <Link to="/projects" className="text-[#3B82F6] hover:underline">返回项目列表</Link>
        </div>
      </main>
    );
  }

  const IconComp = iconMap[project.icon] || Users;
  const detail = project.detail;

  return (
    <main className="pt-24" style={{ background: '#050505', minHeight: '100vh' }}>
      {/* Hero image */}
      <div className="relative w-full h-[40vh] md:h-[45vh] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.5)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 liquid-glass rounded-full text-sm text-[#F8F9FA] hover:text-[#3B82F6] transition-colors"
        >
          <ArrowLeft size={16} />
          <span>返回</span>
        </button>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <IconComp size={18} className="text-[#3B82F6]" />
              <span className="font-mono-data text-xs text-[#3B82F6] tracking-wider">
                CASE STUDY {String(projectId).padStart(2, '0')}
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-[#F8F9FA] tracking-tight mb-2">
              {project.title}
            </h1>
            <p className="text-sm text-[#A1A1AA] font-mono-data">
              {project.subtitle}
            </p>
          </div>
        </div>
      </div>

      <div ref={contentRef} className="max-w-6xl mx-auto px-6 lg:px-10 py-10 space-y-12">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 text-xs font-mono-data text-[#3B82F6] bg-[#3B82F6]/10 rounded-full border border-[#3B82F6]/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Background */}
        {detail && (
          <section>
            <h2 className="text-lg font-bold text-[#F8F9FA] mb-4 flex items-center gap-2">
              <Lightbulb size={18} className="text-[#3B82F6]" />
              项目背景
            </h2>
            <p className="text-sm text-[#A1A1AA] leading-relaxed">{detail.background}</p>
          </section>
        )}

        {/* Data Scale */}
        <section>
          <h2 className="text-lg font-bold text-[#F8F9FA] mb-4 flex items-center gap-2">
            <BarChart3 size={18} className="text-[#3B82F6]" />
            数据规模
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {project.stats.map((s) => (
              <div key={s.label} className="liquid-glass rounded-xl p-4 text-center">
                <p className="text-2xl md:text-3xl font-bold text-[#3B82F6] font-mono-data mb-1">
                  {s.value}
                </p>
                <p className="text-xs text-[#A1A1AA]">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Methods */}
        {detail && (
          <section>
            <h2 className="text-lg font-bold text-[#F8F9FA] mb-4 flex items-center gap-2">
              <TrendingUp size={18} className="text-[#3B82F6]" />
              分析方法
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {detail.methods.map((method, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/30 flex items-center justify-center mt-0.5">
                    <span className="font-mono-data text-[10px] text-[#3B82F6]">{String(i + 1).padStart(2, '0')}</span>
                  </span>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed">{method}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Insights */}
        <section>
          <h2 className="text-lg font-bold text-[#F8F9FA] mb-4 flex items-center gap-2">
            <Lightbulb size={18} className="text-[#3B82F6]" />
            核心发现
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {project.insights.map((insight, i) => (
              <div key={insight.title} className="liquid-glass rounded-xl p-4">
                <p className="font-mono-data text-[10px] text-[#3B82F6] mb-2">
                  INSIGHT {String(i + 1).padStart(2, '0')}
                </p>
                <h4 className="text-sm font-bold text-[#F8F9FA] mb-1">{insight.title}</h4>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">{insight.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Results */}
        {detail && (
          <section>
            <h2 className="text-lg font-bold text-[#F8F9FA] mb-4 flex items-center gap-2">
              <TrendingUp size={18} className="text-[#3B82F6]" />
              项目成果
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {detail.results.map((result, i) => (
                <div key={i} className="flex items-start gap-3 liquid-glass rounded-xl p-4">
                  <span className="flex-shrink-0 px-2 py-0.5 text-[10px] font-mono-data text-[#3B82F6] bg-[#3B82F6]/10 rounded-full">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed">{result}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tools */}
        {detail && (
          <section>
            <h2 className="text-lg font-bold text-[#F8F9FA] mb-4">技术栈</h2>
            <div className="flex flex-wrap gap-2">
              {detail.tools.map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1.5 text-xs font-mono-data text-[#F8F9FA] border border-[#334155] rounded-full"
                >
                  {tool}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Related projects */}
        <section className="pb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-[#F8F9FA]">相关项目</h2>
            <Link
              to="/projects"
              className="flex items-center gap-2 text-sm text-[#3B82F6] hover:text-[#F8F9FA] transition-colors"
            >
              <span>查看全部</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {allProjects
              .filter((p) => p.id !== projectId)
              .map((p) => (
                <Link
                  key={p.title}
                  to={`/projects/${p.id}`}
                  className="liquid-glass rounded-xl p-5 hover-lift group"
                >
                  <p className="font-mono-data text-[10px] text-[#3B82F6] mb-1">{p.subtitle}</p>
                  <h4 className="text-base font-bold text-[#F8F9FA] group-hover:text-[#3B82F6] transition-colors">
                    {p.title}
                  </h4>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </main>
  );
}
