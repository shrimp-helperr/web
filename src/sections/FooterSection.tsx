import { Link } from 'react-router';
import { Mail, Github, Linkedin } from 'lucide-react';

const footerLinks = [
  { label: '首页', path: '/' },
  { label: '关于', path: '/about' },
  { label: '项目', path: '/projects' },
  { label: '仪表板', path: '/dashboard' },
  { label: '简历', path: '/resume' },
  { label: '联系', path: '/contact' },
];

export default function FooterSection() {
  return (
    <footer className="relative w-full" style={{ background: '#0A0A0A' }}>
      {/* Footer bottom */}
      <div className="border-t border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            {/* Left - brand */}
            <div>
              <p className="font-mono-data text-lg tracking-widest text-[#F8F9FA] mb-2">
                HE.SIYUAN
              </p>
              <p className="text-xs text-[#A1A1AA]">
                Data Analyst & Growth Strategy Enthusiast
              </p>
            </div>

            {/* Center - links */}
            <div className="flex flex-wrap gap-6">
              {footerLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-[#A1A1AA] hover:text-[#F8F9FA] transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right - social */}
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A1A1AA] hover:text-[#3B82F6] transition-colors duration-300"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A1A1AA] hover:text-[#3B82F6] transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:hesiyuan@example.com"
                className="text-[#A1A1AA] hover:text-[#3B82F6] transition-colors duration-300"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-[#1a1a1a] flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#A1A1AA]">
              &copy; {new Date().getFullYear()} 何思源. All rights reserved.
            </p>
            <p className="text-xs text-[#A1A1AA]">
              Designed with data-driven precision.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
