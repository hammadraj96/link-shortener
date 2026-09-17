import React, { useState } from 'react';
import {
  Globe,
  Bell,
  ShieldCheck,
  AlertCircle,
  Save,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/hooks/useToast';
import { getSupabaseConfigStatus } from '@/lib/supabase';

export const Settings: React.FC = () => {
  const { success } = useToast();
  const [defaultSlugPrefix, setDefaultSlugPrefix] = useState('snip.lk');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const supabaseStatus = getSupabaseConfigStatus();

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    success('Settings Saved', 'Your application preferences have been updated.');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
          Account Settings
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Configure application preferences, domains, and developer connections
        </p>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* 1. General Preferences */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle>General Preferences</CardTitle>
            <CardDescription>Default branding and link generation behavior</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Default Domain / Prefix"
              value={defaultSlugPrefix}
              onChange={(e) => setDefaultSlugPrefix(e.target.value)}
              helperText="Base URL used for generating new shortened links"
            />
          </CardContent>
        </Card>

        {/* 2. Custom Domain (Placeholder for subsequent phases) */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Custom Domains</CardTitle>
                <CardDescription>Connect your own branded domain (e.g. link.yourbrand.com)</CardDescription>
              </div>
              <Badge variant="outline" size="sm">Phase 4 Feature</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
              <Globe className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-600">
                <p className="font-semibold text-slate-900">Branded Custom Domains</p>
                <p className="mt-0.5 text-slate-500">
                  Custom domain mapping with automated SSL cert provisioning will be available in future releases.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 3. Notifications */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>Control when and how you receive click alerts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <label className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4 text-slate-400" />
                <div>
                  <p className="text-xs font-semibold text-slate-800">Milestone Click Alerts</p>
                  <p className="text-[11px] text-slate-500">Get notified when a link crosses 100, 500, or 1000 clicks</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 cursor-pointer">
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4 text-slate-400" />
                <div>
                  <p className="text-xs font-semibold text-slate-800">Weekly Performance Digest</p>
                  <p className="text-[11px] text-slate-500">Receive an aggregated summary of weekly traffic</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={weeklyDigest}
                onChange={(e) => setWeeklyDigest(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
              />
            </label>
          </CardContent>
        </Card>

        {/* 4. Supabase Connection Status Diagnostic */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle>Backend & Supabase Environment</CardTitle>
            <CardDescription>Development-safe connection status verification</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50">
              <div className="flex items-center gap-3">
                {supabaseStatus.isConfigured ? (
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                )}
                <div>
                  <p className="text-xs font-semibold text-slate-900">
                    {supabaseStatus.isConfigured ? 'Supabase Credentials Configured' : 'Supabase Pending Configuration'}
                  </p>
                  <p className="text-[11px] text-slate-500">{supabaseStatus.message}</p>
                </div>
              </div>

              <Badge variant={supabaseStatus.isConfigured ? 'success' : 'warning'} size="sm">
                {supabaseStatus.isConfigured ? 'Connected' : 'Offline Mode'}
              </Badge>
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <Button type="submit" size="sm" leftIcon={<Save className="w-4 h-4" />}>
              Save Preferences
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};
