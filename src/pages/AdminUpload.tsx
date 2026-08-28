import { useState, useRef, useCallback, type DragEvent } from 'react';
import {
  Upload,
  FileText,
  Trash2,
  CheckCircle2,
  XCircle,
  FileCheck2,
  Loader2,
  Brain,
  Search,
  Filter,
  HardDrive,
  Clock,
  X,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import GlassCard from '@/components/ui/GlassCard';

type UploadStatus = 'uploading' | 'processing' | 'success' | 'error';

interface DocItem {
  id: string;
  name: string;
  size: string;
  pages: number;
  status: UploadStatus;
  progress: number;
  uploadedAt: string;
  error?: string;
}

const initialDocs: DocItem[] = [
  {
    id: 'd1',
    name: 'CS229_Lecture_Notes.pdf',
    size: '4.2 MB',
    pages: 142,
    status: 'success',
    progress: 100,
    uploadedAt: '2 hours ago',
  },
  {
    id: 'd2',
    name: 'ML_Textbook_Ch3.pdf',
    size: '8.7 MB',
    pages: 310,
    status: 'success',
    progress: 100,
    uploadedAt: '5 hours ago',
  },
  {
    id: 'd3',
    name: 'Deep_Learning_Notes.pdf',
    size: '12.1 MB',
    pages: 428,
    status: 'success',
    progress: 100,
    uploadedAt: 'Yesterday',
  },
];

const statusConfig: Record<
  UploadStatus,
  { icon: typeof CheckCircle2; color: string; label: string }
> = {
  uploading: { icon: Loader2, color: 'text-accent-blue', label: 'Uploading...' },
  processing: { icon: Loader2, color: 'text-accent-purple', label: 'Processing...' },
  success: { icon: CheckCircle2, color: 'text-green-400', label: 'Indexed' },
  error: { icon: XCircle, color: 'text-red-400', label: 'Failed' },
};

export default function AdminUpload() {
  const [docs, setDocs] = useState<DocItem[]>(initialDocs);
  const [isDragging, setIsDragging] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'success' | 'error'>('all');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const simulateUpload = (file: File) => {
    const id = `d-${Date.now()}-${Math.random()}`;
    const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
    const newDoc: DocItem = {
      id,
      name: file.name,
      size: `${sizeMB} MB`,
      pages: Math.floor(Math.random() * 200) + 20,
      status: 'uploading',
      progress: 0,
      uploadedAt: 'Just now',
    };
    setDocs((prev) => [newDoc, ...prev]);

    // Simulate upload progress
    let progress = 0;
    const uploadInterval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(uploadInterval);
        setDocs((prev) =>
          prev.map((d) => (d.id === id ? { ...d, progress: 100, status: 'processing' } : d))
        );

        // Simulate processing
        setTimeout(() => {
          const success = Math.random() > 0.15;
          setDocs((prev) =>
            prev.map((d) =>
              d.id === id
                ? success
                  ? { ...d, status: 'success' }
                  : { ...d, status: 'error', error: 'Failed to parse PDF content' }
                : d
            )
          );
        }, 1500);
      } else {
        setDocs((prev) =>
          prev.map((d) => (d.id === id ? { ...d, progress: Math.min(progress, 100) } : d))
        );
      }
    }, 200);
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach((file) => {
      if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        simulateUpload(file);
      }
    });
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const removeDoc = (id: string) => {
    setDocs((prev) => prev.filter((d) => d.id !== id));
  };

  const retryUpload = (doc: DocItem) => {
    setDocs((prev) =>
      prev.map((d) =>
        d.id === doc.id ? { ...d, status: 'processing', error: undefined } : d
      )
    );
    setTimeout(() => {
      setDocs((prev) =>
        prev.map((d) => (d.id === doc.id ? { ...d, status: 'success' } : d))
      );
    }, 1500);
  };

  const filteredDocs = docs.filter((d) => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || d.status === filter;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: docs.length,
    indexed: docs.filter((d) => d.status === 'success').length,
    processing: docs.filter((d) => d.status === 'uploading' || d.status === 'processing').length,
    failed: docs.filter((d) => d.status === 'error').length,
  };

  return (
    <div className="relative min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in-down">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center shadow-glow-blue">
              <Upload className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-white">
                Admin Upload
              </h1>
              <p className="text-sm text-slate-400">
                Upload PDF documents to build the RAG knowledge base
              </p>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { icon: FileText, label: 'Total Documents', value: stats.total, color: 'text-accent-blue' },
            { icon: CheckCircle2, label: 'Indexed', value: stats.indexed, color: 'text-green-400' },
            { icon: Loader2, label: 'Processing', value: stats.processing, color: 'text-accent-purple' },
            { icon: XCircle, label: 'Failed', value: stats.failed, color: 'text-red-400' },
          ].map((stat, i) => (
            <GlassCard
              key={stat.label}
              className="p-4 flex items-center gap-3 animate-fade-in-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <div>
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-slate-500">{stat.label}</div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Upload zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`relative rounded-2xl border-2 border-dashed p-12 md:p-16 text-center cursor-pointer transition-all duration-300 animate-fade-in-up animation-delay-200 ${
            isDragging
              ? 'border-accent-blue bg-accent-blue/10 scale-[1.01]'
              : 'border-white/10 glass hover:border-accent-blue/40 hover:bg-white/[0.06]'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />

          <div className="flex flex-col items-center">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 ${
                isDragging
                  ? 'bg-gradient-to-br from-accent-blue to-accent-purple scale-110 shadow-glow-blue'
                  : 'glass-strong'
              }`}
            >
              <Upload
                className={`w-7 h-7 transition-colors ${
                  isDragging ? 'text-white' : 'text-accent-blue'
                }`}
              />
            </div>
            <p className="font-display text-lg font-semibold text-white mb-1">
              {isDragging ? 'Drop your PDFs here' : 'Drag & drop PDF files'}
            </p>
            <p className="text-sm text-slate-400 mb-4">
              or click to browse from your computer
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <FileText className="w-3.5 h-3.5" />
                PDF format only
              </span>
              <span className="flex items-center gap-1">
                <HardDrive className="w-3.5 h-3.5" />
                Max 50MB per file
              </span>
            </div>
          </div>
        </div>

        {/* Document list */}
        <div className="mt-8 animate-fade-in-up animation-delay-400">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <h2 className="font-display text-lg font-semibold text-white flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-accent-blue" />
              Document Library
            </h2>

            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="pl-9 pr-3 py-2 rounded-lg glass text-sm text-white placeholder-slate-500 focus:outline-none focus:border-accent-blue/40 transition-all w-full sm:w-48"
                />
              </div>

              {/* Filter */}
              <div className="flex p-0.5 rounded-lg glass">
                {(['all', 'success', 'error'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-all ${
                      filter === f
                        ? 'bg-white/10 text-white'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* List */}
          {filteredDocs.length === 0 ? (
            <GlassCard className="p-12 text-center">
              <FileText className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <p className="text-sm text-slate-400">No documents found</p>
            </GlassCard>
          ) : (
            <div className="space-y-2">
              {filteredDocs.map((doc, i) => (
                <DocRow
                  key={doc.id}
                  doc={doc}
                  index={i}
                  onRemove={() => removeDoc(doc.id)}
                  onRetry={() => retryUpload(doc)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Info note */}
        <GlassCard className="mt-6 p-4 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 border border-white/10 flex items-center justify-center shrink-0">
            <Brain className="w-4 h-4 text-accent-blue" />
          </div>
          <div>
            <p className="text-sm text-slate-300 font-medium mb-0.5">
              How indexing works
            </p>
            <p className="text-xs text-slate-500 leading-relaxed">
              Uploaded PDFs are automatically chunked, embedded, and stored in a
              vector database. Once indexed, students can query the content
              through the chat interface with cited source references.
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

/* ---------- Document Row ---------- */
function DocRow({
  doc,
  index,
  onRemove,
  onRetry,
}: {
  doc: DocItem;
  index: number;
  onRemove: () => void;
  onRetry: () => void;
}) {
  const config = statusConfig[doc.status];
  const isActive = doc.status === 'uploading' || doc.status === 'processing';

  return (
    <div
      className="group flex items-center gap-3 p-3 rounded-xl glass hover:bg-white/[0.06] transition-all duration-300 animate-fade-in-up"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* File icon */}
      <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 border border-white/10 flex items-center justify-center shrink-0">
        <FileText className="w-5 h-5 text-accent-blue" />
        {doc.status === 'success' && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center border-2 border-base-900">
            <CheckCircle2 className="w-2.5 h-2.5 text-white" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <p className="text-sm font-medium text-white truncate">{doc.name}</p>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span>{doc.size}</span>
          <span>·</span>
          <span>{doc.pages} pages</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {doc.uploadedAt}
          </span>
        </div>

        {/* Progress bar */}
        {isActive && (
          <div className="mt-2 h-1 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent-blue to-accent-purple transition-all duration-300"
              style={{ width: `${doc.progress}%` }}
            />
          </div>
        )}

        {/* Error message */}
        {doc.status === 'error' && doc.error && (
          <p className="text-xs text-red-400 mt-1">{doc.error}</p>
        )}
      </div>

      {/* Status badge */}
      <div className={`flex items-center gap-1.5 text-xs font-medium ${config.color} shrink-0`}>
        <config.icon className={`w-4 h-4 ${isActive ? 'animate-spin' : ''}`} />
        <span className="hidden sm:inline">{config.label}</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 shrink-0">
        {doc.status === 'error' && (
          <button
            onClick={onRetry}
            className="p-2 rounded-lg text-slate-400 hover:text-accent-blue hover:bg-accent-blue/10 transition-all"
            title="Retry upload"
          >
            <Loader2 className="w-4 h-4" />
          </button>
        )}
        <button
          onClick={onRemove}
          className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
          title="Remove document"
        >
          {isActive ? <X className="w-4 h-4" /> : <Trash2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
