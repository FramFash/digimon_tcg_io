<script lang="ts">
  import { onMount } from 'svelte';
  import { fetchCardSearch } from '$lib/api/digimon'
  import { writable } from 'svelte/store';
  import { base } from '$app/paths';
  import { page } from '$app/stores';
  import { toggle_favorite, toggle_owned, favorites, owned} from '$lib/stores/fav_owned';
  import Search from '$lib/components/Search.svelte';
  import Card from '$lib/components/Card.svelte';
  
  let cards = [];
  let error = null;
  let isLoading = false;

  let searchQuery = $page.params.query;

  onMount(async () => {
    isLoading = true;
    try {
      cards = await fetchCardSearch(searchQuery);

    } catch (err) {
      error = err.message;
    } finally {
      isLoading = false;
    }
  });


  if (cards.length < 1) {
    error = '404 NOT FOUND';
  }


  $: {
    if ($page.params.query) {
      loadData($page.params.query);
    }
  }

  const activeStates = writable(new Map());

  function togglePopup(id: number) {
    activeStates.update(map => {
      map.set(id, !map.get(id));
      return new Map(map);
    });
  }

  async function loadData(query) {
    isLoading = true;

    try {
      const response = await fetch(`https://digimoncard.io/api-public/search.php?n=${query}`);
      if(!response.ok) throw new Error('Failed to fetch');
      cards = await response.json();
      error = cards.length < 1 ? '404 NOT FOUND' : null;
    } catch (err) {
      error = err.message;
      cards = [];
    } finally {
      isLoading = false;
    }
  }

</script>

{#if error}
  <p class="error">{error}</p>
{:else if isLoading}
<h2>Loading...</h2>
{:else}
  <div class="set-details">
    <div class="head"><a href={`${base}/sets`}><img src={`${base}/images/logo.png`} alt="Digimon Card Game"></a></div>
    <div class="title">
      <h1>Search {searchQuery}</h1>
    </div>
    <Search searchTypes={['name', 'card_no']} placeholder='Search Cards'/>
    
    <h2>Cards in this set ({cards.length})</h2>
    
    <div class="card-grid">
      {#each cards as card}
        <Card card={card} activeStates={activeStates} />
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

  .title {
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
