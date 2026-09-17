import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Link2,
  BarChart3,
  User,
  Settings,
  LogOut,
  X,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'My Links', path: '/links', icon: Link2 },
  { label: 'Analytics', path: '/analytics', icon: BarChart3 },
  { label: 'Profile', path: '/profile', icon: User },
  { label: 'Settings', path: '/settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { signOut } = useAuth();
  const { info } = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    info('Logged out', 'You have been signed out successfully.');
    navigate('/login');
  };

  const navContent = (
    <div className="flex h-full flex-col justify-between bg-white border-r border-slate-200">
      <div className="flex flex-col flex-1">
        {/* Logo and Brand */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-slate-100">
          <NavLink to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white shadow-sm">
              <Link2 className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-slate-900 leading-tight">
                Snip<span className="text-brand-600">Link</span>
              </span>
              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                SaaS Portal
              </span>
            </div>
          </NavLink>
          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden rounded-lg p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation links */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-brand-50 text-brand-700 font-semibold shadow-xs'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={cn(
                        'h-4 w-4 shrink-0 transition-colors',
                        isActive ? 'text-brand-600' : 'text-slate-400 group-hover:text-slate-600'
                      )}
                    />
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Area with Divider & Logout */}
      <div className="p-3 border-t border-slate-100 space-y-1">
        <NavLink
          to="/"
          target="_blank"
          className="flex items-center justify-between rounded-lg px-3.5 py-2 text-xs font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
            <span>Public Site</span>
          </span>
          <span className="text-[10px] text-slate-400 uppercase font-mono">v0.1.0</span>
        </NavLink>

        <div className="my-1 border-t border-slate-100" />

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-colors"
        >
          <LogOut className="h-4 w-4 text-slate-400 hover:text-rose-500 shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Fixed) */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-30">
        {navContent}
      </aside>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={onClose}
          />
          <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
            {navContent}
          </div>
        </div>
      )}
    </>
  );
};
