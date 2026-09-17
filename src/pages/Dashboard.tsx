import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Link2,
  MousePointerClick,
  Users,
  TrendingUp,
  Plus,
  Copy,
  Check,
  ExternalLink,
  BarChart2,
  Calendar,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/hooks/useToast';
import { copyToClipboard } from '@/lib/utils';
import { LinkItem } from '@/types';

// Clean UI placeholder data for Phase 1 (demonstrating structure)
const placeholderLinks: LinkItem[] = [
  {
    id: '1',
    title: 'Product Launch Campaign',
    originalUrl: 'https://example.com/products/launch-2026?utm_source=twitter&utm_medium=social',
    shortCode: 'launch26',
    shortUrl: 'https://snip.lk/launch26',
    clicks: 342,
    isActive: true,
    createdAt: '2026-09-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'GitHub Repository',
    originalUrl: 'https://github.com/organization/link-shortener-saas',
    shortCode: 'gh-repo',
    shortUrl: 'https://snip.lk/gh-repo',
    clicks: 189,
    isActive: true,
    createdAt: '2026-09-14T08:30:00Z',
  },
  {
    id: '3',
    title: 'Developer Documentation',
    originalUrl: 'https://docs.linkshortener.app/v1/getting-started',
    shortCode: 'docs-v1',
    shortUrl: 'https://snip.lk/docs-v1',
    clicks: 84,
    isActive: true,
    createdAt: '2026-09-12T14:15:00Z',
  },
];

export const Dashboard: React.FC = () => {
  const { success, info } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [newCustomSlug, setNewCustomSlug] = useState('');
  const [newTitle, setNewTitle] = useState('');

  const handleCopyLink = async (link: LinkItem) => {
    await copyToClipboard(link.shortUrl);
    setCopiedId(link.id);
    success('Link copied', `${link.shortUrl} copied to clipboard.`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCreateLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl) return;
    info('Phase 1 Notice', 'Link creation logic will be wired to Supabase in Phase 2.');
    setIsCreateModalOpen(false);
    setNewUrl('');
    setNewCustomSlug('');
    setNewTitle('');
  };

  return (
    <div className="space-y-6">
      {/* 1. TOP BANNER / ACTIONS BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Overview
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time performance snapshot for your shortened URLs
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            leftIcon={<Plus className="w-4 h-4" />}
            size="sm"
            className="shadow-sm"
          >
            Create New Link
          </Button>
        </div>
      </div>

      {/* 2. KPI CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Total Links */}
        <Card hoverable className="border-slate-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Total Links</span>
              <div className="p-2 rounded-lg bg-blue-50 text-brand-600">
                <Link2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">3</span>
              <Badge variant="info" size="sm">Active</Badge>
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Updated just now
            </p>
          </CardContent>
        </Card>

        {/* KPI 2: Total Clicks */}
        <Card hoverable className="border-slate-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Total Clicks</span>
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                <MousePointerClick className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">615</span>
              <Badge variant="success" size="sm">+14.2%</Badge>
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5">
              Across all active campaigns
            </p>
          </CardContent>
        </Card>

        {/* KPI 3: Unique Visitors */}
        <Card hoverable className="border-slate-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Unique Visitors</span>
              <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">482</span>
              <Badge variant="default" size="sm">78.3%</Badge>
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5">
              Estimated unique reach
            </p>
          </CardContent>
        </Card>

        {/* KPI 4: Clicks Today */}
        <Card hoverable className="border-slate-200">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Clicks Today</span>
              <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">38</span>
              <Badge variant="warning" size="sm">+5 today</Badge>
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5">
              Live engagement count
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 3. RECENT LINKS TABLE PREVIEW */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <CardTitle>Recent Shortened Links</CardTitle>
            <CardDescription>
              Recently created URLs and quick interaction actions
            </CardDescription>
          </div>
          <Link to="/links">
            <Button variant="ghost" size="sm">
              View All Links
            </Button>
          </Link>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/75 text-slate-500 uppercase tracking-wider font-semibold">
                  <th className="py-3 px-4">Title & Short URL</th>
                  <th className="py-3 px-4 hidden sm:table-cell">Destination URL</th>
                  <th className="py-3 px-4 text-center">Clicks</th>
                  <th className="py-3 px-4 hidden md:table-cell">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {placeholderLinks.map((link) => (
                  <tr key={link.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-900 text-xs sm:text-sm">
                          {link.title}
                        </span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-brand-600 font-mono font-medium">
                            {link.shortUrl}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 hidden sm:table-cell max-w-xs truncate text-slate-500">
                      {link.originalUrl}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <Badge variant="default" size="sm">
                        {link.clicks} clicks
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 hidden md:table-cell">
                      <Badge variant="success" size="sm">
                        Active
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCopyLink(link)}
                          className="h-8 px-2"
                          title="Copy short link"
                        >
                          {copiedId === link.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5 text-slate-500" />
                          )}
                        </Button>
                        <Link to="/analytics">
                          <Button variant="ghost" size="sm" className="h-8 px-2" title="View analytics">
                            <BarChart2 className="w-3.5 h-3.5 text-slate-500" />
                          </Button>
                        </Link>
                        <a
                          href={link.originalUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md"
                          title="Open original URL"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* 4. CREATE LINK MODAL */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Short Link"
        description="Paste your destination URL and optionally configure a custom alias."
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleCreateLinkSubmit}>
              Create Link
            </Button>
          </>
        }
      >
        <form onSubmit={handleCreateLinkSubmit} className="space-y-3.5">
          <Input
            label="Destination URL"
            placeholder="https://example.com/very-long-landing-page"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            required
          />
          <Input
            label="Title / Campaign Name (Optional)"
            placeholder="e.g. Summer Promo 2026"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <Input
            label="Custom Slug Alias (Optional)"
            placeholder="summer26"
            value={newCustomSlug}
            onChange={(e) => setNewCustomSlug(e.target.value)}
            helperText="Short link will be: https://snip.lk/[slug]"
          />
        </form>
      </Modal>
    </div>
  );
};
