import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AdminPage() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([
    { name: 'Physics_101_Syllabus.pdf', size: '1.2 MB', status: 'Indexed', date: '2026-08-20' },
    { name: 'Quantum_Mechanics_Ch3.pdf', size: '4.8 MB', status: 'Indexed', date: '2026-08-22' },
    { name: 'Lecture_Notes_Week5.pdf', size: '850 KB', status: 'Indexed', date: '2026-08-25' }
  ]);
  const [uploading, setUploading] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    setUploading(true);
    setTimeout(() => {
      const newFiles = Array.from(files).map((f) => ({
        name: f.name,
        size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
        status: 'Indexed',
        date: new Date().toISOString().split('T')[0]
      }));
      setUploadedFiles((prev) => [...newFiles, ...prev]);
      setUploading(false);
    }, 1000);
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
            <span className="logo-text">Campus<span className="accent-color">AI</span> <span className="admin-badge">Admin</span></span>
          </Link>

          <div className="nav-actions" style={{ gap: '16px' }}>
            <Link to="/chat" className="btn-primary-glow small-btn" style={{ textDecoration: 'none' }}>
              Launch Chat
            </Link>
            <Link to="/" className="nav-link">
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="page-main-content">
        <div className="admin-wrapper animate-fade-in">
          <div className="admin-header-section">
            <h1 className="section-title" style={{ textAlign: 'left', marginBottom: '8px' }}>
              Document Knowledge Base Management
            </h1>
            <p className="section-subtitle" style={{ textAlign: 'left', margin: 0 }}>
              Upload textbooks, syllabi, and research papers to generate vector embeddings for student RAG search.
            </p>
          </div>

          {/* Upload Dropzone Card */}
          <div className="admin-card">
            <div className="card-glass-glow"></div>
            <div
              className={`dropzone ${dragActive ? 'drag-active' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="file-upload"
                multiple
                accept=".pdf,.docx,.txt"
                onChange={handleChange}
                style={{ display: 'none' }}
              />
              <label htmlFor="file-upload" className="dropzone-label">
                <div className="upload-icon-circle">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </div>
                <h3>{uploading ? 'Processing & Vectorizing...' : 'Drag & Drop Course Files Here'}</h3>
                <p>Supports PDF, DOCX, and TXT up to 50MB</p>
                <button type="button" className="btn-secondary-glow small-btn" style={{ marginTop: '16px' }}>
                  Browse Files
                </button>
              </label>
            </div>
          </div>

          {/* Files List Section */}
          <div className="admin-card" style={{ marginTop: '30px' }}>
            <h3 className="card-heading">Uploaded Knowledge Sources ({uploadedFiles.length})</h3>
            <div className="table-wrapper">
              <table className="glass-table">
                <thead>
                  <tr>
                    <th>Document Name</th>
                    <th>Size</th>
                    <th>Date Added</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {uploadedFiles.map((file, idx) => (
                    <tr key={idx}>
                      <td className="doc-name-cell">
                        <span className="file-badge-icon">📄</span>
                        {file.name}
                      </td>
                      <td>{file.size}</td>
                      <td>{file.date}</td>
                      <td>
                        <span className="status-badge status-ready">
                          {file.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} CampusAI Admin System. Elevating student workflows with context-aware intelligence.</p>
          <div className="footer-links">
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/chat" className="footer-link">Chat Platform</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
