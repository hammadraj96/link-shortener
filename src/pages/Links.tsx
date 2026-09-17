import React, { useState } from 'react';
import {
  Link2,
  Plus,
  Search,
  Copy,
  Check,
  ExternalLink,
  Trash2,
  Calendar,
  Filter,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/hooks/useToast';
import { copyToClipboard } from '@/lib/utils';
import { LinkItem } from '@/types';

const initialLinks: LinkItem[] = [
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
  {
    id: '4',
    title: 'Community Discord Invite',
    originalUrl: 'https://discord.gg/invites/tech-creators-community-2026',
    shortCode: 'discord-join',
    shortUrl: 'https://snip.lk/discord-join',
    clicks: 521,
    isActive: true,
    createdAt: '2026-09-08T18:45:00Z',
  },
];

export const Links: React.FC = () => {
  const { success, info } = useToast();
  const [links, setLinks] = useState<LinkItem[]>(initialLinks);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [destinationUrl, setDestinationUrl] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [slugInput, setSlugInput] = useState('');

  const filteredLinks = links.filter(
    (l) =>
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.shortCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.originalUrl.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopy = async (link: LinkItem) => {
    await copyToClipboard(link.shortUrl);
    setCopiedId(link.id);
    success('Copied to clipboard', `${link.shortUrl} copied.`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string) => {
    setLinks(links.filter((l) => l.id !== id));
    info('Link Deleted', 'Link was removed from the list.');
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destinationUrl) return;

    const newCode = slugInput.trim() || Math.random().toString(36).substring(2, 8);
    const newLinkItem: LinkItem = {
      id: Math.random().toString(36).substring(2, 9),
      title: titleInput.trim() || 'Untitled Link',
      originalUrl: destinationUrl.trim(),
      shortCode: newCode,
      shortUrl: `https://snip.lk/${newCode}`,
      clicks: 0,
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    setLinks([newLinkItem, ...links]);
    success('Link Created', `Created short URL: ${newLinkItem.shortUrl}`);
    setIsModalOpen(false);
    setDestinationUrl('');
    setTitleInput('');
    setSlugInput('');
  };

  return (
    <div className="space-y-6">
      {/* Header & Create Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            My Links
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage, filter, and organize all your shortened URLs
          </p>
        </div>

        <Button
          onClick={() => setIsModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
          size="sm"
        >
          Create Short Link
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <Card className="border-slate-200">
        <CardContent className="p-4 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title, alias, or destination URL..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
          <Button variant="outline" size="sm" leftIcon={<Filter className="w-3.5 h-3.5" />} className="w-full sm:w-auto">
            All Links ({filteredLinks.length})
          </Button>
        </CardContent>
      </Card>

      {/* Links List / Table Card */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3 border-b border-slate-100">
          <CardTitle>Links Directory</CardTitle>
          <CardDescription>
            Showing {filteredLinks.length} active links
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/75 text-slate-500 uppercase tracking-wider font-semibold">
                  <th className="py-3 px-4">Title & Short URL</th>
                  <th className="py-3 px-4 hidden md:table-cell">Destination URL</th>
                  <th className="py-3 px-4 text-center">Total Clicks</th>
                  <th className="py-3 px-4 hidden sm:table-cell">Created Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredLinks.map((link) => (
                  <tr key={link.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-900 text-xs sm:text-sm">
                          {link.title}
                        </span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <Link2 className="w-3.5 h-3.5 text-brand-600" />
                          <span className="text-brand-600 font-mono font-medium">
                            {link.shortUrl}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 hidden md:table-cell max-w-xs truncate text-slate-500">
                      {link.originalUrl}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <Badge variant="info" size="sm">
                        {link.clicks} clicks
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 hidden sm:table-cell text-slate-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{new Date(link.createdAt).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCopy(link)}
                          className="h-8 px-2"
                          title="Copy link"
                        >
                          {copiedId === link.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5 text-slate-500" />
                          )}
                        </Button>
                        <a
                          href={link.originalUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md"
                          title="Open original link"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => handleDelete(link.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md transition-colors"
                          title="Delete link"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Short Link"
        description="Enter your destination URL and custom alias."
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleCreateSubmit}>
              Create Link
            </Button>
          </>
        }
      >
        <form onSubmit={handleCreateSubmit} className="space-y-3.5">
          <Input
            label="Destination URL"
            placeholder="https://example.com/long-page"
            value={destinationUrl}
            onChange={(e) => setDestinationUrl(e.target.value)}
            required
          />
          <Input
            label="Title / Campaign (Optional)"
            placeholder="e.g. Autumn Newsletter"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
          />
          <Input
            label="Custom Alias (Optional)"
            placeholder="autumn26"
            value={slugInput}
            onChange={(e) => setSlugInput(e.target.value)}
            helperText="Link will be created as: https://snip.lk/[alias]"
          />
        </form>
      </Modal>
    </div>
  );
};
