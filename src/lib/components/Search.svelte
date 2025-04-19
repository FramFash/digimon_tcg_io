<script>
  import {searchTerm, searchType } from '../stores/search';
  import { base } from '$app/paths';

  export let searchTypes = ['name'];
  export let placeholder = "Search...";
</script>

<div class="search-container">
  <input type="text" bind:value={$searchTerm} placeholder={placeholder}/>
  <a href={`${base}/cards/${$searchTerm}`}><img src={`${base}/images/search.png`} alt=""></a>

  {#if searchTypes.length > 1}
    <select bind:value={$searchType}>
      {#each searchTypes as type}
        <option value="{type}">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </option>
      {/each}
    </select>
  {/if}
</div>

<style>
  .search-container {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  input {
    width: 400px;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  select {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  a {
    width: 2rem;
    height: 2rem;
    padding: 0;
    margin: 0;
    border: 1px solid gray;
    border-radius: 5px;
    background-color: white;

    & img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }

  @media (max-width: 500px) {
    input {
      width: 200px;
    }
  }

</style>
