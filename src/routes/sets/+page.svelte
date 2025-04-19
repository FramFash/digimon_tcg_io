<script lang="ts">
  import { page } from '$app/stores';
  import { base } from '$app/paths';
  import { searchTerm, searchType, filterItems } from '$lib/stores/search';
  import { sets } from '$lib/data';

  import Search from '$lib/components/Search.svelte';

  let error = null;

  $searchTerm = '';

  $: filteredSets = filterItems(sets, $searchTerm, $searchType);

  function formatDateOnly(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }
  
</script>
{#if error}
  <p class="error">{error}</p>
{:else}
  <div class="main-container">
    <div class="header"><a href={`${base}/sets`}><img src={`${base}/images/logo.png`} alt="Digimon Card Game"></a></div>
    <div class="title">
      <a class="direct-buttons" href={`${base}/favorites`}><img src={`${base}/images/fav.png`} alt="fav"></a>
      <h1>Card Sets</h1>
      <a class="direct-buttons" href={`${base}/owned`}><img src={`${base}/images/owned.png`} alt="fav"></a>
    </div>
    <Search searchTypes={['id', 'name']} placeholder="Search sets..." />
    <div class="card-container">
      {#each filteredSets as set}
      <div class="each-card">
        <a href={`${base}/sets/${set.set_id}`} class="set-link">
          <h2>[{set.set_id}] {set.name}</h2>
            <img src={set.img} alt={set.name} on:error={(e) => {e.target.src=`${base}/images/logo.png`}}/>
          <p>Released: {formatDateOnly(set.release_date)}</p>
        </a>
      </div>
      {:else}
        <p>Loading Sets...</p>
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

  .header {
    display: flex;
    justify-content: center;
  }

  .main-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: black;
  }

  .title {
    margin: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & img {
      border-radius: 8px;
    }
  }

  .card-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(275px, 450px));
    grid-template-rows: repeat(auto-fill, minmax(300px, 500px));
    gap: 1rem;
  }

  .each-card {
    display: flex;
    justify-content: center;
    margin: 10px;
    padding: 0 0.3rem;
    border-radius: 9px;
    border: solid 1px gray;
    box-shadow: 0 0 10px gray;
    background-image: linear-gradient(to right, #abbaab 0%, #ffffff  51%, #abbaab  100%);
    transition: 0.5s;
    background-size: 200% auto;
    color: black;
  }

  .each-card:hover {
    background-position: right center; /* change the direction of the change here */
    color: #fff;
    text-decoration: none;
  }

  .set-link {
    display: grid;
    grid-template-rows: 20% 70% 10%;
    text-decoration: none;
    color: black;

    & h2 {
      margin: auto;
    }

    & img {
      margin: auto;
      height: 100%;
      max-width: 90%;
    }

    & p {
      margin: auto;
    }
  }

  .direct-buttons {
    background: rgba(255, 255, 255, 0);
    width: 50px;
    height: 50px;
    border: none;
    cursor: pointer;

    & img {
      width: 100%;
      height: 100%;
    }
  }


  @media (min-width: 1000px) {
    .card-container {
      grid-template-columns: repeat(auto-fill, minmax(300px, 460px));
    }
  }

  @media (max-width: 500px) {
    .card-container {
      grid-template-columns: repeat(auto-fill, minmax(200px, 205px));
      grid-template-rows: repeat(auto-fill, minmax(300px, 350px));
      gap: 0.3rem;
    }
    .each-card {
      font-size: 0.6rem;
    }
  }
  @media (max-width: 400px) {
    .card-container {
      grid-template-columns: repeat(auto-fill, minmax(150px, 175px));
      grid-template-rows: repeat(auto-fill, minmax(300px, 320px));
      gap: 0.3rem;
    }
    .each-card {
      font-size: 0.6rem;
    }
  }
</style>
