import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login and redirect to chat
    navigate('/chat');
  };

  return (
    <div className="landing-container">
      {/* Header */}
      <header className="navbar navbar-scrolled">
        <div className="navbar-content">
          <Link to="/" className="logo-section" style={{ textDecoration: 'none' }}>
            <div className="logo-icon-glow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="logo-svg">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                <path d="M2 12h20" />
              </svg>
            </div>
            <span className="logo-text">Campus<span className="accent-color">AI</span></span>
          </Link>

          <div className="nav-actions">
            <Link to="/" className="nav-link">
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Login Area */}
      <main className="page-main-content">
        <div className="auth-card-wrapper animate-fade-in">
          <div className="auth-card">
            <div className="card-glass-glow"></div>

            <div className="auth-header">
              <div className="auth-icon-badge">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
              </div>
              <h1 className="auth-title">Welcome Back</h1>
              <p className="auth-subtitle">Sign in to access your AI document workspace</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="input-group">
                <label htmlFor="email">Student / Academic Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="student@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="glass-input"
                />
              </div>

              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="glass-input"
                />
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" defaultChecked />
                  <span>Remember session</span>
                </label>
                <a href="#forgot" onClick={(e) => e.preventDefault()} className="forgot-link">Forgot password?</a>
              </div>

              <button type="submit" className="btn-primary-glow full-width-btn">
                Sign In to Platform
              </button>
            </form>

            <div className="auth-footer">
              <p>Don't have an account? <Link to="/chat" className="accent-link">Try Demo Chat</Link></p>
              <div className="admin-link-note">
                Need to upload course materials? <Link to="/admin" className="accent-link">Go to Admin Upload</Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} CampusAI. Elevating student workflows with context-aware intelligence.</p>
          <div className="footer-links">
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/admin" className="footer-link">Admin</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
