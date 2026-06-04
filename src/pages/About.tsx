import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Lightbulb,
  TrendingUp,
  Workflow,
  BarChart3,
  Brain,
  Database,
  GraduationCap,
  Microscope,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const methodology = [
  {
    step: '01',
    title: '商业问题定义',
    desc: '与业务方深度沟通，明确核心痛点，将模糊的商业目标转化为可量化的分析命题。',
    icon: Lightbulb,
  },
  {
    step: '02',
    title: '数据采集与清洗',
    desc: '从多源系统抽取数据，建立ETL流程，处理缺失值与异常值，确保数据质量。',
    icon: Database,
  },
  {
    step: '03',
    title: '探索性分析',
    desc: '运用描述统计与可视化手段发现数据模式，形成初步假设与洞察方向。',
    icon: BarChart3,
  },
  {
    step: '04',
    title: '建模与验证',
    desc: '选择合适的算法构建模型，交叉验证确保稳健性，解释模型输出的业务含义。',
    icon: Brain,
  },
  {
    step: '05',
    title: '策略输出',
    desc: '将分析结果转化为可执行的业务建议，制定短中长期实施路线图。',
    icon: Workflow,
  },
  {
    step: '06',
    title: '效果追踪',
    desc: '建立监控指标体系，持续追踪策略落地效果，迭代优化分析模型。',
    icon: TrendingUp,
  },
];



export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll('.animate-in');
    items.forEach((item) => {
      gsap.from(item, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <main ref={sectionRef} className="pt-24" style={{ background: '#050505', minHeight: '100vh' }}>
      {/* Hero */}
      <section className="section-padded">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="animate-in grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* Text Content - takes 3 columns */}
            <div className="lg:col-span-3">
              <p className="font-mono-data text-xs tracking-widest text-[#3B82F6] mb-4">
                ABOUT ME
              </p>
              <h1 className="text-4xl md:text-6xl font-bold text-[#F8F9FA] tracking-tight mb-8">
                何思源
              </h1>

              {/* Bio */}
              <div className="space-y-4 mb-10">
                <p className="text-base text-[#A1A1AA] leading-relaxed">
                  我是一名计算机科学与技术专业的学生，热爱数据分析与商业研究。
                </p>
                <p className="text-base text-[#A1A1AA] leading-relaxed">
                  擅长从复杂数据中提炼洞察，结合业务场景提出可落地的策略建议。
                </p>
                <p className="text-base text-[#A1A1AA] leading-relaxed">
                  希望通过数据的力量，推动业务增长与社会进步。
                </p>
              </div>

              {/* Research Direction */}
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <Microscope size={16} className="text-[#3B82F6]" />
                  <h3 className="text-sm font-bold text-[#F8F9FA] uppercase tracking-wider">研究方向</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['用户增长分析', '精准营销', '运营优化', '供应链管理', '可视化分析'].map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 text-sm text-[#A1A1AA] bg-[#1a1a1a] rounded-lg border border-[#334155]/50"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap size={16} className="text-[#3B82F6]" />
                  <h3 className="text-sm font-bold text-[#F8F9FA] uppercase tracking-wider">教育背景</h3>
                </div>
                <div className="liquid-glass rounded-2xl p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                    <div>
                      <p className="text-base font-bold text-[#F8F9FA]">长江大学</p>
                      <p className="text-sm text-[#A1A1AA]">计算机科学与技术 / 本科</p>
                    </div>
                    <span className="text-xs font-mono text-[#3B82F6]">2024.09 - 2028.06</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#A1A1AA]">GPA: 3.94/5.0</span>
                    <span className="text-xs text-[#3B82F6]">专业前 15%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Photo - takes 2 columns, smaller */}
            <div className="lg:col-span-2 relative mt-8 lg:mt-16">
              <div className="liquid-glass rounded-2xl overflow-hidden max-w-xs mx-auto lg:mx-0 lg:ml-auto">
                <img
                  src={import.meta.env.BASE_URL + 'images/hero-portrait.jpg'}
                  alt="何思源"
                  className="w-full aspect-[4/5] object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-20 h-20 border border-[#334155] rounded-xl -z-10 hidden lg:block" />
              <div className="absolute -top-4 -left-4 w-16 h-16 border border-[#3B82F6]/30 rounded-full -z-10 hidden lg:block" />
            </div>
          </div>
        </div>
      </section>

      {/* Methodology - Linear Pipeline Design */}
      <section className="section-padded" style={{ background: '#0A0A0A' }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="animate-in text-center mb-16">
            <p className="font-mono-data text-xs tracking-widest text-[#3B82F6] mb-4">
              MY WORKFLOW
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#F8F9FA] tracking-tight">
              分析方法论
            </h2>
          </div>

          {/* Pipeline Container */}
          <div className="animate-in relative">
            {/* Main horizontal line - desktop */}
            <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5">
              <div className="w-full h-full bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#3B82F6] opacity-40" />
            </div>

            {/* Vertical line - mobile */}
            <div className="md:hidden absolute top-0 bottom-0 left-8 w-0.5">
              <div className="w-full h-full bg-gradient-to-b from-[#3B82F6] via-[#8B5CF6] to-[#3B82F6] opacity-40" />
            </div>

            {/* Steps */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-4">
              {methodology.map((m, index) => {
                const Icon = m.icon;
                const isLast = index === methodology.length - 1;
                return (
                  <div key={m.step} className="relative flex md:flex-col items-start md:items-center gap-4 md:gap-6 md:flex-1">
                    {/* Node */}
                    <div className="relative z-10 flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-[#0A0A0A] border-2 border-[#3B82F6]/60 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:border-[#3B82F6] transition-all duration-500">
                        <Icon size={22} className="text-[#3B82F6]" />
                      </div>
                      {/* Pulse effect */}
                      <div className="absolute inset-0 rounded-full border border-[#3B82F6]/20 animate-ping" style={{ animationDuration: '3s' }} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 md:text-center pt-1 md:pt-0">
                      <div className="flex items-center md:justify-center gap-2 mb-2">
                        <span className="font-mono-data text-[10px] text-[#3B82F6]/60">{m.step}</span>
                        <h3 className="text-base font-bold text-[#F8F9FA]">{m.title}</h3>
                      </div>
                      <p className="text-xs text-[#A1A1AA] leading-relaxed max-w-[200px] md:mx-auto">
                        {m.desc}
                      </p>
                    </div>

                    {/* Arrow - desktop */}
                    {!isLast && (
                      <div className="hidden md:block absolute top-8 -right-2 md:right-auto md:left-full md:-translate-x-1/2 z-20">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#3B82F6]/40">
                          <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
