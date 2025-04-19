// export async function load({ params, cookies, fetch }) {
//   const { query } = params;
  
//   try {
//     // Fetch set details and cards
//     const response = await fetch(`http://digimoncard.io/api-public/search.php?n=${query}`);
//     if (!response.ok) {
//       throw new Error(`Failed to fetch set: ${response.status}`);
//     }
    
//     const data = await response.json();
    
//     return {
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

