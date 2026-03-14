import React from 'react';
import Link from 'next/link';

interface CardProps {
  title: string;
  subtitle?: string;
  href?: string;
  isExternal?: boolean;
  className?: string;
}

export const HubCard = ({ title, subtitle, href, isExternal, className = '' }: CardProps) => {
  const content = (
    <>
      <span className="font-mono text-[11px] text-nmc-steel tracking-[1px] select-none" aria-hidden="true">:::</span>
      <span className="font-mono font-bold text-[30px] text-nmc-white uppercase mt-2 mb-1 leading-none">{title}</span>
      {subtitle && (
        <span className="font-sans font-normal text-[12px] text-nmc-white uppercase opacity-90 leading-tight">
          {subtitle}
        </span>
      )}
    </>
  );

  const baseClasses = `flex flex-col gap-2 p-[18px_22px_20px] bg-gradient-to-tr from-[#000] from-[70%] to-nmc-steel to-[130%] border-l border-t border-[#111] hover:bg-gradient-to-tr hover:from-[#0a0a0a] hover:from-[50%] hover:to-nmc-steel hover:to-[115%] transition-all duration-200 cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-nmc-red ${className}`;

  if (href) {
    if (isExternal) {
      return (
        <a href={href} className={baseClasses} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return <div className={baseClasses}>{content}</div>;
};

interface PanelProps {
  children?: React.ReactNode;
  className?: string;
}

export const GradientPanel = ({ children, className = '' }: PanelProps) => (
  <div className={`bg-gradient-to-tr from-[#000] from-[70%] to-nmc-steel to-[130%] border-l border-[#111] ${className}`}>
    {children}
  </div>
);

export const AngledSection = ({ children, className = '' }: PanelProps) => (
  <div className={`bg-gradient-to-tr from-[#000] from-[70%] to-nmc-steel to-[130%] ${className}`} style={{ backgroundImage: 'linear-gradient(27deg, #000 70%, #7184a0 130%)' }}>
    {children}
  </div>
);