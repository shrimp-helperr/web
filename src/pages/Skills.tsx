import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  BarChart3,
  Brain,
  Briefcase,
  Bot,
  Globe,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    id: 'data',
    icon: BarChart3,
    title: '数据分析',
    content:
      '熟练使用 SQL、Python（Pandas / NumPy / Matplotlib）、Excel、Power BI 完成数据清洗、数据建模、可视化分析及商业洞察输出；具备从数据提取、指标体系搭建到经营分析落地的完整能力。',
  },
  {
    id: 'modeling',
    icon: Brain,
    title: '分析方法与建模',
    sections: [
      {
        subtitle: '用户分析',
        items: 'RFM用户分层｜用户画像｜用户生命周期分析｜留存分析｜漏斗分析｜Cohort分析',
      },
      {
        subtitle: '营销分析',
        items: 'A/B Test｜Uplift因果推断｜营销归因分析｜ROI评估｜精准营销策略',
      },
      {
        subtitle: '经营分析',
        items: 'GMV增长拆解｜SKU结构分析｜品类分析｜库存周转分析｜供应链优化｜经营诊断分析',
      },
      {
        subtitle: '机器学习',
        items: 'K-Means聚类｜XGBoost预测｜线性回归｜逻辑回归｜时间序列预测｜线性规划优化',
      },
      {
        subtitle: '统计分析',
        items: '假设检验｜方差分析（ANOVA）｜相关性分析｜回归分析｜显著性验证',
      },
    ],
  },
  {
    id: 'business',
    icon: Briefcase,
    title: '商业分析',
    content:
      '聚焦美妆、电商及零售行业，熟悉用户增长、会员运营、精准营销、大促运营及供应链管理逻辑。掌握 GMV、转化率、留存率、复购率、客单价、ROI、库存周转率等核心经营指标，能够将数据洞察转化为业务增长策略。',
  },
  {
    id: 'ai',
    icon: Bot,
    title: 'AI驱动分析',
    content:
      '深度使用 GPT、Claude、Gemini 等大模型开展数据分析与商业研究。熟练使用 Codex、Claude Code、Cursor、Trae 等 AI 开发工具，搭建自动化分析工作流，实现：SQL 自动生成与优化、数据分析流程自动化、BI报表自动生成、营销文案批量生产、数据洞察自动解读、AI Agent 工作流搭建。通过 AI 提升数据分析效率与商业决策速度。',
  },
  {
    id: 'language',
    icon: Globe,
    title: '语言能力',
    content: 'CET-6｜CET-4。具备英文文献阅读、行业报告分析及商务沟通能力。',
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll('.animate-in');
    items.forEach((item) => {
      gsap.from(item, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 88%',
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
      <section className="section-padded pb-8">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="animate-in text-center mb-10">
            <p className="font-mono-data text-xs tracking-widest text-[#3B82F6] mb-3">
              CAPABILITIES
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-[#F8F9FA] tracking-tight mb-4">
              核心能力
            </h1>
            <p className="text-base text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed">
              从数据提取到商业决策，构建全链路分析能力体系。
            </p>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="pb-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 space-y-4">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.id}
                className="animate-in liquid-glass rounded-xl p-5 hover-lift"
              >
                {/* Header */}
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center">
                    <Icon size={15} className="text-[#3B82F6]" />
                  </div>
                  <h3 className="text-sm font-bold text-[#F8F9FA]">{cap.title}</h3>
                </div>

                {/* Content */}
                {cap.content && (
                  <p className="text-xs text-[#A1A1AA] leading-relaxed">
                    {cap.content}
                  </p>
                )}

                {/* Sections (for modeling) */}
                {cap.sections && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                    {cap.sections.map((section) => (
                      <div key={section.subtitle}>
                        <p className="text-[10px] text-[#3B82F6] uppercase tracking-wider mb-0.5">
                          {section.subtitle}
                        </p>
                        <p className="text-xs text-[#A1A1AA] leading-relaxed">
                          {section.items}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
