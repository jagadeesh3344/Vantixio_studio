import React from 'react';

interface SectionHeaderProps {
  number?: string;
  category?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'between';
  actionButton?: React.ReactNode;
  titleAccent?: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  number,
  category,
  title,
  subtitle,
  align = 'left',
  actionButton,
  titleAccent,
  className = '',
}) => {
  return (
    <div className={`mb-12 md:mb-16 ${className}`}>
      {/* Eyebrow / Number */}
      {(number || category) && (
        <div className="flex items-center space-x-2 text-xs font-mono tracking-widest uppercase mb-3 text-[#FF5722]">
          {number && <span className="font-semibold">{number}</span>}
          {number && category && <span className="text-slate-600">/</span>}
          {category && <span>{category}</span>}
        </div>
      )}

      {/* Main Title & Action Button Layout */}
      <div className={`flex flex-col ${align === 'between' ? 'md:flex-row md:items-end md:justify-between gap-6' : align === 'center' ? 'items-center text-center' : 'items-start text-left'}`}>
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.35rem] font-display tracking-tight text-white leading-[1.08]">
            {title}
            {titleAccent && (
              <span className="text-[#FF5722] ml-2.5 font-serif italic font-normal">
                {titleAccent}
              </span>
            )}
          </h2>

          {subtitle && (
            <p className="mt-4 text-base sm:text-lg text-slate-400 font-normal leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>

        {actionButton && (
          <div className="mt-4 md:mt-0 flex-shrink-0">
            {actionButton}
          </div>
        )}
      </div>
    </div>
  );
};
