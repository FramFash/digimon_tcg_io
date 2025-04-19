<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import { writable } from 'svelte/store';
  import { base } from '$app/paths';
  import { searchTerm, searchType, filterItems } from '$lib/stores/search.js';
  import { favorites, getFavoritesCookie } from '$lib/stores/fav_owned.js';

  import Card from '$lib/components/Card.svelte';
  import Search from '$lib/components/Search.svelte';
  
  let cards = [];
  let error = null;

  onMount(async () => {
    console.log('onmount');
    if (!browser) return;

    try {
      const favoriteMap = getFavoritesCookie();
      console.log(favoriteMap);

      const results = [];
      const requests = [];

      for (const [cardId] of favoriteMap) {
        requests.push(
          fetch(`https://digimoncard.io/api-public/search.php?card=${cardId}`).then(response => {
            if (response.ok) return response.json();
            throw new Error(`Failed to fetch card ${cardId}`);
          }).then(data => results.push(...data)).catch(err => {
            console.error('Error loading card:', cardId, err);
            return null
          })
        )
      }

      await Promise.all(requests);

      cards = results;

      console.log(cards);
      
    } catch (err) {
      error = err.message;
    }
  });

  $: filteredCards = filterItems(cards, $searchTerm, $searchType);

  const activeStates = writable(new Map());

  function togglePopup(id: number) {
    activeStates.update(map => {
      map.set(id, !map.get(id));
      return new Map(map);
    });
  }

</script>

{#if error}
  <p class="error">{error}</p>
{:else}
  <div class="set-details">
    <div class="head"><a href={`${base}/sets`}><img src={`${base}/images/logo.png`} alt="Digimon Card Game"></a></div>
    <div class="header">
      <h1>Favorites</h1>
    </div>
    <Search searchTypes={['name', 'card_no']} placeholder="Search cards..."/>
    <h2>Favorite Cards ({cards.length})</h2>
    
    <div class="card-grid">
      {#each filteredCards as card}
        <Card card={card} activeStates={activeStates}/>
      {/each}
    </div>
  </div>
{/if}

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background-repeat: repeat;
    background-attachment: fixed;
    background-color: #eeeeee;
    background-image: radial-gradient(#f74545 2px, #eeeeee 2px);
    background-size: 44px 44px;
  }

  .head {
    display: flex;
    justify-content: center;
  }

  .header {
    display: flex;
    justify-content: center;
  }

  .set-details {
    margin: 0 20px;
  }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 290px));
    gap: 1rem;
  }

  @media (min-width: 1000px) {
    .card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 360px));
      gap: 1rem;
    }
  }
</style>
