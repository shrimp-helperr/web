import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: '首页', path: '/' },
  { label: '关于', path: '/about' },
  { label: '项目', path: '/projects' },
  { label: 'AI 作品', path: '/dashboard' },
  { label: '核心能力', path: '/skills' },
  { label: '联系', path: '/contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? 'rgba(5, 5, 5, 0.6)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(24px) saturate(150%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(150%)' : 'none',
        boxShadow: scrolled
          ? 'inset 0 1px 1px rgba(255,255,255,0.05), 0 4px 20px rgba(0,0,0,0.3)'
          : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.04)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="font-mono-data text-sm tracking-widest text-[#F8F9FA] hover:text-[#3B82F6] transition-colors duration-300"
          >
            HE.SIYUAN
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative text-sm text-[#A1A1AA] hover:text-[#F8F9FA] transition-colors duration-300 group"
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 h-px bg-[#3B82F6] transition-all duration-300"
                  style={{
                    width: location.pathname === link.path ? '100%' : '0%',
                  }}
                />
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#3B82F6] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-[#F8F9FA] p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="md:hidden absolute top-full left-0 right-0 liquid-glass"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
        >
          <div className="px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block py-3 text-sm text-[#A1A1AA] hover:text-[#F8F9FA] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
