import { browser } from '$app/environment';
import { cardStorage } from '$lib/utils/cardStorage'; 
import { writable } from 'svelte/store';


export function getFavoritesCookie(): Map<any, any> {
  if (!browser) return new Map();

  const cookieValue = document.cookie.split('; ').find(row => row.startsWith('favorites='))?.split('=')[1];

  try {
    const entries = cookieValue ? JSON.parse(decodeURIComponent(cookieValue)) : [];
    return new Map(entries);
  } catch {
    return new Map();
  }
}

function setFavoriteCookie(map: Map<any, any>) {
  if (!browser) return

  const entries = Array.from(map.entries());
  const cookieValue = encodeURIComponent(JSON.stringify(entries))
  document.cookie = `favorites=${cookieValue}; path=/; max-age=${60 * 60 * 24 * 365}`;
}

const initialFavorites = getFavoritesCookie();
export const favorites = writable(new Map(initialFavorites));

if (browser) {
  cardStorage.cleanupFromCookie(initialFavorites, 'favorite')
  favorites.subscribe($favorites => {
    setFavoriteCookie($favorites);
  });
}

export function toggle_favorite(card) {
    favorites.update(map => {
      const newMap = new Map(map);
      if (newMap.get(card.id) && cardStorage.hasCard(card.id)) {
        newMap.delete(card.id);
        cardStorage.unmarkCard(card.id);
      } else {
        newMap.set(card.id, true);
        cardStorage.markCard(card)
      }
      return new Map(newMap);
    });
}

export function getOwnedCookie(): Map<any, any> {
  if (!browser) return new Map();

  const cookieValue = document.cookie.split('; ').find(row => row.startsWith('owned='))?.split('=')[1];

  try {
    const entries = cookieValue ? JSON.parse(decodeURIComponent(cookieValue)) : [];
    return new Map(entries);
  } catch {
    return new Map();
  }
}

function setOwnedCookie(map: Map<any, any>) {
  if (!browser) return

  const entries = Array.from(map.entries());
  const cookieValue = encodeURIComponent(JSON.stringify(entries))
  document.cookie = `owned=${cookieValue}; path=/; max-age=${60 * 60 * 24 * 365}`;
}


const initialOwned = getOwnedCookie();
export const owned = writable(new Map(initialOwned));

if (browser) {
  cardStorage.cleanupFromCookie(initialOwned, 'owned');

  owned.subscribe($owned => {
    setOwnedCookie($owned);
  });
}

export function toggle_owned(card) {
    owned.update(map => {
      const newMap = new Map(map);
      if (newMap.get(card.id) && cardStorage.hasCard(card.id, 'owned')) {
        newMap.delete(card.id);
        cardStorage.unmarkCard(card.id, 'owned')
      } else {
        newMap.set(card.id, true);
        cardStorage.markCard(card, 'owned');
      }
      return new Map(newMap);
    });
}
