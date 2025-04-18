<!-- src/routes/sets/[setId]/+page.svelte -->
<script lang="ts">
  // import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { base } from '$app/paths';
  import { toggle_favorite, toggle_owned, favorites, owned} from '$lib/stores/fav_owned';
  import { searchTerm, searchType, filterItems} from '$lib/stores/search.js';
  import Search from '$lib/components/Search.svelte';
  import Card from '$lib/components/Card.svelte';
  
  export let data;
  
  let set = data?.set || {};
  let cards = data?.cards || [];
  let loading = true;
  let error = null;

  if (Object.keys(set).length === 0 && cards.length < 1) {
    error = '404 NOT FOUND';
  } else if (Object.keys(set).length > 0) {
    loading = false;
  }

  $: filteredCards = filterItems(cards, $searchTerm, $searchType);

  const activeStates = writable(new Map());

  function togglePopup(id: number) {
    activeStates.update(map => {
      map.set(id, !map.get(id));
      return new Map(map);
    });
  }

  function formatDateOnly(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

  $searchTerm = '';

  // If you want to fetch client-side instead of server-side:
  /*
  onMount(async () => {
    loading = true;
    try {
      const response = await fetch(`/api/sets/${data.params.setId}`);
      const json = await response.json();
      set = json.set;
      cards = json.cards;
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  });
  */
</script>

{#if error}
  <p class="error">{error}</p>
{:else if loading}
  <p>Loading...</p>
{:else}
  <div class="set-details">
    <div class="head"><a href="/sets/"><img src={`${base}/images/logo.png`} alt="Digimon Card Game"></a></div>
    <div class="set">
      <h1>[{set.set_id}] {set.name}</h1>
      <img src={set.img} alt={set.name} on:error={(e) => {e.target.src='/images/logo.png'}}/>
      <p>Release Date: {formatDateOnly(set.release_date)}</p>
    </div>
    <Search searchTypes={['name', 'card_no']} placeholder='Search Cards'/>
    
    <h2>Cards in this set ({cards.length})</h2>
    
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

  .set-details {
    margin: 0 20px;
    color: black;
  }

  .set {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: black;

    & img {
      max-height: 300px;
    }
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
</style>

<!--Pink lineargradient-->
<!--background: linear-gradient(90deg, rgba(255,114,175,1) 0%, rgba(231,175,204,1) 70%, rgba(177,183,223,1) 90%, rgba(148,187,233,1) 100%);-->    

<!--green lineargradient-->
<!--linear-gradient(90deg, rgba(27,176,84,1) 0%, rgba(137,219,118,1) 70%, rgba(184,234,140,1) 90%, rgba(223,241,150,1) 100%);-->
