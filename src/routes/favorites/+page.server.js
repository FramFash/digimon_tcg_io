// import { favorites } from "$lib/stores/fav_owned";
// export async function load({ fetch, cookies }) {
//   console.log('favorites');
//   const favIds = JSON.parse(cookies.get('favorites') || '[]');
//   const favoriteMap = new Map(favIds);

//   console.log(favIds);
//   console.log(favoriteMap);

//   let results = [];

//   for (const [cardId] of favoriteMap) {
//     try {
//       const url = `https://digimoncard.io/api-public/search.php?card=${cardId}`;
//       console.log(url);
//       const response = await fetch(url);

//       if (response.ok) {
//         const data = await response.json();
//         results = [...results, ...data];
//       }
//     } catch(error) {
//       console.error('error loading card:', cardId, error);
//     }
//   }

//   console.log(results);

//   return {
//     cards: results,
//   };
// }
