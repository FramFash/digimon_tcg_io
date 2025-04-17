export async function load({ params, cookies, fetch }) {
  const { query } = params;
  
  try {
    // Fetch set details and cards
    const response = await fetch(`http://localhost:8080/api/cards/search?q=${query}`, {
      credentials: 'include',
      headers: {
        Cookie: cookies.getAll().map(c => `${c.name}=${c.value}`).join('')
      }
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch set: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      cards: data
    };
  } catch (error) {
    console.error('Error loading set:', error);
    return {
      status: 500,
      error: error.message
    };
  }
}

