import { Link } from 'react-router-dom';
import { type ButtonHTMLAttributes, type ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  fullWidth?: boolean;
}

interface ButtonAsButton extends BaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> {
  to?: undefined;
  children: ReactNode;
}

interface ButtonAsLink extends BaseProps {
  to: string;
  disabled?: boolean;
  children: ReactNode;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-accent-blue to-accent-purple text-white shadow-lg shadow-accent-blue/25 hover:shadow-accent-blue/40 hover:brightness-110 border border-white/10',
  secondary:
    'glass-strong text-white hover:bg-white/10 border border-white/10',
  ghost: 'text-slate-300 hover:text-white hover:bg-white/5',
  outline:
    'border border-accent-blue/40 text-accent-blue hover:bg-accent-blue/10 hover:border-accent-blue/60',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

const baseClass =
  'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/50 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';

export default function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    children,
    className = '',
    fullWidth = false,
  } = props;

  const classes = `${baseClass} ${variantClasses[variant]} ${sizeClasses[size]} ${
    fullWidth ? 'w-full' : ''
  } ${className}`;

  if (props.to !== undefined) {
    const { to, disabled } = props;
    return (
      <Link to={to} className={classes} aria-disabled={disabled}>
        {children}
      </Link>
    );
  }

  const { to: _to, fullWidth: _fw, variant: _v, size: _s, ...rest } = props;
  void _to;
  void _fw;
  void _v;
  void _s;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
