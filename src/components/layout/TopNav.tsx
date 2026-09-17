import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, User, Settings, LogOut, ShieldCheck, AlertCircle } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Dropdown } from '@/components/ui/Dropdown';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { getSupabaseConfigStatus } from '@/lib/supabase';

interface TopNavProps {
  title?: string;
  onOpenMobileMenu: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ title = 'Dashboard', onOpenMobileMenu }) => {
  const { user, signOut } = useAuth();
  const { info } = useToast();
  const navigate = useNavigate();
  const supabaseStatus = getSupabaseConfigStatus();

  const handleLogout = async () => {
    await signOut();
    info('Signed out', 'You have been logged out.');
    navigate('/login');
  };

  const userMenuItems = [
    {
      label: 'My Profile',
      icon: <User className="w-4 h-4" />,
      onClick: () => navigate('/profile'),
    },
    {
      label: 'Settings',
      icon: <Settings className="w-4 h-4" />,
      onClick: () => navigate('/settings'),
    },
    {
      divider: true,
      label: '',
    },
    {
      label: 'Sign Out',
      icon: <LogOut className="w-4 h-4" />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-4 sm:px-6 lg:px-8 backdrop-blur-sm">
      {/* Left: Mobile trigger & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 md:hidden focus:outline-none focus:ring-2 focus:ring-slate-300"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-bold tracking-tight text-slate-900 md:text-xl">{title}</h1>
      </div>

      {/* Right: Status indicator + User profile */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Supabase Connection Status Badge */}
        {supabaseStatus.isConfigured ? (
          <Badge variant="success" size="sm" className="hidden sm:inline-flex cursor-default">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Supabase Ready</span>
          </Badge>
        ) : (
          <Badge variant="warning" size="sm" className="hidden sm:inline-flex cursor-help" title={supabaseStatus.message}>
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>Supabase Setup Pending</span>
          </Badge>
        )}

        {/* User Dropdown */}
        <Dropdown
          align="right"
          trigger={
            <div className="flex items-center gap-2.5 rounded-full p-1 hover:bg-slate-100 transition-colors">
              <Avatar
                name={user?.email || 'Demo User'}
                src={user?.user_metadata?.avatar_url}
                size="sm"
              />
              <div className="hidden text-left lg:block pr-1.5">
                <p className="text-xs font-semibold text-slate-800 leading-tight">
                  {user?.user_metadata?.full_name || 'Demo User'}
                </p>
                <p className="text-[11px] text-slate-400 leading-tight">
                  {user?.email || 'demo@linkshortener.app'}
                </p>
              </div>
            </div>
          }
          items={userMenuItems}
        />
      </div>
    </header>
  );
};
