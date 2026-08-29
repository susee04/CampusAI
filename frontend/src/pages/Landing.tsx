import {
  Sparkles,
  FileSearch,
  ShieldCheck,
  Zap,
  MessageSquare,
  Upload,
  ArrowRight,
  Brain,
  BookOpen,
  GraduationCap,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import GlassCard from '@/components/ui/GlassCard';
import AIOrb from '@/components/ui/AIOrb';
import SectionTitle from '@/components/ui/SectionTitle';

const features = [
  {
    icon: FileSearch,
    title: 'RAG-Powered Search',
    description:
      'Retrieval-augmented generation pulls answers directly from your uploaded course materials — no hallucinations, just sourced facts.',
  },
  {
    icon: Zap,
    title: 'Instant Responses',
    description:
      'Get answers in seconds. Our pipeline chunks, embeds, and retrieves relevant passages before the model even starts writing.',
  },
  {
    icon: MessageSquare,
    title: 'Cited Sources',
    description:
      'Every answer comes with citation cards linking back to the exact document and page the information came from.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure & Private',
    description:
      'Your documents are encrypted and access-controlled. Only you and your instructors can query your knowledge base.',
  },
  {
    icon: Upload,
    title: 'Easy Upload',
    description:
      'Drag and drop PDFs, syllabi, and lecture notes. The admin panel handles processing, indexing, and storage automatically.',
  },
  {
    icon: Brain,
    title: 'Context Aware',
    description:
      'The assistant remembers your conversation context, so follow-up questions build on what you already asked.',
  },
];

const steps = [
  {
    icon: Upload,
    title: 'Upload Documents',
    description: 'Instructors upload PDFs, lecture notes, and readings via the Admin panel.',
  },
  {
    icon: FileSearch,
    title: 'AI Indexes Content',
    description: 'Documents are chunked, embedded, and stored in a vector database for instant retrieval.',
  },
  {
    icon: MessageSquare,
    title: 'Ask & Learn',
    description: 'Students ask questions and get cited, accurate answers drawn straight from course materials.',
  },
];

const stats = [
  { value: '10K+', label: 'Documents Indexed' },
  { value: '50K+', label: 'Questions Answered' },
  { value: '99.2%', label: 'Answer Accuracy' },
  { value: '<3s', label: 'Avg Response Time' },
];

export default function Landing() {
  return (
    <div className="relative">
      {/* ---------- HERO ---------- */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass animate-fade-in-down mb-8">
            <Sparkles className="w-3.5 h-3.5 text-accent-cyan" />
            <span className="text-xs font-medium text-slate-300 tracking-wide">
              Powered by RAG Technology
            </span>
          </div>

          {/* Orb */}
          <div className="flex justify-center mb-10 animate-fade-in">
            <AIOrb size="lg" />
          </div>

          {/* Heading */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 animate-fade-in-up animation-delay-200">
            Your <span className="text-gradient glow-text">AI Student</span>
            <br />
            Assistant
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up animation-delay-400">
            Ask questions from uploaded documents with RAG-powered search. Get
            accurate, cited answers drawn directly from your course materials.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-600">
            <Button to="/login" size="lg" className="group">
              Get Started
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button to="/admin" size="lg" variant="secondary">
              <Upload className="w-4 h-4" />
              Admin Upload
            </Button>
            <Button to="/chat" size="lg" variant="outline">
              <MessageSquare className="w-4 h-4" />
              Launch App
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="mt-20 flex justify-center animate-fade-in animation-delay-1000">
            <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
              <div className="w-1 h-2 rounded-full bg-accent-blue animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- STATS ---------- */}
      <section className="relative py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <GlassCard
                key={stat.label}
                className="p-6 text-center animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="font-display text-3xl md:text-4xl font-bold text-gradient-blue mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-slate-500 font-medium">
                  {stat.label}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FEATURES ---------- */}
      <section className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            eyebrow="Features"
            title="Everything you need to learn smarter"
            description="CampusAI combines retrieval-augmented generation with an intuitive interface designed for students and educators."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {features.map((feature, i) => (
              <GlassCard
                key={feature.title}
                hover
                className="p-6 animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 border border-white/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-accent-blue" />
                </div>
                <h3 className="font-display text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- HOW IT WORKS ---------- */}
      <section className="relative py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <SectionTitle
            eyebrow="How It Works"
            title="From PDF to answer in three steps"
            description="A simple pipeline that turns static documents into an interactive knowledge base."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="relative animate-fade-in-up"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <GlassCard className="p-8 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center text-white font-bold text-sm">
                      {i + 1}
                    </div>
                    <step.icon className="w-5 h-5 text-accent-cyan" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </GlassCard>

                {/* Connector arrow */}
                {i < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                    <ArrowRight className="w-5 h-5 text-accent-blue/40" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="relative py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <GlassCard className="relative p-12 md:p-16 text-center overflow-hidden">
            {/* Glow */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-accent-blue/20 blur-[100px]" />

            <div className="relative">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center shadow-glow-blue">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to learn smarter?
              </h2>
              <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto mb-8">
                Launch the app and start asking questions from your course
                materials in seconds.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button to="/chat" size="lg" className="group">
                  <BookOpen className="w-4 h-4" />
                  Launch App
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button to="/login" size="lg" variant="secondary">
                  Sign In
                </Button>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="relative py-12 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="font-display text-sm font-bold text-white">
              Campus<span className="text-gradient">AI</span>
            </span>
          </div>
          <p className="text-xs text-slate-500">
            © 2026 CampusAI. Built with RAG-powered search.
          </p>
        </div>
      </footer>
    </div>
  );
}
