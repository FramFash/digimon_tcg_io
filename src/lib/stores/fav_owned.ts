import { browser } from '$app/environment';
import { writable } from 'svelte/store';


function getFavoritesCookie(): Map<any, any> {
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
  favorites.subscribe($favorites => {
    setFavoriteCookie($favorites);
  });
}

export function toggle_favorite(cardId: string) {
    favorites.update(map => {
      const newMap = new Map(map);
      if (newMap.get(cardId)) {
        newMap.delete(cardId);
      } else {
        newMap.set(cardId, true);
      }
      return new Map(newMap);
    });
}

function getOwnedCookie(): Map<any, any> {
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


export const owned = writable(new Map());
const initialOwned = getOwnedCookie();

if (browser) {
  owned.subscribe($owned => {
    setOwnedCookie($owned);
  });
}

export function toggle_owned(cardId: string) {
    owned.update(map => {
      const newMap = new Map(map);
      if (newMap.get(cardId)) {
        newMap.delete(cardId);
      } else {
        newMap.set(cardId, true);
      }
      return new Map(newMap);
    });
}
