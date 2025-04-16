<script lang="ts">
  import { page } from '$app/stores';
  import { searchTerm, searchType, filterItems } from '$lib/stores/search';

  import Search from '$lib/components/Search.svelte';

  export let data;
  
  let sets = data?.sets || [];

  let error = null;

  if (sets.length < 1) {
    error = '404 NOT FOUND';
  }

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
    <div class="title">
      <a class="direct-buttons" href="/favorites"><img src="images/fav.png" alt="fav"></a>
      <h1>Card Sets</h1>
      <a class="direct-buttons" href="/owned"><img src="images/owned.png" alt="fav"></a>
    </div>
    <Search searchTypes={['id', 'name']} placeholder="Search sets..." />
    <div class="card-container">
      {#each filteredSets as set}
      <div class="each-card">
        <a href={`/sets/${set.id}`} class="set-link">
          <h2>[{set.id}] {set.name}</h2>
          {#if set.image}
            <img src={set.image_local} alt={set.name}/>
          {/if}
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
  .main-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(275px, auto));
    grid-template-rows: repeat(auto-fill, minmax(300px, auto));
    gap: 1rem;
  }

  .each-card {
    display: flex;
    justify-content: center;
    margin: 10px;
    padding: 0;
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
    .each-card {
      width: 350px;
    }

    .card-container {
      grid-template-columns: repeat(auto-fill, minmax(360px, 400px));
    }
  }
</style>
