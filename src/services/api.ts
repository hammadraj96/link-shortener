/**
 * API Service Stubs for Link Shortener
 * These placeholders will be wired to Supabase Database & Functions in subsequent phases.
 */

import { LinkItem, AnalyticsMetric } from '@/types';

export const linkService = {
  async getLinks(): Promise<LinkItem[]> {
    // Placeholder - will query Supabase in Data Phase
    return [];
  },

  async createLink(_data: { originalUrl: string; customSlug?: string; title?: string }): Promise<LinkItem | null> {
    // Placeholder - will insert into Supabase in Data Phase
    return null;
  },

  async deleteLink(_id: string): Promise<boolean> {
    // Placeholder - will delete from Supabase in Data Phase
    return true;
  },
};

export const analyticsService = {
  async getOverview(): Promise<{ totalLinks: number; totalClicks: number; uniqueVisitors: number; clicksToday: number }> {
    // Placeholder - will aggregate from Supabase in Analytics Phase
    return {
      totalLinks: 0,
      totalClicks: 0,
      uniqueVisitors: 0,
      clicksToday: 0,
    };
  },

  async getMetrics(_linkId?: string): Promise<AnalyticsMetric[]> {
    // Placeholder - will fetch click analytics in Analytics Phase
    return [];
  },
};
