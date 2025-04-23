export async function toggle_favorite(cardID: number) {
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

export async function toggle_owned(cardID: number) {
  try {
    const response = await fetch(`http://localhost:8080/api/cards/${cardID}/owned`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to update owned status');
    }
  } catch(err) {
    console.error(err);
  }
}


export interface Set {
  set_id: string,
  name: string,
  release_date: string,
  img: string,
}

export let sets: Set[] = [
  {
    set_id: 'BT-1',
    name: 'New Evolution',
    release_date: '2020-05-15',
    img: 'https://world.digimoncard.com/images/products/pack/ver3/img_pkg.png',
  },
  {
    set_id: 'BT-2',
    name: 'Ultimate Power',
    release_date: '2020-07-22',
    img: 'https://world.digimoncard.com/images/products/pack/ver2/img_pkg.png',
  },
  {
    set_id: 'BT-3',
    name: 'Union Impact',
    release_date: '2020-10-30',
    img: 'https://world.digimoncard.com/images/products/pack/ver3/img_pkg.png',
  },
  {
    set_id: 'BT-4',
    name: 'Great Legend',
    release_date: '2020-12-18',
    img: 'https://world.digimoncard.com/images/products/pack/ver4/img_pkg.png',
  },
  {
    set_id: 'BT-5',
    name: 'Battle of Omni',
    release_date: '2021-02-16',
    img: 'https://world.digimoncard.com/images/products/pack/ver5/img_pkg.png',
  },    
  {
    set_id: 'BT-6',
    name: 'Double Diamond',
    release_date: '2021-05-18',
    img: 'https://world.digimoncard.com/images/products/pack/ver6/img_pkg.png',
  },
  {
    set_id: 'BT-7',
    name: 'Next Adventure',
    release_date: '2021-08-17',
    img: 'https://world.digimoncard.com/images/products/pack/ver7/img_pkg.png',
  },
  {
    set_id: 'BT-8',
    name: 'New Awakening',
    release_date: '2021-11-26',
    img: 'https://world.digimoncard.com/images/products/pack/ver8/img_pkg.png',
  },
  {
    set_id: 'BT-9',
    name: 'X Record',
    release_date: '2022-02-25',
    img: 'https://world.digimoncard.com/images/products/pack/ver9/img_pkg.png',
  },
  {
    set_id: 'BT-10',
    name: 'Xros Encounter',
    release_date: '2022-05-27',
    img: 'https://world.digimoncard.com/images/products/pack/ver10/img_pkg.png',
  },
  {
    set_id: 'BT-11',
    name: 'Dimensional Phase',
    release_date: '2022-09-30',
    img: 'https://world.digimoncard.com/images/products/pack/ver11/img_pkg.png',
  },
  {
    set_id: 'BT-12',
    name: 'Across Time',
    release_date: '2022-11-25',
    img: 'https://world.digimoncard.com/images/products/pack/ver12/img_pkg.png',
  },
  {
    set_id: 'BT-13',
    name: 'Versus Royal Knights',
    release_date: '2023-02-24',
    img: 'https://world.digimoncard.com/images/products/pack/ver13/img_pkg.png',
  },
  {
    set_id: 'BT-14',
    name: 'Blast Ace',
    release_date: '2023-06-30',
    img: 'https://world.digimoncard.com/images/products/pack/ver14/img_pkg.png',
  },
  {
    set_id: 'BT-15',
    name: 'Exceed Apocalypse',
    release_date: '2023-09-29',
    img: 'https://world.digimoncard.com/images/products/pack/ver15/img_pkg.png',
  },
  {
    set_id: 'BT-16',
    name: 'Begining Observer',
    release_date: '2023-12-22',
    img: 'https://world.digimoncard.com/images/products/pack/ver16/img_pkg.png',
  },
  {
    set_id: 'BT-17',
    name: 'Secret Crisis',
    release_date: '2024-03-19',
    img: 'https://world.digimoncard.com/images/products/pack/ver17/img_pkg.png',
  },
  {
    set_id: 'BT-18',
    name: 'Elemental Successor',
    release_date: '2024-06-28',
    img: 'https://world.digimoncard.com/images/products/pack/ver18-19/img_pkg.png',
  },
  {
    set_id: 'BT-19',
    name: 'Xros Evolution',
    release_date: '2024-09-27',
    img: 'https://world.digimoncard.com/images/products/pack/ver19-20/img_pkg.png',
  },
  {
    set_id: 'BT-20',
    name: 'Over the X',
    release_date: '2025-01-31',
    img: 'https://world.digimoncard.com/images/products/pack/ver19-20/img_pkg.png',
  },
  {
    set_id: 'BT-21',
    name: 'World Convergence',
    release_date: '2025-04-15',
    img: 'https://world.digimoncard.com/images/products/pack/ver21/img_pkg.png',
  },
  {
    set_id: 'BT-22',
    name: 'Cyber Eden',
    release_date: '2025-07-25',
    img: 'https://world.digimoncard.com/images/products/pack/ver22/img_pkg.png',
  },
  {
    set_id: 'LM-01',
    name: 'Digimon Ghost Game',
    release_date: '2023-07-22',
    img: 'https://static.wikia.nocookie.net/digimoncardgame/images/5/5a/LM-01-Booster_Pack-JP.png',
  },
  {
    set_id: 'LM-03',
    name: 'Limited Card Set',
    release_date: '2023-11-01',
    img: 'https://static.wikia.nocookie.net/digimoncardgame/images/d/db/LM-03-Booster_Pack-JP.png',
  },
  {
    set_id: 'Special Limited Set',
    name: 'Special Limited Set',
    release_date: '2023-12-01',
    img: 'https://static.wikia.nocookie.net/digimoncardgame/images/4/47/Special_Limited_Set-Booster_Pack-EN.png',
  },
  {
    set_id: 'LM-04',
    name: 'Torrid Weiss',
    release_date: '2024-08-11',
    img: 'https://static.wikia.nocookie.net/digimoncardgame/images/4/44/LM-04-Booster_Pack-JP.png',
  },
  {
    set_id: 'LM-05',
    name: 'Final Elysion',
    release_date: '2025-03-15',
    img: 'https://static.wikia.nocookie.net/digimoncardgame/images/4/44/LM-05-Booster_Pack-JP.png',
  },
  {
    set_id: 'LM-06',
    name: 'Billion Bullet',
    release_date: '2025-08-01',
    img: 'https://static.wikia.nocookie.net/digimoncardgame/images/4/44/LM-06-Booster_Pack-JP.png',
  },
  {
    set_id: 'EX-01',
    name: 'Classic Collection',
    release_date: '2021-07-30',
    img: 'https://world.digimoncard.com/images/products/pack/ex-01/img_pkg.png',
  },
  {
    set_id: 'EX-02',
    name: 'Digital Hazard',
    release_date: '2021-12-24',
    img: 'https://world.digimoncard.com/images/products/pack/ex-02/img_pkg.png',
  },
  {
    set_id: 'EX-03',
    name: 'Draconix Roar',
    release_date: '2022-07-29',
    img: 'https://world.digimoncard.com/images/products/pack/ex-03/img_pkg.png',
  },
  {
    set_id: 'EX-04',
    name: 'Alternative Being',
    release_date: '2022-12-23',
    img: 'https://world.digimoncard.com/images/products/pack/ex-04/img_pkg.png',
  },
  {
    set_id: 'EX-05',
    name: 'Animal Colosseum',
    release_date: '2023-08-25',
    img: 'https://world.digimoncard.com/images/products/pack/ex-05/img_pkg.png',
  },
  {
    set_id: 'EX-06',
    name: 'Infernal Ascension',
    release_date: '2024-02-23',
    img: 'https://world.digimoncard.com/images/products/pack/ex-06/img_pkg.png',
  },
  {
    set_id: 'EX-07',
    name: 'Digimon Liberato',
    release_date: '2024-05-31',
    img: 'https://world.digimoncard.com/images/products/pack/ex-07/img_pkg.png',
  },
  {
    set_id: 'EX-08',
    name: 'Chain of Liberation',
    release_date: '2024-11-29',
    img: 'https://world.digimoncard.com/images/products/pack/ex-08/img_pkg.png',
  },
  {
    set_id: 'EX-09',
    name: 'Versus Monsters',
    release_date: '2025-05-26',
    img: 'https://world.digimoncard.com/images/products/pack/ex-09/img_pkg.png',
  },
  {
    set_id: 'EX-10',
    name: 'Sinister Order',
    release_date: '2025-09-19',
    img: 'https://world.digimoncard.com/images/products/pack/ex-10/img_pkg.png',
  },
  {
    set_id: 'ST-1',
    name: 'Gaia Red',
    release_date: '2020-04-24',
    img: 'https://world.digimoncard.com/images/products/deck/st-1/img_pkg.png',
  },
  {
    set_id: 'ST-2',
    name: 'Cocytus Blue',
    release_date: '2020-04-24',
    img: 'https://world.digimoncard.com/images/products/deck/st-2/img_pkg.png',
  },
  {
    set_id: 'ST-3',
    name: 'Heavens Yellow',
    release_date: '2020-04-24',
    img: 'https://world.digimoncard.com/images/products/deck/st-3/img_pkg.png',
  },
  {
    set_id: 'ST-4',
    name: 'Giga Green',
    release_date: '2020-11-27',
    img: 'https://world.digimoncard.com/images/products/deck/st-4/img_pkg.png',
  },
  {
    set_id: 'ST-5',
    name: 'Machine Black',
    release_date: '2020-11-27',
    img: 'https://world.digimoncard.com/images/products/deck/st-5/img_pkg.png',
  },
  {
    set_id: 'ST-6',
    name: 'Venomous Violet',
    release_date: '2020-11-27',
    img: 'https://world.digimoncard.com/images/products/deck/st-6/img_pkg.png',
  },
  {
    set_id: 'ST-7',
    name: 'Gallantmon',
    release_date: '2021-04-23',
    img: 'https://world.digimoncard.com/images/products/deck/st-7/img_pkg.png',
  },
  {
    set_id: 'ST-8',
    name: 'UlforceVeedramon',
    release_date: '2021-04-23',
    img: 'https://world.digimoncard.com/images/products/deck/st-8/img_pkg.png',
  },
  {
    set_id: 'ST-9',
    name: 'Ultimate Ancient Dragon',
    release_date: '2021-10-29',
    img: 'https://world.digimoncard.com/images/products/deck/st-9/img_pkg.png',
  },
  {
    set_id: 'ST-10',
    name: 'Parallel World Tactician',
    release_date: '2021-10-29',
    img: 'https://world.digimoncard.com/images/products/deck/st-10/img_pkg.png',
  },
  {
    set_id: 'ST-11',
    name: 'Special Entry Deck',
    release_date: '2021-11-26',
    img: 'https://static.wikia.nocookie.net/digimoncardgame/image/f/fe/Deckbox-ST-11.png',
  },  
  {
    set_id: 'ST-12',
    name: 'Jesmon',
    release_date: '2022-04-22',
    img: 'https://world.digimoncard.com/images/products/deck/st-12/img_pkg.png',
  },
  {
    set_id: 'ST-13',
    name: 'RagnaLoardmon',
    release_date: '2022-04-22',
    img: 'https://world.digimoncard.com/images/products/deck/st-13/img_pkg.png',
  },
  {
    set_id: 'ST-14',
    name: 'Beelzemon',
    release_date: '2022-12-09',
    img: 'https://world.digimoncard.com/images/products/deck/st-14/img_pkg.png',
  },
  {
    set_id: 'ST-15',
    name: 'Dragon of Courage',
    release_date: '2023-05-26',
    img: 'https://world.digimoncard.com/images/products/deck/st-15/img_pkg.png',
  },
  {
    set_id: 'ST-16',
    name: 'Wolf of Frienship',
    release_date: '2023-05-26',
    img: 'https://world.digimoncard.com/images/products/deck/st-16/img_pkg.png',
  },
  {
    set_id: 'ST-17',
    name: 'Double Typhoon',
    release_date: '2023-11-24',
    img: 'https://world.digimoncard.com/images/products/deck/st-17/img_pkg.png',
  },
  {
    set_id: 'ST-18',
    name: 'Guardian Vortex',
    release_date: '2024-04-26',
    img: 'https://world.digimoncard.com/images/products/deck/st-18/img_pkg.png',
  },
  {
    set_id: 'ST-19',
    name: 'Fable Waltz',
    release_date: '2024-04-26',
    img: 'https://world.digimoncard.com/images/products/deck/st-19/img_pkg.png',
  },
  {
    set_id: 'ST-20',
    name: 'Protector of Light',
    release_date: '2025-04-18',
    img: 'https://world.digimoncard.com/images/products/deck/st-20/img_pkg.png',
  },
  {
    set_id: 'ST-21',
    name: 'Hero of hope',
    release_date: '2025-04-18',
    img: 'https://world.digimoncard.com/images/products/deck/st-21/img_pkg.png',
  },
]

export function GetSet(setID: string) {
  for (var set of sets){
    if (set.set_id === setID) {
      return set;
    }
  }
} 
