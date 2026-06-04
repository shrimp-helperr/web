import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Sparkles, Lock, User, ArrowRight, Terminal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Dashboard() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll('.animate-in');
    items.forEach((item, i) => {
      gsap.from(item, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.15,
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
      <section className="section-padded">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          {/* Header */}
          <div className="animate-in text-center mb-12">
            <p className="font-mono-data text-xs tracking-widest text-[#3B82F6] mb-4">
              AI WORKS
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-[#F8F9FA] tracking-tight mb-6">
              AI 作品展示
            </h1>
            <p className="text-[#A1A1AA] max-w-xl mx-auto leading-relaxed mb-10">
              探索 AI 驱动的智能决策系统，体验数据与人工智能结合带来的业务增长新可能。
            </p>

            {/* External Link Button - Direct link */}
            <a
              href="http://42.193.150.22/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#3B82F6] rounded-full text-sm hover:bg-[#3B82F6]/20 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
            >
              <Sparkles size={16} />
              <span>访问 AI 系统</span>
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Instructions Card */}
          <div className="animate-in max-w-lg mx-auto mb-8">
            <div className="liquid-glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center">
                  <Terminal size={18} className="text-[#3B82F6]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#F8F9FA]">如何访问 AI 系统</h3>
                  <p className="text-xs text-[#A1A1AA]">详细步骤指南</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#3B82F6]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-[#3B82F6]">1</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-[#F8F9FA]">点击上方「访问 AI 系统」按钮，或在浏览器中打开地址：</p>
                    <code className="block mt-1 px-3 py-1.5 bg-[#1a1a1a] rounded-lg text-xs text-[#3B82F6] font-mono">http://42.193.150.22/</code>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#3B82F6]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-[#3B82F6]">2</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-[#F8F9FA]">在登录页面输入以下账号信息：</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#3B82F6]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-[#3B82F6]">3</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-[#F8F9FA]">登录成功后即可体验 AI 智能决策系统</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Credentials Card - Always visible */}
          <div className="animate-in max-w-lg mx-auto">
            <div className="liquid-glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#22C55E]/10 flex items-center justify-center">
                  <Lock size={18} className="text-[#22C55E]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#F8F9FA]">系统登录信息</h3>
                  <p className="text-xs text-[#A1A1AA]">以下账号用于访问 AI 系统</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#1a1a1a] to-[#16213e] rounded-xl border border-[#334155]/30">
                  <div className="w-10 h-10 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center flex-shrink-0">
                    <User size={16} className="text-[#3B82F6]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] text-[#A1A1AA] uppercase tracking-wider mb-0.5">用户名 / Username</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-[#F8F9FA] font-mono">珀莱雅</span>
                      <button
                        onClick={() => navigator.clipboard.writeText('珀莱雅')}
                        className="px-2 py-0.5 text-[10px] text-[#3B82F6] bg-[#3B82F6]/10 rounded hover:bg-[#3B82F6]/20 transition-colors"
                      >
                        复制
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#1a1a1a] to-[#16213e] rounded-xl border border-[#334155]/30">
                  <div className="w-10 h-10 rounded-lg bg-[#22C55E]/10 flex items-center justify-center flex-shrink-0">
                    <Lock size={16} className="text-[#22C55E]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] text-[#A1A1AA] uppercase tracking-wider mb-0.5">密码 / Password</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-[#F8F9FA] font-mono">12345678</span>
                      <button
                        onClick={() => navigator.clipboard.writeText('12345678')}
                        className="px-2 py-0.5 text-[10px] text-[#22C55E] bg-[#22C55E]/10 rounded hover:bg-[#22C55E]/20 transition-colors"
                      >
                        复制
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-[#334155]/30">
                <a
                  href="http://42.193.150.22/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-[#3B82F6] hover:text-blue-400 transition-colors"
                >
                  <ArrowRight size={14} />
                  <span>立即访问 AI 系统</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
