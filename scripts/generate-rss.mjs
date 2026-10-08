import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { BLOG_POSTS } from '../src/blog/posts.js';
import { PROJECTS } from '../src/lib/projects.js';
import { SITE_URL } from '../src/lib/constants.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const escapeXml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const rssItems = BLOG_POSTS.map((post) => {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const pubDate = new Date(`${post.date}T00:00:00Z`).toUTCString();
  return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
    </item>`;
}).join('\n');

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>orzz5 Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Notes, write-ups, and lessons from building and shipping projects on orzz.website.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
${rssItems}
  </channel>
</rss>
`;

writeFileSync(join(root, 'public', 'rss.xml'), rss);

const urls = [
  { loc: `${SITE_URL}/`, priority: '1.0' },
  { loc: `${SITE_URL}/blog`, priority: '0.7' },
  ...PROJECTS.map((p) => ({ loc: `${SITE_URL}/projects/${p.slug}`, priority: '0.8' })),
  ...BLOG_POSTS.map((p) => ({
    loc: `${SITE_URL}/blog/${p.slug}`,
    lastmod: p.date,
    priority: '0.6',
  })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

writeFileSync(join(root, 'public', 'sitemap.xml'), sitemap);

console.log(`rss.xml: ${BLOG_POSTS.length} posts, sitemap.xml: ${urls.length} URLs`);
