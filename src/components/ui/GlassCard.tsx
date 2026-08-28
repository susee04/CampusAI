import { type HTMLAttributes, type ReactNode } from 'react';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
  className?: string;
}

export default function GlassCard({
  children,
  hover = false,
  className = '',
  ...rest
}: GlassCardProps) {
  return (
    <div
      className={`glass rounded-2xl ${hover ? 'transition-all duration-300 hover:bg-white/[0.07] hover:border-white/15 hover:-translate-y-1' : ''} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
