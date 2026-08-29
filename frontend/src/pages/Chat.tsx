import { useState, useRef, useEffect, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Send,
  MessageSquare,
  Brain,
  FileText,
  Trash2,
  Sparkles,
  User,
  ChevronRight,
  Search,
  Settings,
  LogOut,
  BookOpen,
  ExternalLink,
} from 'lucide-react';
import AIOrb from '@/components/ui/AIOrb';

interface SourceCard {
  title: string;
  doc: string;
  page: number;
  excerpt: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: SourceCard[];
  typing?: boolean;
}

interface Conversation {
  id: string;
  title: string;
  preview: string;
  timestamp: string;
}

const sampleConversations: Conversation[] = [
  { id: '1', title: 'Machine Learning Basics', preview: 'What is gradient descent?', timestamp: '2m ago' },
  { id: '2', title: 'Data Structures', preview: 'Explain Big O notation', timestamp: '1h ago' },
  { id: '3', title: 'Linear Algebra', preview: 'How do matrix transformations work?', timestamp: '3h ago' },
  { id: '4', title: 'Calculus Review', preview: 'What is the chain rule?', timestamp: 'Yesterday' },
];

const sampleResponse =
  "Gradient descent is an optimization algorithm used to minimize the loss function in machine learning models. It works by iteratively adjusting the model's parameters in the direction of the steepest descent of the loss function, which is determined by the negative gradient. The learning rate controls how large each step is — too small and convergence is slow, too large and the algorithm may overshoot the minimum. There are three main variants: batch gradient descent (uses the entire dataset), stochastic gradient descent (uses one sample at a time), and mini-batch gradient descent (uses a small subset), which is the most commonly used in practice.";

const sampleSources: SourceCard[] = [
  {
    title: 'Introduction to Machine Learning',
    doc: 'CS229_Lecture_Notes.pdf',
    page: 12,
    excerpt: 'Gradient descent is a first-order iterative optimization algorithm for finding a local minimum of a differentiable function...',
  },
  {
    title: 'Optimization Algorithms',
    doc: 'ML_Textbook_Ch3.pdf',
    page: 45,
    excerpt: 'The learning rate is the most important hyperparameter. A value that is too small leads to slow convergence, while a value that is too large can cause the algorithm to diverge...',
  },
  {
    title: 'SGD Variants Comparison',
    doc: 'Deep_Learning_Notes.pdf',
    page: 78,
    excerpt: 'Mini-batch gradient descent is the industry standard, balancing computational efficiency with stable convergence behavior...',
  },
];

const suggestedPrompts = [
  { icon: BookOpen, text: 'Explain gradient descent in simple terms' },
  { icon: FileText, text: 'What is the difference between SGD and batch gradient descent?' },
  { icon: Sparkles, text: 'Summarize the key concepts from lecture 5' },
  { icon: Brain, text: 'How does backpropagation work?' },
];

