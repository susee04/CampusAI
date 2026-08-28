import { type ReactNode } from 'react';
import ParticlesBackground from './ParticlesBackground';

export default function Background({ children }: { children?: ReactNode }) {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base color */}
      <div className="absolute inset-0 bg-base-900" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-40" />

      {/* Radial gradient glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-accent-blue/10 blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-accent-purple/10 blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-accent-cyan/5 blur-[100px]" />

      {/* Particles */}
      <ParticlesBackground count={50} />

      {children}
    </div>
  );
}
