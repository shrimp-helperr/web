import { Mail, Phone } from 'lucide-react';

export default function Contact() {
  return (
    <main className="pt-24" style={{ background: '#050505', minHeight: '100vh' }}>
      <section className="section-padded">
        <div className="max-w-2xl mx-auto px-6 lg:px-10">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="font-mono-data text-xs tracking-widest text-[#3B82F6] mb-4">
              GET IN TOUCH
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-[#F8F9FA] tracking-tight mb-4">
              联系我
            </h1>
          </div>

          {/* Contact info */}
          <div className="liquid-glass rounded-2xl p-8">
            <div className="space-y-6">
              <a
                href="mailto:2649149387@qq.com"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center group-hover:bg-[#3B82F6]/20 transition-colors">
                  <Mail size={20} className="text-[#3B82F6]" />
                </div>
                <div>
                  <p className="text-sm text-[#A1A1AA]">邮箱</p>
                  <p className="text-[#F8F9FA] group-hover:text-[#3B82F6] transition-colors">
                    2649149387@qq.com
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center">
                  <Phone size={20} className="text-[#3B82F6]" />
                </div>
                <div>
                  <p className="text-sm text-[#A1A1AA]">电话</p>
                  <p className="text-[#F8F9FA]">15826771673</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
