<!-- src/routes/sets/[setId]/+page.svelte -->
<script lang="ts">
  // import { onMount } from 'svelte';
  import { searchTerm, searchType, filterItems} from '$lib/stores/search.js';
  import Search from '$lib/components/Search.svelte';
  
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

  async function toggle_favorite(cardID: number) {
    try {
      const response = await fetch(`http://localhost:8080/api/cards/${cardID}/favorite`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to update favorite status');
      }
    } catch(err) {
      console.error(err);
    }
  }

  async function toggle_owned(cardID: number) {
    try {
      const response = await fetch(`http://localhost:8080/api/cards/${cardID}/owned`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to update favorite status');
      }
    } catch(err) {
      console.error(err);
    }
  }

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
    <div class="set">
      <h1>{set.name}</h1>
      <img src={set.image_local} alt={set.name} on:error={(e) => {e.target.src=set.image}}/>
      <p>Release Date: {set.release_date}</p>
    </div>
    <Search searchTypes={['name', 'card_no']} placeholder='Search Cards'/>
    
    <h2>Cards in this set ({cards.length})</h2>
    
    <div class="card-grid">
      {#each filteredCards as card}
        <div class="card" class:favorite={card.is_favorite} class:owned={card.is_owned}>
          <div class="card-buttons">
            <button on:click={(_) => {toggle_favorite(card.id); if (card.is_favorite) {card.is_favorite = false} else {card.is_favorite = true}}}><img src={card.is_favorite ? '/images/favfilled.png' : '/images/fav.png'} alt="fav"></button>
            <button on:click={(_) => {toggle_owned(card.id); if (card.is_owned) {card.is_owned = false} else {card.is_owned = true}}}><img src={card.is_owned ? '' : '/images/owned.png'} alt="own"></button>
          </div>
          <h3>{card.name} [{card.card_no}]</h3>
          <div class="card-top">
            {#if card.top.img_web}
              <img src= {card.top.img_local} alt={card.name} on:error={(e) => {e.target.src=card.top.img_web}}/>
            {/if}
          </div>
          <div class="card-bottom">
            <h4>notes:</h4>
            {#each card.bottom.notes as effect}
              <p>{effect}</p>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
{/if}

<style>
  .set-details {
    margin: 0 20px;
  }

  .set {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & img {
      max-height: 300px;
    }
  }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 250px));
    gap: 1rem;
  }
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #ddd;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 1px 1px 2px 2px gray;
  }

  .favorite {
    background: linear-gradient(90deg, rgba(255,114,175,1) 0%, rgba(231,175,204,1) 70%, rgba(177,183,223,1) 90%, rgba(148,187,233,1) 100%);
    color: white;
  }

  .owned {
    background: linear-gradient(90deg, rgba(27,176,84,1) 0%, rgba(137,219,118,1) 70%, rgba(184,234,140,1) 90%, rgba(223,241,150,1) 100%);
    color: white;
  }

  .favorite.owned {
    background: radial-gradient(circle, #8A6E2F 0%, #9f7928 50%, #FDB931 80%, #FEDB37 100%);
    color: white;
  }

  .card-top {
    margin-bottom: 1rem;
  }
  .card img {
    max-width: 100%;
  }
  .card-bottom {
    margin: 0;
    padding: 0;
  }

  .card-buttons {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .card-buttons img {
    width: 30px;
  }

  .card-buttons button {
    background: rgba(255, 255, 255, 0);
    border: none;
    cursor: pointer;
  }

  .search-bar {
    width: 100%;
    display: flex;
    justify-content: center;

    & input {
      width: 80%;
      height: 30px;
      border-radius: 10px;
      border: solid 1px gray;
    }
  }

  @media (min-width: 1000px) {
    .card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 320px));
      gap: 1rem;
    }
  }
</style>

<!--Pink lineargradient-->
<!--background: linear-gradient(90deg, rgba(255,114,175,1) 0%, rgba(231,175,204,1) 70%, rgba(177,183,223,1) 90%, rgba(148,187,233,1) 100%);-->    

<!--green lineargradient-->
<!--linear-gradient(90deg, rgba(27,176,84,1) 0%, rgba(137,219,118,1) 70%, rgba(184,234,140,1) 90%, rgba(223,241,150,1) 100%);-->