export default function Chat() {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState(sampleConversations);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const newChat = () => {
    setActiveId(null);
    setMessages([]);
    setSidebarOpen(false);
    inputRef.current?.focus();
  };

  const selectConversation = (id: string) => {
    setActiveId(id);
    setSidebarOpen(false);
    const conv = conversations.find((c) => c.id === id);
    if (conv) {
      setMessages([
        {
          id: 'u-' + id,
          role: 'user',
          content: conv.preview,
        },
        {
          id: 'a-' + id,
          role: 'assistant',
          content: sampleResponse,
          sources: sampleSources,
        },
      ]);
    }
  };

  const deleteConversation = (id: string) => {
    setConversations(conversations.filter((c) => c.id !== id));
    if (activeId === id) {
      setActiveId(null);
      setMessages([]);
    }
  };

  const sendMessage = (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || isTyping) return;

    const userMsg: Message = { id: `u-${Date.now()}`, role: 'user', content };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Typing placeholder
    const typingId = `a-${Date.now()}`;
    setMessages((prev) => [...prev, { id: typingId, role: 'assistant', content: '', typing: true }]);

    // Simulate response
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === typingId ? { ...m, typing: false, content: sampleResponse, sources: sampleSources } : m
        )
      );
      setIsTyping(false);

      // Add to conversation list if new
      if (!activeId) {
        const newConv: Conversation = {
          id: `conv-${Date.now()}`,
          title: content.slice(0, 30) + (content.length > 30 ? '...' : ''),
          preview: content,
          timestamp: 'Just now',
        };
        setConversations((prev) => [newConv, ...prev]);
        setActiveId(newConv.id);
      }
    }, 1800);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div className="relative h-screen flex overflow-hidden pt-16">
      {/* ---------- SIDEBAR ---------- */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-72 glass-nav border-r border-white/5 flex-col pt-4 transition-transform duration-300 md:flex ${
          sidebarOpen ? 'flex translate-x-0' : 'hidden md:flex translate-x-0'
        }`}
      >
        {/* New chat */}
        <div className="px-3">
          <button
            onClick={newChat}
            className="w-full flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple text-white text-sm font-medium shadow-lg shadow-accent-blue/20 hover:brightness-110 transition-all duration-300"
          >
            <Plus className="w-4 h-4" />
            New Chat
          </button>
        </div>

        {/* Search */}
        <div className="px-3 mt-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-9 pr-3 py-2.5 rounded-xl glass text-sm text-white placeholder-slate-500 focus:outline-none focus:border-accent-blue/40 transition-all"
            />
          </div>
        </div>

        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto px-3 mt-4 space-y-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-2 mb-2">
            Recent
          </p>
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => selectConversation(conv.id)}
              className={`group flex items-start gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 ${
                activeId === conv.id
                  ? 'glass-strong border border-white/10'
                  : 'hover:bg-white/5'
              }`}
            >
              <MessageSquare
                className={`w-4 h-4 mt-0.5 shrink-0 ${
                  activeId === conv.id ? 'text-accent-blue' : 'text-slate-500'
                }`}
              />
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${activeId === conv.id ? 'text-white' : 'text-slate-300'}`}>
                  {conv.title}
                </p>
                <p className="text-xs text-slate-500 truncate">{conv.preview}</p>
                <p className="text-[10px] text-slate-600 mt-0.5">{conv.timestamp}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteConversation(conv.id);
                }}
                className="opacity-0 group-hover:opacity-100 p-1 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-white/5 space-y-1">
          <button
            onClick={() => navigate('/admin')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <FileText className="w-4 h-4" />
            Document Library
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all">
            <Settings className="w-4 h-4" />
            Settings
          </button>
          <button
            onClick={() => navigate('/login')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
        />
      )}

      {/* ---------- CHAT AREA ---------- */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <div className="md:hidden flex items-center gap-3 px-4 py-3 glass-nav border-b border-white/5">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-slate-300 hover:bg-white/5"
          >
            <MessageSquare className="w-5 h-5" />
          </button>
          <span className="font-display text-sm font-bold text-white">
            Campus<span className="text-gradient">AI</span>
          </span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            /* Empty state */
            <div className="h-full flex flex-col items-center justify-center px-4 py-12">
              <div className="mb-8 animate-fade-in">
                <AIOrb size="md" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-2 animate-fade-in-up animation-delay-200">
                How can I help you today?
              </h2>
              <p className="text-sm text-slate-400 mb-8 animate-fade-in-up animation-delay-400">
                Ask me anything about your uploaded course materials.
              </p>

              {/* Suggested prompts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl animate-fade-in-up animation-delay-600">
                {suggestedPrompts.map((prompt) => (
                  <button
                    key={prompt.text}
                    onClick={() => sendMessage(prompt.text)}
                    className="group flex items-start gap-3 p-4 rounded-xl glass hover:bg-white/10 hover:border-white/15 text-left transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 border border-white/10 flex items-center justify-center shrink-0">
                      <prompt.icon className="w-4 h-4 text-accent-blue" />
                    </div>
                    <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                      {prompt.text}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-accent-blue group-hover:translate-x-0.5 transition-all mt-0.5 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Messages list */
            <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input bar */}
        <div className="px-4 pb-4 pt-2">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="relative flex items-end gap-2 glass-strong rounded-2xl p-2 focus-within:border-accent-blue/40 transition-all">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Ask a question about your documents..."
                rows={1}
                className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 px-3 py-2.5 resize-none focus:outline-none max-h-32"
                style={{ minHeight: '42px' }}
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-white shadow-lg shadow-accent-blue/20 hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-center text-xs text-slate-600 mt-2">
              CampusAI can make mistakes. Verify important information with cited sources.
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}

/* ---------- Message Bubble ---------- */
function MessageBubble({ message }: { message: Message }) {
  if (message.role === 'user') {
    return (
      <div className="flex gap-3 justify-end animate-fade-in-up">
        <div className="max-w-[80%]">
          <div className="bg-gradient-to-br from-accent-blue to-accent-purple text-white rounded-2xl rounded-tr-md px-4 py-3 text-sm leading-relaxed shadow-lg shadow-accent-blue/20">
            {message.content}
          </div>
        </div>
        <div className="w-8 h-8 rounded-lg glass flex items-center justify-center shrink-0">
          <User className="w-4 h-4 text-slate-300" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 animate-fade-in-up">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center shrink-0 shadow-glow-blue">
        <Brain className="w-4 h-4 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        {message.typing ? (
          <TypingIndicator />
        ) : (
          <>
            <div className="glass rounded-2xl rounded-tl-md px-4 py-3 text-sm text-slate-200 leading-relaxed">
              {message.content}
            </div>

            {/* Source citation cards */}
            {message.sources && message.sources.length > 0 && (
              <div className="mt-3 space-y-2">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3 h-3" />
                  Sources ({message.sources.length})
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {message.sources.map((src, i) => (
                    <SourceCitationCard key={i} source={src} index={i} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ---------- Typing Indicator ---------- */
function TypingIndicator() {
  return (
    <div className="glass rounded-2xl rounded-tl-md px-4 py-4 inline-flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full bg-accent-blue animate-bounce-dot"
          style={{ animationDelay: `${i * 0.16}s` }}
        />
      ))}
    </div>
  );
}

/* ---------- Source Citation Card ---------- */
function SourceCitationCard({ source, index }: { source: SourceCard; index: number }) {
  return (
    <div
      className="group flex items-start gap-3 p-3 rounded-xl glass hover:bg-white/[0.07] hover:border-accent-blue/30 transition-all duration-300 cursor-pointer animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 border border-white/10 flex items-center justify-center shrink-0">
        <FileText className="w-4 h-4 text-accent-blue" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold text-accent-blue">[{index + 1}]</span>
          <p className="text-sm font-medium text-white truncate">{source.title}</p>
        </div>
        <p className="text-xs text-slate-500 mb-1">
          {source.doc} · Page {source.page}
        </p>
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {source.excerpt}
        </p>
      </div>
      <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-accent-blue transition-colors shrink-0 mt-1" />
    </div>
  );
}
