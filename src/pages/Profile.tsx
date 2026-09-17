import React from 'react';
import { Mail, Calendar, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/hooks/useAuth';

export const Profile: React.FC = () => {
  const { user } = useAuth();

  const userEmail = user?.email || 'demo.user@linkshortener.app';
  const userName = user?.user_metadata?.full_name || 'Demo Creator';

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
          User Profile
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Manage your personal account details and connected identities
        </p>
      </div>

      {/* Main Profile Info Card */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="border-b border-slate-100 pb-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Avatar name={userName} size="xl" />
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <CardTitle className="text-lg">{userName}</CardTitle>
                <Badge variant="success" size="sm">
                  Active
                </Badge>
              </div>
              <CardDescription className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{userEmail}</span>
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          {/* Account Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                Account ID
              </span>
              <p className="text-xs font-mono font-medium text-slate-800 truncate">
                {user?.id || 'usr_preview_mode_2026'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                Member Since
              </span>
              <p className="text-xs font-medium text-slate-800 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                September 2026
              </p>
            </div>
          </div>

          {/* Connected Authentication Providers */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-semibold text-slate-900">
              Connected Providers
            </h3>
            <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
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
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-800">Google OAuth</h4>
                  <p className="text-[11px] text-slate-500">Supabase Single Sign-On Identity</p>
                </div>
              </div>
              <Badge variant="success" size="sm">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Ready</span>
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
