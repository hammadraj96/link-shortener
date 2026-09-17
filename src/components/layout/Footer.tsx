import React from 'react';
import { Link } from 'react-router-dom';
import { Link2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-600 text-white">
              <Link2 className="h-4 w-4" />
            </div>
            <span className="text-base font-bold text-slate-900">
              Snip<span className="text-brand-600">Link</span>
            </span>
            <span className="text-xs text-slate-400 ml-2">© {new Date().getFullYear()} SnipLink Inc. All rights reserved.</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-xs text-slate-500">
            <Link to="/login" className="hover:text-slate-900 transition-colors">
              Sign In
            </Link>
            <a href="#features" className="hover:text-slate-900 transition-colors">
              Features
            </a>
            <a href="#privacy" className="hover:text-slate-900 transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-slate-900 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
