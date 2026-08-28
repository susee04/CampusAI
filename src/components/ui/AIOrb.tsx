interface AIOrbProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeMap = {
  sm: 'w-24 h-24',
  md: 'w-40 h-40',
  lg: 'w-64 h-64',
  xl: 'w-80 h-80',
};

export default function AIOrb({ size = 'lg', className = '' }: AIOrbProps) {
  return (
    <div className={`relative ${sizeMap[size]} ${className}`}>
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-blue/30 via-accent-purple/20 to-accent-cyan/30 blur-3xl animate-orb-pulse" />

      {/* Rotating ring 1 */}
      <div className="absolute inset-0 rounded-full border border-accent-blue/20 animate-orb-rotate">
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent-cyan shadow-glow-blue" />
      </div>

      {/* Rotating ring 2 (reverse) */}
      <div className="absolute inset-4 rounded-full border border-accent-purple/20 animate-orb-rotate-reverse">
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent-purple shadow-glow-purple" />
      </div>

      {/* Rotating ring 3 */}
      <div className="absolute inset-8 rounded-full border border-accent-cyan/15 animate-orb-rotate animation-delay-4000">
        <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent-blue shadow-glow-blue" />
      </div>

      {/* Core sphere */}
      <div className="absolute inset-12 rounded-full bg-gradient-to-br from-accent-blue via-accent-purple to-accent-cyan animate-orb-pulse">
        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-white/10 to-white/20" />
        <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 rounded-full bg-white/30 blur-md" />
      </div>

      {/* Inner shimmer */}
      <div className="absolute inset-16 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-white/10 animate-float-slow" />
    </div>
  );
}
