import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

export interface DropdownItem {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
  divider?: boolean;
}

export interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  align = 'right',
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          className={cn(
            'absolute z-50 mt-2 w-48 rounded-xl border border-slate-200 bg-white py-1 shadow-lg ring-1 ring-black/5 animate-in fade-in-50 duration-150',
            align === 'right' ? 'right-0' : 'left-0',
            className
          )}
        >
          {items.map((item, index) => {
            if (item.divider) {
              return <div key={index} className="my-1 border-t border-slate-100" />;
            }

            return (
              <button
                key={index}
                onClick={() => {
                  item.onClick?.();
                  setIsOpen(false);
                }}
                className={cn(
                  'flex w-full items-center gap-2.5 px-3.5 py-2 text-xs font-medium transition-colors text-left',
                  item.danger
                    ? 'text-rose-600 hover:bg-rose-50 hover:text-rose-700'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                )}
              >
                {item.icon && <span className="w-4 h-4 shrink-0 text-slate-400">{item.icon}</span>}
                <span className="flex-1">{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
