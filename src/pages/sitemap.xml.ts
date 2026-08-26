import type { APIRoute } from 'astro';

const pages = ['', 'info', 'leaderboard', 'pricing', 'privacy', 'terms', 'delivery', 'shipping', 'refund', 'contact'];

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('https://bondbop.com');
  const urls = pages.map((path) => `<url><loc>${new URL(path, base).href}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: { 'content-type': 'application/xml; charset=utf-8' } });
};
