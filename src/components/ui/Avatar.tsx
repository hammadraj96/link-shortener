import React from 'react';
import { cn } from '@/lib/utils';
import { User as UserIcon } from 'lucide-react';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  name?: string | null;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = 'md',
  className,
  ...props
}) => {
  const [hasError, setHasError] = React.useState(false);

  const getInitials = (fullName: string) => {
    const parts = fullName.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return fullName.substring(0, 2).toUpperCase();
  };

  const sizes = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-xl',
  };

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden bg-brand-100 text-brand-700 font-semibold border border-brand-200 select-none',
        sizes[size],
        className
      )}
      {...props}
    >
      {src && !hasError ? (
        <img
          src={src}
          alt={name || 'Avatar'}
          onError={() => setHasError(true)}
          className="w-full h-full object-cover"
        />
      ) : name ? (
        <span>{getInitials(name)}</span>
      ) : (
        <UserIcon className="w-1/2 h-1/2 text-brand-600" />
      )}
    </div>
  );
};
