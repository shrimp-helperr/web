import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, FileText, Briefcase, GraduationCap, Award, Code2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const resumeData = {
  profile: {
    name: '何思源',
    title: '数据分析师 / 商业策略分析师',
    email: 'hesiyuan@example.com',
    phone: '+86 138-0000-0000',
    location: '上海',
    summary:
      '具备扎实的数据分析基础与商业敏感度，擅长从复杂数据中提炼业务洞察并转化为可执行策略。专注于用户增长、精准营销与运营优化领域，熟练使用Python、SQL、Power BI等工具，有从数据清洗到策略输出的全链路项目经验。',
  },
  education: [
    {
      school: '某知名大学',
      degree: '经济学学士 / 统计学辅修',
      period: '2020 - 2024',
      details: ['GPA: 3.7/4.0', '主修课程：计量经济学、时间序列分析、数据挖掘'],
    },
  ],
  experience: [
    {
      company: '某互联网电商平台',
      role: '数据分析实习生',
      period: '2023.07 - 至今',
      bullets: [
        '构建RFM用户分层模型，识别高价值用户群体，助力精准营销策略制定',
        '设计A/B测试方案，评估促销活动ROI，提出营销预算优化建议',
        '搭建用户行为分析Dashboard，实时监控核心转化漏斗指标',
        '运用XGBoost模型预测用户流失风险，辅助留存策略制定',
      ],
    },
    {
      company: '某咨询公司',
      role: '商业分析助理',
      period: '2022.09 - 2023.06',
      bullets: [
        '参与美妆品牌市场进入策略项目，完成竞品分析与市场规模测算',
        '运用K-Means聚类分析消费者画像，为产品定位提供数据支撑',
        '撰写数据分析报告并向客户汇报，获得客户高度认可',
      ],
    },
  ],
  projects: [
    {
      name: '珀莱雅精准营销与供应链分析',
      desc: '基于15万条消费记录，构建RFM模型与Uplift模型，实现精准营销与库存协同优化',
      tags: ['Python', 'XGBoost', 'Power BI'],
    },
    {
      name: '共享出行供需分析',
      desc: '分析15万骑行订单数据，结合天气与地理信息，提出动态调度策略',
      tags: ['K-Means', 'Time Series', 'GIS'],
    },
    {
      name: 'ESG与机器人自动化空间计量研究',
      desc: '基于2847家企业面板数据，运用SDM模型实证检验机器人采用对ESG绩效的影响',
      tags: ['R', 'Panel Data', 'Spatial Analysis'],
    },
  ],
  skills: [
    { category: '编程语言', items: 'Python, R, SQL, VBA' },
    { category: '分析工具', items: 'Power BI, Tableau, Excel, SPSS' },
    { category: '机器学习', items: 'Scikit-learn, XGBoost, LightGBM' },
    { category: '数据库', items: 'MySQL, PostgreSQL, MongoDB' },
  ],
  awards: [
    { name: '全国大学生数学建模竞赛', level: '省级一等奖', year: '2023' },
    { name: '某数据科学挑战赛', level: 'Top 5%', year: '2023' },
    { name: '优秀学生奖学金', level: '校级', year: '2022, 2023' },
  ],
};

