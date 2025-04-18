<script lang="ts">
  import { base } from '$app/paths';
</script>

<div class="main-container">
  <div class="header"><a href="sets/"><img src={`${base}/images/logo.png`} alt="Digimon Card Game"></a></div>
</div>

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
    width: 100%;
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
