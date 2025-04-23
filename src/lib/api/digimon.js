import { base } from '$app/paths';
import { digimonRateLimiter } from '$lib/utils/rateLimiter';
import { apiCache } from '$lib/utils/apiCache'; 

export async function fetchCardSearch(query) {
  const cacheKey = `card-${query}`;

  const cached = apiCache.get(cacheKey);
  if (cached) {
    console.log('Returning cached data for', query);
    return cached;
  }

  const data = await digimonRateLimiter(async () => {
    const response = await fetch(`https://digimoncard.io/api-public/search.php?n=${query}`);
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }


    return response.json();
  });

  apiCache.set(cacheKey, data);
  return data;
}

function generateSearchUrlSet(setId) {
  const splitArray = setId.split("-");
  const searchId = splitArray[0] + splitArray[1];

  if (splitArray[0] === 'ST') {
    const starter = splitArray[0] + splitArray[1];
    const url = `https://digimoncard.io/api-public/search.php?n=${starter}-`;
    return url;
  } else {
    const url = `https://digimoncard.io/api-public/search.php?pack=${setId}`;
    return url;
  }
}

export async function fetchSet(setId) {
  const cacheKey = `set-${setId}`;
  const cached = apiCache.get(cacheKey);
  if (cached) return cached;

  const url = generateSearchUrlSet(setId);

  const data = await digimonRateLimiter(async () => {
    const response = await fetch(url);
    return response.json();
  });

  apiCache.set(cacheKey, data);
  return data;
}
