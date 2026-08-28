import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Brain, Menu, X } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/chat', label: 'Chat' },
  { to: '/admin', label: 'Admin' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-nav shadow-lg shadow-black/20' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center shadow-glow-blue group-hover:scale-110 transition-transform duration-300">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-lg font-bold text-white tracking-tight">
              Campus<span className="text-gradient">AI</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    active
                      ? 'text-white bg-white/10'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link
              to="/login"
              className="px-5 py-2 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-accent-blue to-accent-purple border border-white/10 shadow-lg shadow-accent-blue/20 hover:brightness-110 hover:shadow-accent-blue/30 transition-all duration-300"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 animate-fade-in-down">
            <div className="glass-strong rounded-2xl p-3 flex flex-col gap-1">
              {navLinks.map((link) => {
                const active = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      active
                        ? 'text-white bg-white/10'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                to="/login"
                className="mt-1 px-4 py-3 rounded-xl text-sm font-medium text-white text-center bg-gradient-to-r from-accent-blue to-accent-purple"
              >
                Sign In
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
