import type { Project, ProjectCategory } from '@/types';
import { projects } from './projects';

export { projects }           from './projects';
export { skills, education }  from './skills';
export { personal }           from './personal';

// ── Project Helpers ──────────────────────────────────────────────────────────

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  if (category === 'systems') return projects; // ALL is handled externally
  return projects.filter((p) => p.category.includes(category));
}

export function getAdjacentProjects(slug: string): {
  prev: Project | null;
  next: Project | null;
} {
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? projects[idx - 1] : null,
    next: idx < projects.length - 1 ? projects[idx + 1] : null,
  };
}

export function getProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
