const CACHE_TTL = 15 * 60 * 1000;

export const apiCache = {
  get: (key) => {
    if (!window.localStorage) return null;

    const item = localStorage.getItem(`api-cache:${key}`);
    if (!item) return null;

    const { value, timestamp } = JSON.parse(item);
    if (Date.now() - timestamp > CACHE_TTL) {
      localStorage.removeItem(`api-cache:${key}`);
      return null;
    }

    return value
  },
  set: (key, value) => {
    if (!window.localStorage) return;

    const item = JSON.stringify({
      value,
      timestamp: Date.now()
    });
    localStorage.setItem(`api-cache:${key}`, item);
  }
}
