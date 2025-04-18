import { writable } from 'svelte/store';

export const searchTerm = writable('');
export const searchType = writable('name');

export function filterItems(items, term, type) {
  if (!term) return items;

  const lowerTerm = term.toLowerCase();
  return items.filter(item => {
    if (type === 'name') {
      return item.name.toLowerCase().includes(lowerTerm);
    } else if (type == 'id') {
      return item.set_id.toLowerCase().includes(lowerTerm);
    } else if (type == 'card_no') {
      return item.id.toLowerCase().includes(lowerTerm)
    }

    return true;
  });
}
