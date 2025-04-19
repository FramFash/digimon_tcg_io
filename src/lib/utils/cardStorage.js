const FAVORITES_KEY = 'digimon-favorites';
const OWNED_KEY = 'digimon-owned0';
const CARDS_DATA_KEY = 'digimon-cards-data';

export const cardStorage = {
  markCard: (card, listType = 'favorite') => {
    const key = listType === 'favorite' ? FAVORITES_KEY : OWNED_KEY;
    const current = JSON.parse(localStorage.getItem(key) || '{}');
    current[card.id] = true;
    localStorage.setItem(key, JSON.stringify(current));

    const allCards = JSON.parse(localStorage.getItem(CARDS_DATA_KEY) || '{}');
    allCards[card.id] = card;
    localStorage.setItem(CARDS_DATA_KEY, JSON.stringify(allCards));
  },
  unmarkCard: (cardId, listType = 'favorite') => {
    const key = listType === 'favorite' ? FAVORITES_KEY : OWNED_KEY;
    const current = JSON.parse(localStorage.getItem(key) || '{}');
    delete current[cardId];
    localStorage.setItem(key, JSON.stringify(current));
  },
  getCards: (listType = 'favorite') => {
    const listKey = listType === 'favorite' ? FAVORITES_KEY : OWNED_KEY;
    const cardsData = JSON.parse(localStorage.getItem(CARDS_DATA_KEY) || '{}');
    const list = JSON.parse(localStorage.getItem(listKey) || '');

    return Object.keys(list).map(id => cardsData[id]).filter(Boolean);
  },
  hasCard: (cardId, listType = 'favorite') => {
    const key = listType === 'favorite' ? FAVORITES_KEY : OWNED_KEY;
    const list = JSON.parse(localStorage.getItem(key) || '{}');
    return !!list[cardId];
  },
  updateCardData: (card) => {
    const allCards = JSON.parse(localStorage.getItem(CARDS_DATA_KEY) || '{}');
    allCards[card.id] = card;
    localStorage.setItem(CARDS_DATA_KEY, JSON.stringify(allCards));
  }
};
