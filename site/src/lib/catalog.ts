import data from '../generated/catalog.json';

export interface Author {
  gitHubAccount: string;
  name: string;
}
export interface Sample {
  slug: string;
  name: string;
  title: string;
  shortDescription: string;
  longDescription: string[];
  sourceUrl: string;
  downloadUrl: string;
  createdAt: string;
  updatedAt: string;
  products: string[];
  categories: string[];
  tags: string[];
  authors: Author[];
  references: { name: string; url: string; description?: string }[];
  premium: string | null;
  experimental: string | null;
  searchText: string;
  readmeHtml: string;
  preview: { src640: string; src960: string; width: number; height: number; alt: string };
  gallery: { src: string; alt: string }[];
}
export interface Product {
  name: string;
  logo: string | null;
  color: string;
  kind: string;
  count: number;
}
export interface Catalog {
  version: number;
  generatedAt: string;
  sampleFolderCount: number;
  samples: Sample[];
  contributors: (Author & { sampleSlugs: string[] })[];
  products: Product[];
  categories: string[];
}
export const catalog: Catalog = data;
export function sitePath(target = '') {
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${target.replace(/^\//, '')}`;
}
export const brandPath = (name: string) => sitePath(`generated/brand/${name}`);
export function formatDate(value: string) {
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(`${value}T00:00:00Z`));
}
