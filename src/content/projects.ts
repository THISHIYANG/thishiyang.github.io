import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

export async function getProjects(): Promise<Project[]> {
  const projects = await getCollection('projects');
  const slugs = new Set<string>();
  const fieldIds = new Set<string>();
  for (const project of projects) {
    const { slug, fieldId, featuredInField } = project.data;
    if (slug !== project.id) {
      throw new Error(`Project filename and slug differ: ${project.id} / ${slug}`);
    }
    if (slugs.has(slug)) throw new Error(`Duplicate project slug: ${slug}`);
    slugs.add(slug);
    if (featuredInField && fieldId) {
      if (fieldIds.has(fieldId)) throw new Error(`Duplicate FIELD id: ${fieldId}`);
      fieldIds.add(fieldId);
    }
  }
  return projects.sort((a, b) => a.data.order - b.data.order || a.data.number.localeCompare(b.data.number));
}
