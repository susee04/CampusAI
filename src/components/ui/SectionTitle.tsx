import { type HTMLAttributes, type ReactNode } from 'react';

interface SectionTitleProps extends HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  align?: 'left' | 'center';
}

export default function SectionTitle({
  eyebrow,
  title,
  description,
  children,
  align = 'center',
  className = '',
  ...rest
}: SectionTitleProps) {
  return (
    <div
      className={`${align === 'center' ? 'text-center mx-auto' : 'text-left'} max-w-2xl ${className}`}
      {...rest}
    >
      {eyebrow && (
        <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent-blue mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-slate-400 text-base md:text-lg leading-relaxed">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
