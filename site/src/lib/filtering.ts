export interface FilterState {
  q: string;
  product: string;
  category: string;
  author: string;
  sort: 'updated' | 'newest' | 'name';
}
export interface FilterRecord {
  slug: string;
  title: string;
  searchText: string;
  products: string[];
  categories: string[];
  authors: string[];
  updatedAt: string;
  createdAt: string;
}
export function filterRecords<T extends FilterRecord>(records: T[], state: FilterState): T[] {
  const words = state.q.trim().toLocaleLowerCase('en-US').split(/\s+/).filter(Boolean);
  return records.filter((record) =>
    words.every((word) => record.searchText.includes(word)) &&
    (!state.product || record.products.includes(state.product)) &&
    (!state.category || record.categories.includes(state.category)) &&
    (!state.author || record.authors.includes(state.author.toLowerCase())),
  ).sort((left, right) => {
    const titleOrder = left.title.localeCompare(right.title, 'en') || left.slug.localeCompare(right.slug, 'en');
    if (state.sort === 'name') return titleOrder;
    const key = state.sort === 'newest' ? 'createdAt' : 'updatedAt';
    return right[key].localeCompare(left[key]) || titleOrder;
  });
}
