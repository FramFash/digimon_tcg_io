<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import { writable } from 'svelte/store';
  import { base } from '$app/paths';
  import { searchTerm, searchType, filterItems } from '$lib/stores/search.js';
  import { getOwnedCookie, toggle_favorite, toggle_owned } from '$lib/stores/fav_owned.js';
  import Search from '$lib/components/Search.svelte';
	import Card from '$lib/components/Card.svelte';
	import { cardStorage } from '$lib/utils/cardStorage';
  
  let cards = [];
  let error = null;

  onMount(async () => {
    cards = cardStorage.getCards('owned');
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
      <h1>Owned</h1>
    </div>
    <Search searchTypes={['name', 'card_no']} placeholder="Search cards..."/>
    <h2>Owned Cards ({cards.length})</h2>
    
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
      grid-template-columns: repeat(auto-fill, minmax(300px, 360px));
      gap: 1rem;
    }
  }

  @media (max-width: 500px) {
    .card-grid {
      grid-template-columns: repeat(auto-fill, minmax(50px, 120px));
      grid-template-rows: repeat(auto-fill, minmax(50px, 240px));
      gap: 0.8rem;
    }
  }

  @media (max-width: 400px) {
    .card-grid {
      grid-template-columns: repeat(auto-fill, minmax(50px, 100px));
      grid-template-rows: repeat(auto-fill, minmax(50px, 220px));
      gap: 0.6rem;
    }
  }
</style>
