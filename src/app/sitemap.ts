import type { MetadataRoute } from 'next';
import { getProjectSlugs } from '@/lib/data';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aryanminhas.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL,                  lastModified: new Date(), priority: 1.0    },
    { url: `${SITE_URL}/about`,       lastModified: new Date(), priority: 0.8    },
    { url: `${SITE_URL}/projects`,    lastModified: new Date(), priority: 0.9    },
    { url: `${SITE_URL}/experience`,  lastModified: new Date(), priority: 0.8    },
    { url: `${SITE_URL}/contact`,     lastModified: new Date(), priority: 0.7    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = getProjectSlugs().map((slug) => ({
    url:          `${SITE_URL}/projects/${slug}`,
    lastModified: new Date(),
    priority:     0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}
