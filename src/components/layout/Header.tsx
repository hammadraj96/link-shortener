import React from 'react';
import { Link } from 'react-router-dom';
import { Link2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white shadow-sm transition-transform group-hover:scale-105">
            <Link2 className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            Snip<span className="text-brand-600">Link</span>
          </span>
        </Link>

        {/* Public Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#features" className="hover:text-slate-900 transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-slate-900 transition-colors">
            How It Works
          </a>
          <a href="#pricing" className="hover:text-slate-900 transition-colors">
            Pricing
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
