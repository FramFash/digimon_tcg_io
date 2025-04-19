// // src/routes/sets/[setId]/+page.server.js
// import { GetSet } from '$lib/data';

// export async function load({ params, cookies, fetch }) {
//   const { setId } = params;
  
//   try {
//     // Fetch set details and cards
//     const response = await fetch(`https://digimoncard.io/api-public/search.php?pack=${setId}`);
//     if (!response.ok) {
//       throw new Error(`Failed to fetch set: ${response.status}`);
//     }
    
//     const data = await response.json();
    
//     return {
//       set: GetSet(setId),
//       cards: data
//     };
//   } catch (error) {
//     console.error('Error loading set:', error);
//     return {
//       status: 500,
//       error: error.message
//     };
//   }
// }
