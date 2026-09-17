import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Link2, ArrowLeft, ShieldCheck, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { getSupabaseConfigStatus } from '@/lib/supabase';

export const Login: React.FC = () => {
  const { signInWithGoogle } = useAuth();
  const { success, warning } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const supabaseStatus = getSupabaseConfigStatus();

  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    if (!supabaseStatus.isConfigured) {
      warning('Supabase Not Configured', 'In Phase 1, continuing in demo mode to dashboard.');
      setTimeout(() => {
        setIsSubmitting(false);
        navigate('/dashboard');
      }, 600);
      return;
    }

    const { error } = await signInWithGoogle();
    setIsSubmitting(false);
    if (error) {
      warning('Authentication Notice', error.message);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    if (!supabaseStatus.isConfigured) {
      success('Demo Session Started', 'Entering dashboard preview mode.');
      navigate('/dashboard');
      return;
    }

    success('Magic Link Requested', 'Check your inbox for the login link.');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-slate-50">
      {/* Return to Home link */}
      <div className="mb-6 w-full max-w-md">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </Link>
      </div>

      <div className="w-full max-w-md">
        {/* Brand Logo Header */}
        <div className="text-center mb-6">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white shadow-sm mb-3">
            <Link2 className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Welcome to Snip<span className="text-brand-600">Link</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Sign in to access your shortened URLs and real-time analytics
          </p>
        </div>

        {/* Auth Card */}
        <Card className="border-slate-200 shadow-md">
          <CardHeader className="text-center pb-2">
            <CardTitle>Sign in to your account</CardTitle>
            <CardDescription>
              Choose your preferred sign-in method to continue
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 pt-4">
            {/* Supabase Status Alert in Dev */}
            {!supabaseStatus.isConfigured && (
              <div className="rounded-lg bg-amber-50 p-3 border border-amber-200 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-[11px] text-amber-800">
                  <p className="font-semibold">Phase 1 Preview Mode</p>
                  <p className="text-amber-700 mt-0.5">
                    Supabase credentials are not yet configured in <code className="font-mono bg-amber-100 px-1 py-0.2 rounded">.env</code>. You can click below to explore the dashboard UI.
                  </p>
                </div>
              </div>
            )}

            {/* Google OAuth Button */}
            <Button
              variant="outline"
              size="lg"
              className="w-full border-slate-300 hover:bg-slate-50 gap-2.5 font-medium text-slate-700"
              onClick={handleGoogleLogin}
              isLoading={isSubmitting}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              Continue with Google
            </Button>

            {/* Divider */}
            <div className="relative my-4 flex items-center justify-center">
              <div className="w-full border-t border-slate-200" />
              <span className="bg-white px-2.5 text-[11px] font-medium uppercase text-slate-400 absolute">
                Or with email
              </span>
            </div>

            {/* Email form preview */}
            <form onSubmit={handleEmailSubmit} className="space-y-3">
              <Input
                type="email"
                label="Email Address"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="w-full">
                Continue with Email
              </Button>
            </form>

            {/* Terms note */}
            <p className="text-[11px] text-center text-slate-400 mt-4 leading-relaxed">
              By continuing, you agree to SnipLink&apos;s{' '}
              <a href="#terms" className="underline hover:text-slate-600">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#privacy" className="underline hover:text-slate-600">
                Privacy Policy
              </a>
              .
            </p>
          </CardContent>
        </Card>

        {/* Security badge */}
        <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
          <span>Protected with Supabase Authentication</span>
        </div>
      </div>
    </div>
  );
};
