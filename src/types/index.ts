export interface UserProfile {
  id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface LinkItem {
  id: string;
  title: string;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  clicks: number;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface KpiCardData {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  helperText?: string;
}

export interface AnalyticsMetric {
  date: string;
  clicks: number;
  uniqueVisitors: number;
}

export interface ReferrerMetric {
  source: string;
  clicks: number;
  percentage: number;
}

export interface DeviceMetric {
  device: string;
  clicks: number;
  percentage: number;
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastItem {
  id: string;
  title: string;
  message?: string;
  type: ToastType;
  duration?: number;
}

export interface SupabaseConfigStatus {
  isConfigured: boolean;
  urlPresent: boolean;
  anonKeyPresent: boolean;
  message: string;
}
