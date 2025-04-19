<script lang="ts">
  import { base } from '$app/paths';
  import { toggle_favorite, toggle_owned, favorites, owned} from '$lib/stores/fav_owned';

  export let card;
  export let activeStates;

  function togglePopup(id: number) {
    activeStates.update(map => {
      map.set(id, !map.get(id));
      return new Map(map);
    });
  }

  let fav = `${base}/images/fav.png`;
  let favFilled = `${base}/images/favfilled.png`;
  let powned = `${base}/images/owned.png`;
  let isOwned = `${base}/images/isowned.png`;

</script>

<div class="card" class:favorite={$favorites.get(card.id)} class:owned={$owned.get(card.id)}>
  <div class="card-buttons">
    <button on:click={(_) => {toggle_favorite(card.id)}}><img src={$favorites.get(card.id) ? favFilled : fav} alt="fav"></button>
    <button on:click={(_) => {toggle_owned(card.id)}}><img src={$owned.get(card.id) ? isOwned : powned} alt="own"></button>
  </div>
  <div class="card-top">
    <button class={$activeStates.get(card.id) ? 'img-container-popup' : 'img-container'} on:click={() => {togglePopup(card.id)}}>
      <img src={`https://images.digimoncard.io/images/cards/${card.id}.jpg`} alt={card.id} on:error={(e) => {e.target.src=`${base}/images/logo.png`}}/>
    </button>
  </div>
  <div class="card-bottom">
    <h4>notes:</h4>
    <p>{card.set_name}</p>
  </div>
</div>

<style>
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
  background-image: linear-gradient(to right, #FBD3E9 0%, #BB377D  51%, #FBD3E9  100%);
  transition: 0.5s;
  background-size: 200% auto;
  color: white;            
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
  color: black;         
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
  transition: 0.5s;

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
  transition: 0.5s;

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

@media (max-width: 500px) {
  .card {
    font-size: 0.5rem;
  }

  .card-bottom {
    height: 40px;
    overflow-y: scroll;

    & p {
      font-size: 0.5rem;
    }
  }

  .img-container img {
    border-radius: 4px;
  }

  .img-container-popup img {
    width: 90%;
    box-shadow: 0 0 30px 2px white;
  }
}

@media (max-width: 400px) {
  .card {
    font-size: 0.5rem;
  }

  .card-bottom {
    height: 40px;
    overflow-y: scroll;

    & p {
      font-size: 0.5rem;
    }
  }

  .img-container-popup img {
    width: 90%;
    box-shadow: 0 0 30px 2px white;
  }
}
</style>
