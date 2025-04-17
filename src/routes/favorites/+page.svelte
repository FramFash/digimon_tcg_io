<script lang="ts">
  import { writable } from 'svelte/store';
  import { searchTerm, searchType, filterItems } from '$lib/stores/search.js';
  import { toggle_favorite, toggle_owned } from '$lib/db.js';

  import Search from '$lib/components/Search.svelte';
  
  export let data;
  
  let cards = data?.cards || [];
  let error = null;

  if (cards.length < 1) {
    error = '404 NOT FOUND';
  }

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
    <div class="head"><a href="./sets/"><img src="/images/logo.png" alt="Digimon Card Game"></a></div>
    <div class="header">
      <h1>Favorites</h1>
    </div>
    <Search searchTypes={['name', 'card_no']} placeholder="Search cards..."/>
    <h2>Favorite Cards ({cards.length})</h2>
    
    <div class="card-grid">
      {#each filteredCards as card}
        <div class="card" class:favorite={card.is_favorite} class:owned={card.is_owned}>
          <div class="card-buttons">
            <button on:click={(_) => {toggle_favorite(card.id); if (card.is_favorite) {card.is_favorite = false} else {card.is_favorite = true}}}><img src={card.is_favorite ? '/images/favfilled.png' : '/images/fav.png'} alt="fav"></button>
            <button on:click={(_) => {toggle_owned(card.id); if (card.is_owned) {card.is_owned = false} else {card.is_owned = true}}}><img src={card.is_owned ? '/images/isowned.png' : '/images/owned.png'} alt="own"></button>
          </div>
          <div class="card-top">
            <button class={$activeStates.get(card.id) ? 'img-container-popup' : 'img-container'} on:click={() => {togglePopup(card.id)}}>
              <img src= {card.top.img_local} alt={card.name} on:error={(e) => {e.target.src=card.top.img_web}}/>
            </button>
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
  .card {
    display: subgrid;
    padding: 0.5rem;
    border-radius: 9px;
    border: solid 1px gray;
    box-shadow: 0 0 10px gray;
    background-image: linear-gradient(to right, #EAECC6 0%, #2BC0E4  51%, #EAECC6  100%);
    transition: 0.5s;
    background-size: 200% auto;
    color: black;
  }

  .card:hover {
    background-position: right center; /* change the direction of the change here */
    color: #fff;
    text-decoration: none;
  }

  .favorite {
    background-image: linear-gradient(to right, #BB377D 0%, #FBD3E9  51%, #BB377D  100%);
    transition: 0.5s;
    background-size: 200% auto;
  }

  .favorite:hover {
    background-position: right center; /* change the direction of the change here */
    color: #fff;
    text-decoration: none;
  }

  .owned {
    background-image: linear-gradient(to right, #16A085 0%, #F4D03F  51%, #16A085  100%);
    transition: 0.5s;
    background-size: 200% auto;
  }
  .owned:hover {
    background-position: right center; /* change the direction of the change here */
    color: #fff;
    text-decoration: none;
  }

  .favorite.owned {
  
    background-image: linear-gradient(to right, #D1913C 0%, #FFD194  51%, #D1913C  100%);
    transition: 0.5s;
    background-size: 200% auto;
  }

  .favorite.owned:hover {
    background-position: right center; /* change the direction of the change here */
    color: #fff;
    text-decoration: none;
  }

  .img-container {
    background: rgba(255, 255, 255, 0);
    border: none;
    padding: 0;
    margin: 0;
    margin-top: 0.2rem;

    & img {
      width: 100%;
      box-shadow: 0px 0px 3px 1px gray;
      border-radius: 15px;
    }

    & img:hover {
      transform: scale(1.05, 1.05);
    }
  }

  .img-container-popup {
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    border: none;
    padding: 0;
    margin: 0;
    margin-top: 0.2rem;

    & img {
      width: 500px;
      border: solid 2px white;
      border-radius: 26px;
      box-shadow: 0 0 60px 5px white;
    }
  }

  .card-top {
    margin: 0;
  }

  .card img {
    max-width: 100%;

  }
  .card-bottom {
    margin: 0;
    padding: 0;

    & h4 {
      margin: 0;
    }

    & p {
      margin: 0;
      font-size: 1rem;
    }
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

  @media (min-width: 1000px) {
    .card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 360px));
      gap: 1rem;
    }
  }
</style>
