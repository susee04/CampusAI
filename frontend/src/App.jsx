import { useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import AdminPage from './pages/AdminPage';
import './App.css';

function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // Handle navbar solid transition on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Generate particles configuration statically/deterministically
  const particles = useMemo(() => {
    // Pseudo-random generator based on index to keep render pure
    const pseudoRandom = (seed) => {
      const x = Math.sin(seed + 1) * 10000;
      return x - Math.floor(x);
    };

    return Array.from({ length: 25 }, (_, i) => {
      const size = pseudoRandom(i * 4 + 1) * 5 + 3; // 3px to 8px
      const x = pseudoRandom(i * 4 + 2) * 100; // % position
      const y = pseudoRandom(i * 4 + 3) * 100; // % position
      const delay = pseudoRandom(i * 4 + 4) * 8; // delay in seconds
      const duration = pseudoRandom(i * 4 + 5) * 12 + 8; // duration in seconds
      return { id: i, size, x, y, delay, duration };
    });
  }, []);

  return (
    <div className="landing-container">
      {/* Glassmorphism Navbar */}
      <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-content">
          <div className="logo-section">
            <div className="logo-icon-glow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="logo-svg">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                <path d="M2 12h20" />
              </svg>
            </div>
            <span className="logo-text">Campus<span className="accent-color">AI</span></span>
          </div>

          <nav className="nav-links">
            <a href="#features" className="nav-link">Features</a>
            <a href="#workflow" className="nav-link">How It Works</a>
            <a href="#technology" className="nav-link">RAG Stack</a>
          </nav>

          <div className="nav-actions">
            <button className="btn-secondary-glow small-btn" onClick={() => navigate('/login')}>
              Launch App
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="hero-section">
        <div className="hero-content">
          <div className="badge-wrapper animate-fade-in">
            <span className="badge">
              <span className="badge-pulse"></span>
              RAG-Powered Student Search Engine
            </span>
          </div>

          <h1 className="hero-title animate-fade-in">
            Your AI <br className="mobile-break" />
            <span className="text-gradient">Student Assistant</span>
          </h1>

          <p className="hero-subtitle animate-fade-in">
            Ask questions from uploaded documents with RAG-powered search.
            Analyze textbooks, syllabi, and research papers instantly.
          </p>

          <div className="hero-actions animate-fade-in">
            <button 
              className="btn-primary-glow" 
              onClick={() => navigate('/login')}
            >
              Get Started
            </button>
            <button 
              className="btn-secondary-glow" 
              onClick={() => navigate('/admin')}
            >
              Admin Upload
            </button>
          </div>
        </div>

        {/* AI Glowing Orb Visual Area */}
        <div className="hero-visual animate-fade-in">
          <div className="orb-wrapper">
            {/* Ambient Background Aura */}
            <div className="orb-aura"></div>

            {/* Glowing Rings (3D Tilted & Rotating) */}
            <div className="ring ring-outer"></div>
            <div className="ring ring-middle"></div>
            <div className="ring ring-inner"></div>

            {/* Core Animated Orb */}
            <div className="orb-core">
              <div className="orb-inner-glow"></div>
            </div>

            {/* Floating Particles Container */}
            <div className="particles-container">
              {particles.map((p) => (
                <span
                  key={p.id}
                  className="particle"
                  style={{
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    animationDelay: `${p.delay}s`,
                    animationDuration: `${p.duration}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Features Showcase Section */}
      <section id="features" className="features-section">
        <div className="section-header">
          <h2 className="section-title">Engineered for Academic Excellence</h2>
          <p className="section-subtitle">Harness advanced retrieval augmented generation to supercharge your study sessions.</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="card-glass-glow"></div>
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <h3>Smart Chunking</h3>
            <p>Documents are intelligently split into semantically coherent segments, preserving contexts and mathematical formulas.</p>
          </div>

          <div className="feature-card">
            <div className="card-glass-glow"></div>
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 17 22 12" />
              </svg>
            </div>
            <h3>Vector Search</h3>
            <p>Embeddings powered by Gemini enable lightning-fast context searches, retrieving exactly what you need in seconds.</p>
          </div>

          <div className="feature-card">
            <div className="card-glass-glow"></div>
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                <line x1="4" y1="22" x2="4" y2="15" />
              </svg>
            </div>
            <h3>Verifiable Citations</h3>
            <p>Never hallucinate. Every answer is coupled with direct references to pages and sections in your uploaded materials.</p>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} CampusAI. Elevating student workflows with context-aware intelligence.</p>
          <div className="footer-links">
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Terms of Service</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
