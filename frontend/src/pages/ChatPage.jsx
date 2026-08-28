import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Hello! I am CampusAI. Ask me anything about your uploaded syllabus, lecture notes, or textbook materials.',
      citations: ['Physics_101_Syllabus.pdf', 'Quantum_Mechanics_Ch3.pdf']
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    const currentQuery = input;
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiReply = {
        id: Date.now() + 1,
        sender: 'ai',
        text: `Based on your course materials regarding "${currentQuery}", the key concept involves vector embeddings and context retrieval. Page 42 highlights the fundamental equation and principles.`,
        citations: ['Quantum_Mechanics_Ch3.pdf (p. 42)', 'Lecture_Notes_Week5.pdf']
      };
      setMessages((prev) => [...prev, aiReply]);
      setIsTyping(false);
    }, 1200);
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

          <div className="nav-actions" style={{ gap: '16px' }}>
            <Link to="/admin" className="btn-secondary-glow small-btn" style={{ textDecoration: 'none' }}>
              Admin Upload
            </Link>
            <Link to="/login" className="nav-link">
              Sign Out
            </Link>
          </div>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <main className="chat-layout">
        {/* Sidebar */}
        <aside className="chat-sidebar">
          <div className="sidebar-header">
            <h3>Active Documents</h3>
            <span className="badge" style={{ fontSize: '11px', padding: '4px 8px' }}>RAG Active</span>
          </div>

          <div className="document-list">
            <div className="doc-item active-doc">
              <div className="doc-icon">📄</div>
              <div className="doc-info">
                <div className="doc-name">Physics_101_Syllabus.pdf</div>
                <div className="doc-meta">Indexed • 1.2 MB</div>
              </div>
            </div>
            <div className="doc-item">
              <div className="doc-icon">📘</div>
              <div className="doc-info">
                <div className="doc-name">Quantum_Mechanics_Ch3.pdf</div>
                <div className="doc-meta">Indexed • 4.8 MB</div>
              </div>
            </div>
            <div className="doc-item">
              <div className="doc-icon">📝</div>
              <div className="doc-info">
                <div className="doc-name">Lecture_Notes_Week5.pdf</div>
                <div className="doc-meta">Indexed • 850 KB</div>
              </div>
            </div>
          </div>

          <div className="sidebar-footer">
            <Link to="/admin" className="btn-secondary-glow small-btn" style={{ width: '100%', textAlign: 'center', textDecoration: 'none', display: 'block' }}>
              + Upload New Document
            </Link>
          </div>
        </aside>

        {/* Chat Area */}
        <div className="chat-main-area">
          <div className="messages-container">
            {messages.map((msg) => (
              <div key={msg.id} className={`message-bubble-wrapper ${msg.sender === 'user' ? 'user-msg' : 'ai-msg'}`}>
                <div className="message-avatar">
                  {msg.sender === 'user' ? '🎓' : '⚡'}
                </div>
                <div className="message-content">
                  <div className="message-text">{msg.text}</div>
                  {msg.citations && (
                    <div className="citations-list">
                      <span className="citation-title">Sources:</span>
                      {msg.citations.map((cite, i) => (
                        <span key={i} className="citation-tag">🔗 {cite}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message-bubble-wrapper ai-msg">
                <div className="message-avatar">⚡</div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="chat-input-form">
            <input
              type="text"
              placeholder="Ask a question about your documents..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="glass-input chat-input"
            />
            <button type="submit" className="btn-primary-glow small-btn">
              Send
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