export default function Resume() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const items = section.querySelectorAll('.resume-section');
    items.forEach((item) => {
      gsap.from(item, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: item, start: 'top 88%' },
      });
    });
    return () => { ScrollTrigger.getAll().forEach((st) => st.kill()); };
  }, []);

  return (
    <main ref={sectionRef} className="pt-24" style={{ background: '#050505', minHeight: '100vh' }}>
      <section className="section-padded">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <p className="font-mono-data text-xs tracking-widest text-[#3B82F6] mb-4">RESUME</p>
              <h1 className="text-4xl md:text-6xl font-bold text-[#F8F9FA] tracking-tight mb-2">
                简历
              </h1>
              <p className="text-[#A1A1AA]">在线简历与资料下载</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#3B82F6] text-white rounded-full text-sm font-medium hover:bg-[#2563EB] transition-colors">
                <Download size={14} />
                <span>下载 PDF</span>
              </button>
              <button className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#334155] text-[#F8F9FA] rounded-full text-sm hover:border-[#3B82F6] transition-colors">
                <FileText size={14} />
                <span>下载作品集</span>
              </button>
            </div>
          </div>

          {/* Resume content */}
          <div className="liquid-glass rounded-3xl p-8 md:p-12">
            {/* Profile */}
            <div className="resume-section mb-12 pb-12 border-b border-[#334155]/50">
              <div className="flex flex-col md:flex-row md:items-start gap-8">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-[#F8F9FA] mb-2">{resumeData.profile.name}</h2>
                  <p className="text-lg text-[#3B82F6] mb-4">{resumeData.profile.title}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-[#A1A1AA] font-mono-data mb-6">
                    <span>{resumeData.profile.email}</span>
                    <span>{resumeData.profile.phone}</span>
                    <span>{resumeData.profile.location}</span>
                  </div>
                  <p className="text-[#A1A1AA] leading-relaxed">{resumeData.profile.summary}</p>
                </div>
                <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                  <img src="/images/hero-portrait.jpg" alt="头像" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="resume-section mb-12 pb-12 border-b border-[#334155]/50">
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap size={20} className="text-[#3B82F6]" />
                <h3 className="text-xl font-bold text-[#F8F9FA]">教育背景</h3>
              </div>
              {resumeData.education.map((edu, i) => (
                <div key={i} className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="md:w-32 flex-shrink-0">
                    <span className="font-mono-data text-xs text-[#3B82F6]">{edu.period}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-[#F8F9FA]">{edu.school}</h4>
                    <p className="text-[#A1A1AA] mb-2">{edu.degree}</p>
                    <div className="flex flex-wrap gap-2">
                      {edu.details.map((d) => (
                        <span key={d} className="text-xs text-[#A1A1AA] bg-[#1a1a1a] px-2 py-1 rounded">{d}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Experience */}
            <div className="resume-section mb-12 pb-12 border-b border-[#334155]/50">
              <div className="flex items-center gap-3 mb-6">
                <Briefcase size={20} className="text-[#3B82F6]" />
                <h3 className="text-xl font-bold text-[#F8F9FA]">工作经历</h3>
              </div>
              <div className="space-y-8">
                {resumeData.experience.map((exp, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="md:w-32 flex-shrink-0">
                      <span className="font-mono-data text-xs text-[#3B82F6]">{exp.period}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-[#F8F9FA]">{exp.company}</h4>
                      <p className="text-[#3B82F6] text-sm mb-3">{exp.role}</p>
                      <ul className="space-y-2">
                        {exp.bullets.map((b, j) => (
                          <li key={j} className="text-sm text-[#A1A1AA] leading-relaxed flex items-start gap-2">
                            <span className="w-1 h-1 rounded-full bg-[#3B82F6] mt-2 flex-shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div className="resume-section mb-12 pb-12 border-b border-[#334155]/50">
              <div className="flex items-center gap-3 mb-6">
                <Code2 size={20} className="text-[#3B82F6]" />
                <h3 className="text-xl font-bold text-[#F8F9FA]">项目经历</h3>
              </div>
              <div className="space-y-6">
                {resumeData.projects.map((proj, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="flex-1">
                      <h4 className="text-base font-bold text-[#F8F9FA] mb-1">{proj.name}</h4>
                      <p className="text-sm text-[#A1A1AA] leading-relaxed mb-2">{proj.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {proj.tags.map((t) => (
                          <span key={t} className="text-xs font-mono-data text-[#3B82F6] bg-[#3B82F6]/10 px-2 py-1 rounded">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="resume-section mb-12 pb-12 border-b border-[#334155]/50">
              <div className="flex items-center gap-3 mb-6">
                <Code2 size={20} className="text-[#3B82F6]" />
                <h3 className="text-xl font-bold text-[#F8F9FA]">技能</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resumeData.skills.map((skill) => (
                  <div key={skill.category} className="flex flex-col md:flex-row md:items-center gap-2">
                    <span className="text-sm font-bold text-[#F8F9FA] md:w-24">{skill.category}</span>
                    <span className="text-sm text-[#A1A1AA]">{skill.items}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Awards */}
            <div className="resume-section">
              <div className="flex items-center gap-3 mb-6">
                <Award size={20} className="text-[#3B82F6]" />
                <h3 className="text-xl font-bold text-[#F8F9FA]">荣誉奖项</h3>
              </div>
              <div className="space-y-3">
                {resumeData.awards.map((award, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="font-mono-data text-xs text-[#3B82F6]">{award.year}</span>
                    <span className="text-sm text-[#F8F9FA]">{award.name}</span>
                    <span className="text-xs text-[#A1A1AA] ml-auto">{award.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
