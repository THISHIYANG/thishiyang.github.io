import { getCollection } from 'astro:content';
export async function getDevlogs() {
  const entries = await getCollection('devlogs');
  return entries.filter(entry => !entry.data.draft).sort((a,b) => a.data.sequence-b.data.sequence);
}
export async function getDevlogReviews() {
  if (!import.meta.env.DEV) return [];
  return (await getCollection('devlogs')).sort((a,b) => a.data.sequence-b.data.sequence);
}
