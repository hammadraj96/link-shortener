import React from 'react';
import {
  Globe,
  Smartphone,
  Laptop,
  Tablet,
  Sparkles,
  Calendar,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export const Analytics: React.FC = () => {
  const referrers = [
    { source: 'Twitter / X', clicks: 245, percentage: 40, color: 'bg-blue-500' },
    { source: 'Direct / Email', clicks: 180, percentage: 29, color: 'bg-emerald-500' },
    { source: 'LinkedIn', clicks: 110, percentage: 18, color: 'bg-indigo-500' },
    { source: 'Reddit', clicks: 80, percentage: 13, color: 'bg-amber-500' },
  ];

  const devices = [
    { type: 'Desktop', percentage: 58, icon: Laptop },
    { type: 'Mobile', percentage: 37, icon: Smartphone },
    { type: 'Tablet', percentage: 5, icon: Tablet },
  ];

  const topCountries = [
    { country: 'United States', flag: '🇺🇸', clicks: 310, share: '50.4%' },
    { country: 'United Kingdom', flag: '🇬🇧', clicks: 125, share: '20.3%' },
    { country: 'Germany', flag: '🇩🇪', clicks: 84, share: '13.6%' },
    { country: 'Canada', flag: '🇨🇦', clicks: 52, share: '8.4%' },
    { country: 'Other', flag: '🌐', clicks: 44, share: '7.3%' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Analytics & Insights
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Understand audience engagement, device distribution, and referral sources
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" size="md">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Last 30 Days (Demo)</span>
          </Badge>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-slate-200">
          <CardContent className="p-5">
            <span className="text-xs font-medium text-slate-500">Aggregate Clicks</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">615</span>
              <Badge variant="success" size="sm">+18.5%</Badge>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Total click-through volume</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-5">
            <span className="text-xs font-medium text-slate-500">Avg. Click Rate</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">4.8%</span>
              <Badge variant="info" size="sm">+0.6%</Badge>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Impressions conversion</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-5">
            <span className="text-xs font-medium text-slate-500">Top Origin</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">Twitter / X</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">40% of all traffic</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-5">
            <span className="text-xs font-medium text-slate-500">Primary Platform</span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">Desktop</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">58% browser share</p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Referrers Card */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle>Top Referrer Channels</CardTitle>
            <CardDescription>Breakdown of external traffic origin sources</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {referrers.map((item) => (
              <div key={item.source} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700">{item.source}</span>
                  <span className="text-slate-500">{item.clicks} clicks ({item.percentage}%)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full ${item.color}`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Device Distribution Card */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle>Device Categories</CardTitle>
            <CardDescription>Audience hardware breakdown</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-3 gap-3">
              {devices.map((device) => {
                const Icon = device.icon;
                return (
                  <div
                    key={device.type}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center flex flex-col items-center"
                  >
                    <Icon className="w-5 h-5 text-brand-600 mb-2" />
                    <span className="text-xs font-medium text-slate-600">{device.type}</span>
                    <span className="text-lg font-bold text-slate-900 mt-0.5">{device.percentage}%</span>
                  </div>
                );
              })}
            </div>

            {/* Geographic Table */}
            <div className="pt-2 border-t border-slate-100">
              <h4 className="text-xs font-semibold text-slate-800 mb-3 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-slate-500" /> Top Countries
              </h4>
              <div className="space-y-2">
                {topCountries.map((c) => (
                  <div key={c.country} className="flex items-center justify-between text-xs py-1">
                    <span className="flex items-center gap-2 text-slate-700">
                      <span>{c.flag}</span>
                      <span>{c.country}</span>
                    </span>
                    <span className="text-slate-500 font-mono">{c.clicks} clicks ({c.share})</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Integration Notice */}
      <Card className="border-dashed border-slate-300 bg-slate-50/50">
        <CardContent className="p-5 flex items-center gap-3.5">
          <div className="p-2 rounded-lg bg-brand-100 text-brand-600 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="text-xs">
            <p className="font-semibold text-slate-900">Supabase Click-Stream Pipeline</p>
            <p className="text-slate-500 mt-0.5">
              In Phase 1, UI layout is established. In Phase 3 (Analytics Engine), live click events and geolocation aggregations will be streamed directly from Supabase tables.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
