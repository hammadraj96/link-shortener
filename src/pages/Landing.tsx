import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Link2,
  BarChart3,
  Shield,
  Zap,
  ArrowRight,
  Sparkles,
  MousePointerClick,
  CheckCircle2,
  Copy,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/hooks/useToast';
import { copyToClipboard } from '@/lib/utils';

export const Landing: React.FC = () => {
  const { success } = useToast();
  const [demoInput, setDemoInput] = useState('https://superlongbrandurl.com/campaigns/spring-2026/product-launch?ref=newsletter');
  const [copied, setCopied] = useState(false);

  const handleCopyDemo = async () => {
    await copyToClipboard('https://snip.lk/spring26');
    setCopied(true);
    success('Copied to clipboard!', 'Demo link copied to clipboard.');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-full">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28 bg-gradient-to-b from-brand-50/60 via-slate-50 to-slate-50 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6">
            <Badge variant="info" size="md">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>SaaS Link Management & Analytics</span>
            </Badge>
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl max-w-4xl mx-auto leading-tight">
            Short Links.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">
              Real Insights.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Create short URLs and track how they perform. Supercharge your click-through rates with custom links, real-time analytics, and instant redirects.
          </p>

          {/* Hero CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link to="/login" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto font-semibold gap-2 shadow-md shadow-brand-500/20">
                {/* Google Icon SVG */}
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                Continue with Google
              </Button>
            </Link>

            <Link to="/dashboard" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Explore Dashboard Demo
              </Button>
            </Link>
          </div>

          {/* Interactive URL Shortener Preview Box */}
          <div className="mt-12 max-w-3xl mx-auto">
            <Card className="border-slate-200/80 shadow-lg p-3 sm:p-4 bg-white/90 backdrop-blur-sm text-left">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Link2 className="w-4 h-4" />
                  </div>
                  <input
                    type="url"
                    value={demoInput}
                    onChange={(e) => setDemoInput(e.target.value)}
                    placeholder="Paste your long link here..."
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 bg-slate-50/50 focus:bg-white focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>
                <Link to="/login" className="shrink-0">
                  <Button className="w-full sm:w-auto py-2.5">
                    Shorten Link
                  </Button>
                </Link>
              </div>

              {/* Live Preview Result Item */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/60 p-3 rounded-lg">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="h-8 w-8 rounded-md bg-brand-100 text-brand-600 flex items-center justify-center shrink-0">
                    <MousePointerClick className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-brand-600 truncate">
                      https://snip.lk/spring26
                    </p>
                    <p className="text-[11px] text-slate-400 truncate">
                      {demoInput}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] font-medium text-slate-500 bg-white px-2 py-1 rounded border border-slate-200">
                    1,429 clicks
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyDemo}
                    leftIcon={copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  >
                    {copied ? 'Copied' : 'Copy'}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 2. FEATURES SECTION */}
      <section id="features" className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-brand-600 mb-2">
              Powerful Features
            </h2>
            <p className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Everything you need to optimize your links
            </p>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Clean, reliable infrastructure tailored for modern creators, marketers, and digital teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <Card hoverable className="border-slate-200">
              <CardContent className="p-6">
                <div className="h-10 w-10 rounded-lg bg-blue-50 text-brand-600 flex items-center justify-center mb-4">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">
                  Fast Redirects
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Sub-millisecond global edge redirection ensures your users reach destination pages with zero delay.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card hoverable className="border-slate-200">
              <CardContent className="p-6">
                <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">
                  Real-Time Analytics
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Track clicks, referrers, geographic locations, and devices in real time with precision metrics.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card hoverable className="border-slate-200">
              <CardContent className="p-6">
                <div className="h-10 w-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                  <Link2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">
                  Custom Slugs
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Personalize your short links with memorable keywords to boost trust and click-through rates.
                </p>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card hoverable className="border-slate-200">
              <CardContent className="p-6">
                <div className="h-10 w-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">
                  Secure & Reliable
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Enterprise-grade Supabase security, RLS data protection, and high-availability architecture.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-16 md:py-24 bg-slate-50 border-t border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-brand-600 mb-2">
              Workflow
            </h2>
            <p className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              How It Works in 3 Simple Steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-full bg-brand-600 text-white font-bold flex items-center justify-center text-sm mb-4 shadow-sm">
                1
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">Paste Long URL</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Paste any web address, article, landing page, or campaign link into the shortening console.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-full bg-brand-600 text-white font-bold flex items-center justify-center text-sm mb-4 shadow-sm">
                2
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">Customize & Generate</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Choose an optional custom alias or let the engine generate a compact, share-ready short code.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-full bg-brand-600 text-white font-bold flex items-center justify-center text-sm mb-4 shadow-sm">
                3
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-2">Share & Track</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Distribute your link anywhere and monitor live engagement metrics on your personal dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA BANNER */}
      <section className="py-16 md:py-20 bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to optimize your links today?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Get started in seconds. No complex configuration required.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/login">
              <Button size="lg" className="bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/25">
                Get Started Free
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="ghost" size="lg" className="text-slate-300 hover:text-white hover:bg-slate-800">
                View Demo Dashboard
              </Button>
            </Link>
          </div>
          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Free to start
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Real-time metrics
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Instant redirects
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
