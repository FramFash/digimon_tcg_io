export function createRateLimiter(limit, interval) {
  let lastCall = 0;
  let queue = [];
  let activeRequests = 0;

  return async (fn) => {
    const now = Date.now();
    const elapsed = now - lastCall;

    if (elapsed < interval && activeRequests >= limit) {
      const delay = interval - elapsed;
      await new Promise(resolve => setTimeout(resolve, delay));
    }

    lastCall = Date.now();
    activeRequests++;

    try {
      return await fn();
    } finally {
      activeRequests--;
      if (queue.length > 9) {
        const next = queue.shift();
        setTimeout(next, interval);
      }
    }
  };
}

export const digimonRateLimiter = createRateLimiter(5, 1000);
