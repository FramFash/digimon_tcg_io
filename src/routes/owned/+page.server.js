export async function load({ cookies, fetch }) {
  
  console.log('owned');
  const ownIds = JSON.parse(cookies.get('owned') || '[]');
  const ownedMap = new Map(ownIds);

  console.log(ownIds);
  console.log(ownedMap);

  let results = [];

  for (const [cardId] of ownedMap) {
    try {
      const url = `https://digimoncard.io/api-public/search.php?card=${cardId}`;
      console.log(url);
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        results = [...results, ...data];
      }
    } catch(error) {
      console.error('error loading card:', cardId, error);
    }
  }

  console.log(results);

  return {
    cards: results,
  };
}
